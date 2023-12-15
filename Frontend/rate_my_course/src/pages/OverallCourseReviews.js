import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import OverarallReviews from '../components/OverallReviews';
import Header from '../components/Header';
import bookMark from '../resources/bookmark.svg';
import bookMarkBlank from '../resources/bookmark-blank.svg';
import APIService from '../APIService';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"
import { Box, Rating, Typography } from '@mui/material';
import { StarIcon } from 'lucide-react';

function OverallCourseReviews() {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [course, setCourse] = useState('');
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
        if (courseName) {
            const decodedCourseName = decodeURIComponent(courseName);
            fetch(`http://localhost:8000/api/Course/${decodedCourseName}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => resp.json())
                .then((data) => { setCourse(data); })
                .catch(error => console.log(error))


            // Fetching reviews
            fetch(`http://localhost:8000/api/Review/?course=${decodedCourseName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
            <Header />
            <div className='flex flex-col justify-center mt-5 mx-10 md:mx-10'>

                {/* course info */}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className='flex items-center'>
                                <div className="w-12 md:w-12 m-2">
                                    {uniLogo && <img src={uniLogo} className="h-16 md:h-20 object-contain" alt='logo' />}
                                </div>
                                <div className='flex flex-col ml-4 text-left'>
                                    <div className="text-2xl ">{course.name}</div>
                                    <div >{course.title}</div>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col md:flex-row ml-4 justify-between mx-6'>
                                {/* Course Description */}
                                <div className='md:w-[70%]'>
                                    <div className="text-md ftext-left">{course.description}</div>
                                </div>
                                {/* ratings */}
                                <div className='md:auto md:ml-8 md:mt-0 mt-6 text-md mr-10'>
                                    {/* Difficult */}
                                    <div className='flex justify-between gap-x-6'>
                                        <div className='font-semibold w-26'>Difficulty: </div>
                                        <div className='flex justify-between'>
                                            <Rating
                                                name="text-feedback"
                                                value={course.average_difficulty}
                                                readOnly
                                                precision={0.01}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            <Box className="w-8" sx={{ ml: 2 }}>{course.average_difficulty}</Box>
                                        </div>
                                    </div>
                                    {/* Workload */}
                                    <div className='flex justify-between gap-x-6'>
                                        <div className='font-semibold w-26'>Workload: </div>
                                        <div className='flex justify-between'>
                                            <Rating
                                                name="text-feedback"
                                                value={course.average_workload}
                                                readOnly
                                                precision={0.01}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            <Box className="w-8" sx={{ ml: 2 }}>{course.average_workload}</Box>
                                        </div>
                                    </div>
                                    {/* Usefulness */}
                                    <div className='flex justify-between gap-x-6'>
                                        <div className='font-semibold w-26'>Usefulness: </div>
                                        <div className='flex '>
                                            <Rating
                                                name="text-feedback"
                                                value={course.average_usefulness}
                                                readOnly
                                                precision={0.01}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            <Box className="w-8" sx={{ ml: 2 }}>{course.average_usefulness}</Box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className='flex justify-end gap-x-4 text-sm mt-5 w-full'>

                    {/* Newest Posts */}
                    <div className='flex gap-x-2 items-center'>
                        <label className="switch">
                            <input type="checkbox" checked={sortedByDate} onChange={handleDateSortingToggle} />
                            <span className="slider round"></span>
                        </label>
                        <div className='ml-1 mt-1'>Latest</div>
                    </div>

                    {/* Top Rated */}
                    <div className='flex gap-x-2 items-center'>
                        <label className="switch">
                            <input type="checkbox" checked={sortedByLikes} onChange={handleLikesSortingToggle} />
                            <span className="slider round"></span>
                        </label>
                        <div className='ml-1 mt-1'>Top Rated</div>
                    </div>

                    {/* by Professors */}
                    <Select onValueChange={(value) => setSelectedProfessor(value)}>
                        <SelectTrigger className="w-[180px] ">
                            <SelectValue placeholder="Professor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                <SelectLabel>Professor</SelectLabel>
                                {professorsList.map((professor) => (
                                    <SelectItem key={professor} value={professor}>
                                        {professor}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* bookmark */}
                    <div className='flex flex-row items-center'>
                        <div onClick={handleBookmarkClick} className=''>
                            <img src={bookMarkClicked ? bookMark : bookMarkBlank} className="md:h-8 md:w-8 h-4 w-4 cursor-pointer" alt="book-mark" />
                        </div>
                        <div className='ml-2 align-middle'>
                        </div>
                    </div>
                </div>


                <Link to={`/Review?courseName=${course.name}&uni=${course.university}&uniLogo=${uniLogo}`}>
                    <button className='h-16 w-1/2 md:w-1/6 bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-secondary'>Leave a New Review</button>
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
