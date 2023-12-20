import React, { useState, useEffect, useContext } from "react";
import '../styles/MyReviews.css';
import bookMark from '../resources/bookmark.svg';
import bookMarkBlank from '../resources/bookmark-blank.svg';
import EditableReview from "../components/EditableReview";
import RatedReview from "../components/RatedReview";
import Header from '../components/Header';
import Coursediv from "../components/WatchedCourseDiv";
import { UserContext } from "../UserContext";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"

const MyReviews = () => {
    const [activeTab, setActiveTab] = useState('myReviews');
    const [coursesToRemove, setCoursesToRemove] = useState([]);
    const [myReviews, setmyReviews] = useState([]);
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
    }, [username]);

    let name = username;
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
            <Header />
            <div className="flex flex-col w-full">
                <Tabs defaultValue="Reviews">
                    <TabsList className="grid w-[80%] mx-auto mt-10 grid-cols-3">
                        <TabsTrigger value="Reviews">My Reviews</TabsTrigger>
                        <TabsTrigger value="RatedReviews">Rated Reviews</TabsTrigger>
                        <TabsTrigger value="Saved">Saved</TabsTrigger>
                    </TabsList>

                    {/* My Reviews */}
                    <TabsContent value="Reviews">
                        <div className="w-full">
                            {myReviews.map((review, index) => (
                                <div key={index}>
                                    <EditableReview
                                        data={review}
                                        id={review.id}
                                        onDelete={handleDeleteReview}
                                    />
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Rated Reviews */}
                    <TabsContent value="RatedReviews">
                        <div className="rated-reviews">
                            <div>
                                {likedReviews.map((ratedReview, index) => (
                                    <div key={index} className="review">
                                        {ratedReview}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Saved */}
                    <TabsContent value="Saved">
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
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
export default MyReviews;