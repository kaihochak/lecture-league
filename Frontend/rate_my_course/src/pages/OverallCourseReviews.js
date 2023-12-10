import React, { useState, useEffect } from 'react';
import uni_logo from '../resources/logo-ucalgary.jpg';
import Stars from '../resources/stars.jpg';
import { Link, useParams } from "react-router-dom";
import ReportedReview from '../components/ReportedReview';
import OverarallReviews from '../components/OverallReviews';
import Header from '../components/Header';
import bookMark from '../resources/bookmark.svg';
import bookMarkBlank from '../resources/bookmark-blank.svg';
import APIService from '../APIService';

function OverallCourseReviews() {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [professor, setProfessor] = useState('Professor');
    const [course, setCourse] = useState('');
    const [reviews, setReviews] = useState([]);
    const [bookMarkClicked, setBookMarkClicked] = useState(false);
    const [reviewResponseCount, setReviewResponseCount] = useState(0);
    const [uniLogo, setUniLogo] = useState('');
    const [sortedByLikes, setSortedByLikes] = useState(false);
    const [sortedByDate, setSortedByDate] = useState(false); // New state to manage date sorting
    const [selectedProfessor, setSelectedProfessor] = useState('All Professors'); // New state to track selected professor
    const [professorsList, setProfessorsList] = useState([]); // State to hold the list of professors
    const [allReviews, setAllReviews] = useState([]); // Holds all reviews
    const [filteredReviews, setFilteredReviews] = useState([]); // Holds filtered reviews for display


    const { courseName } = useParams();

    // Function to sort reviews by likes
    const sortByLikes = (reviewsData) => {
        return reviewsData.sort((a, b) => b.likes - a.likes);
    };

    // Function to sort reviews by date
    const sortByDate = (reviewsData) => {
        return reviewsData.sort((a, b) => new Date(b.submission_date) - new Date(a.submission_date));
    };

    // Fetch the list of reviews from the backend
    useEffect(() => {
        if(courseName) {
            const decodedCourseName = decodeURIComponent(courseName);
            fetch(`http://localhost:8000/api/Course/${decodedCourseName}/`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then((data) => { setCourse(data); })
            .catch(error => console.log(error))


            // Fetching reviews
            fetch(`http://localhost:8000/api/Review/?course=${decodedCourseName}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                let reviewsData = Array.isArray(data) ? data : [data]; // Ensure data is an array

                if (sortedByLikes) {
                    reviewsData = sortByLikes(reviewsData);
                } else if (sortedByDate) {
                    reviewsData = sortByDate(reviewsData);
                }
                
                setReviewResponseCount(reviewsData.length);
                setAllReviews(reviewsData);
                setFilteredReviews(reviewsData); // Initially display all reviews

                // Extract a list of unique professors from the reviews
                const uniqueProfessors = Array.from(new Set(reviewsData.map(review => review.professor)));
                setProfessorsList(['All Professors', ...uniqueProfessors]);
            })
            .catch(error => console.log(error))
        }
    }, [courseName, sortedByLikes, sortedByDate, selectedProfessor]); // Add sortedByDate as a dependency

    // Effect to filter reviews when a professor is selected
    useEffect(() => {
        const filtered = selectedProfessor === 'All Professors'
            ? allReviews
            : allReviews.filter(review => review.professor === selectedProfessor);
        
        setFilteredReviews(filtered);
    }, [selectedProfessor, allReviews]);


    // Fetch the university data based on universityName
    useEffect(() => {

        if (course.university) {
            const decodedUniversityName = decodeURIComponent(course.university);

            const onSuccess = (data) => {
                setUniLogo(data.image);
            };
            const onError = (error) => {
                console.error('Error:', error);
            };

            APIService.GetUniversityData(decodedUniversityName, onSuccess, onError);
        }
    }, [course]);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const handleOnChange2 = () => {
        setIsChecked2(!isChecked2);
    };

    const handleBookmarkClick = () => {
        setBookMarkClicked(!bookMarkClicked);
        //for back end logic
    };
    
    // Toggle handlers
    const handleLikesSortingToggle = () => {
        setSortedByLikes(!sortedByLikes);
        // Turn off date sorting when likes sorting is turned on
        if (!sortedByLikes) setSortedByDate(false);
    };

    const handleDateSortingToggle = () => {
        setSortedByDate(!sortedByDate);
        // Turn off likes sorting when date sorting is turned on
        if (!sortedByDate) setSortedByLikes(false);
    };

    // Function to handle selection of professor from dropdown
    const handleProfessorChange = (e) => {
        setSelectedProfessor(e.target.value);
    };

    return (
        <div>
            <Header/>
            <div className='flex flex-col items-left justify-center mt-5 mx-10 md:mx-10'>

                <div className='flex justify-between text-sm mt-5 w-full md:w-1/2'>
                    <div className ='w-1/3 ml-2'>
                        <label className="switch">
                            <input type="checkbox" checked={sortedByDate} onChange={handleDateSortingToggle}/>
                            <span className="slider round"></span>
                        </label>
                        <p className='ml-1 mt-1'>Newest Posts</p>
                    </div>

                    <div className ='w-1/3 ml-2'>
                        <label className="switch">
                            <input type="checkbox" checked={sortedByLikes} onChange={handleLikesSortingToggle}/>
                            <span className="slider round"></span>
                        </label>
                        <p className='ml-1 mt-1'>Top Rated</p>
                    </div>

                    <div className='w-1/3 ml-2'>
                        <select value={selectedProfessor} 
                            onChange={(e) => setSelectedProfessor(e.target.value)}
                            className='border-2 border-red-600 rounded-full p-1'>
                            {professorsList.map((professor) => (
                                <option key={professor} value={professor}>{professor}</option>
                            ))}
                        </select>
                        <p className='ml-1 mt-1'>Professors</p>
                    </div>
                </div>

                {/* bookmark */}
                <div className='flex flex-row mt-6'>
                    <div onClick={handleBookmarkClick} className='mt-1'>
                        <img src={bookMarkClicked ? bookMark : bookMarkBlank} className="md:h-12 md:w-12 h-8 w-8 cursor-pointer" alt="book-mark"/>
                    </div>
                    <div className='ml-4 mt-3 mb-2 align-middle'>
                        <span className="md:text-lg text-md text-center">Add to Watched Courses?</span>
                    </div>
                </div>

                {/* course info */}
                <div className='h-auto md:h-auto mt-6 border-2 border-red-600 w-full md:w-2/3 shadow-lg py-2 mb-6 px-4 md:px-6'>
                    <div className='flex items-center'>
                        {/* wait until uniLogo is loaded */}
                        <div className="w-12 md:w-12 relative m-6">
                            { uniLogo && <img src={uniLogo} className="h-16 md:h-20 object-contain" alt='logo' /> }
                        </div>
                        <span className="block text-2xl font-bold text-left">{course.name}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mt-4 ml-4'>
                        <div className='w-full'>
                            <span className="block text-gray-400 text-md ftext-left">Course Description:</span>
                            <span className="block text-gray-400 mt-6 text-md ftext-left">{course.description}</span>
                        </div>
                        {/* ratings */}
                        <div className='md:ml-8 w-full md:w-auto md:mt-0 mt-6'>
                            <p className="block text-gray-400 text-md ftext-left">Average Difficulty: {course.average_difficulty}</p>
                            <p className="block text-gray-400 text-md ftext-left">Average Workload: {course.average_workload}</p>
                            <p className="block text-gray-400 text-md ftext-left">Average Usefulness: {course.average_usefulness}</p>
                        </div>
                    </div>
                </div>

                <Link to={`/Review?courseName=${course.name}&uni=${course.university}&uniLogo=${uniLogo}`}>
                    <button className='h-16 w-1/2 md:w-1/6 bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-900'>Leave a New Review</button>
                </Link>

                <span className="text-md mt-6 text-black">Showing {reviewResponseCount} Reviews: </span>
                
                {filteredReviews.map((review, index) => (
                    <OverarallReviews data={review} index={index} key={review.id} />
                ))}

            </div>
        </div>
    );
}

export default OverallCourseReviews;
