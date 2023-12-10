import React, { useState, useEffect, useContext } from "react";
import arrowLeft from '../resources/arrow-left.svg';
import '../styles/MyReviews.css';
import userImage from '../resources/user-image.svg';
import bookMark from '../resources/bookmark.svg';
import bookMarkBlank from '../resources/bookmark-blank.svg';
import StaticReview from "../components/StaticReview";
import EditableReview from "../components/EditableReview";
import RatedReview from "../components/RatedReview";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import Header from '../components/Header';
import Coursediv from "../components/WatchedCourseDiv";
import { UserContext } from "../UserContext";


const MyProfile = () => {
    const [activeTab, setActiveTab] = useState('myReviews');
    const [coursesToRemove, setCoursesToRemove] = useState([]);
    const [myReviews, setmyReviews] = useState([]);
    const navigate = useNavigate();
    const { username } = useContext(UserContext);
    

    useEffect(() => {
        fetch(`http://localhost:8000/api/Review/?user=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setmyReviews(Array.isArray(data) ? data : [data]);
        })
        .catch(error => console.log(error));
    }, [username]); // Add username to dependency array if it's dynamic


    let name = "Jane Doe";
    let yearOfStudy = "3rd Year";
    let course = "Computer Science"
    let university = "University of Calgary";
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleBookmarkClick = (courseName) => {
        const isSelected = coursesToRemove.includes(courseName);

        if (isSelected) {
            // remove a course from the list of courses to be removed
            setCoursesToRemove(coursesToRemove.filter(course => course !== courseName));
        } else {
            // add a course to the list of courses to be removed
            setCoursesToRemove([...coursesToRemove, courseName]);
        }
    };

    // backend to fill up this list accordingly
    const coursesData = [
        {
            name: "SENG 513",
            mockData: {
                id: 1,
                name: "SENG 550",
                workload: 3,
                difficulty: 4,
                usefulness: 5,
            }
        },
        {
            name: "SENG 511",
            mockData: {
                id: 2,
                name: "SENG 511",
                workload: 3,
                difficulty: 4,
                usefulness: 5,
            }
        }
    ];
    
    // backend to fill up this list accordingly
    const [reviewData, setReviewData] = useState([
        { id: 1, content: <EditableReview key={1} /> },
        { id: 2, content: <EditableReview key={2} /> }
        // Assuming you add an 'id' field for identification
    ]);

    // backend to implement rest of this function
    const handleDeleteReview = (id) => {
        setReviewData(currentReviews => currentReviews.filter(review => review.id !== id));
    };

    // backend to fill up this list accordingly
    const likedReviews = [
        <RatedReview key={1} />,
        <RatedReview key={2} />
    ];

    return (
        <div>
            <Header/>
            <div className="flex flex-col w-full">
                <div className="top-row">
                    <img src = {arrowLeft} 
                    className="arrow-left" 
                    alt="arrow-left"
                    onClick={() => navigate(-1)}/>
                </div>
                <div className="user-info justify-center">
                    <div className="userImage">
                        <img src = {userImage} className="user-image" alt="user-image"/>
                    </div>
                    <div className="flex flex-col ml-2 justify-center font-bold">
                        <div className="user-name">
                            <p>{name}</p>
                        </div>
                        {/* <div className="user-year">
                            <p>{yearOfStudy}</p>
                        </div>
                        <div className="user-course">
                            <p>{course} Student</p>
                        </div>
                        <div className="user-university">
                            <p>{university}</p>
                        </div> */}
                    </div>
                </div>
                <div className='nav-bar md:text-lg text-md flex-row justify-around align-middle'>
                    <div
                        className={`nav-bar-item ${activeTab === 'myReviews' ? 'active2' : ''}`}
                        onClick={() => handleTabClick('myReviews')}
                    >
                        <p>My Reviews</p>
                    </div>
                    <div
                        className={`nav-bar-item ${activeTab === 'ratedReviews' ? 'active2' : ''}`}
                        onClick={() => handleTabClick('ratedReviews')}
                    >
                        <p>Rated Reviews</p>
                    </div>
                    <div 
                        className={`nav-bar-item ${activeTab === 'watchedCourses' ? 'active2' : ''}`}
                        onClick={() => handleTabClick('watchedCourses')}
                    >
                        <p>Watched Courses</p>
                    </div>
                </div>

                <div className="content2">
                    {activeTab === 'myReviews' && (
                        <div className="review-content">
                            <Link to="/Review">
                                <button className={`new-review-button`}>
                                    New Review
                                </button>
                            </Link>
                            <div>
                                {myReviews.map((review, index) => (
                                    <div key={index} className="review">
                                        <EditableReview
                                            data={review}
                                            id={review.id}
                                            onDelete={handleDeleteReview}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'ratedReviews' && (
                        <div className="rated-reviews">
                            <div>
                                {likedReviews.map((ratedReview, index) => (
                                    <div key={index} className="review">
                                        {ratedReview}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'watchedCourses' && (
                        <div className="watched-courses">
                            <div className="header">Your watched courses</div>
                            {coursesData.map((course) => (
                                <div key={course.name} className="course">
                                    <div className="course-information mt-4">
                                        <img
                                            src={coursesToRemove.includes(course.name) ? bookMarkBlank : bookMark}
                                            className="bookmark"
                                            alt="bookmark"
                                            onClick={() => handleBookmarkClick(course.name)}
                                        />
                                        {course.name}
                                    </div>
                                    {course.mockData && (
                                        <Coursediv data={course.mockData} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default MyProfile;