import React, { useState, useEffect, useContext } from "react";
import '../styles/MyReviews.css';
import bookMark from '../resources/bookmark.svg';
import bookMarkBlank from '../resources/bookmark-blank.svg';
import EditableReview from "../components/EditableReview";
import RatedReview from "../components/RatedReview";
import Header from '../components/Header';
import Coursediv from "../components/CourseDiv";
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
        fetch(`http://localhost/api/Review/?user=${username}`, {
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
            name: "SENG 550",
            mockData: {
                id: 1,
                name: "SENG 550",
                title: "Big Data",
                average_workload: 3,
                average_difficulty: 4,
                average_usefulness: 5,
            }
        },
        {
            name: "SENG 511",
            mockData: {
                id: 2,
                name: "SENG 511",
                title: "Small Data",
                average_workload: 3,
                average_difficulty: 4,
                average_usefulness: 5,
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
                {/* Title */}
                <div className="flex flex-col items-center justify-center mt-10">
                    <h1 className="text-4xl font-semibold">Reviews</h1>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="Reviews">
                    <TabsList className="grid w-[80%] mx-auto mt-10 grid-cols-2">
                        <TabsTrigger value="Reviews">My Reviews</TabsTrigger>
                        {/* <TabsTrigger value="RatedReviews">Rated Reviews</TabsTrigger> */}
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
                    {/* <TabsContent value="RatedReviews">
                        <div className="rated-reviews">
                            <div>
                                {likedReviews.map((ratedReview, index) => (
                                    <div key={index} className="review">
                                        {ratedReview}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent> */}

                    {/* Saved */}
                    <TabsContent value="Saved">
                        <div className="w-full">
                            {coursesData.map((course) => (
                                <div key={course.name} className="my-2">
                                    <div className="flex justify-center">
                                        {course.mockData && (
                                            <Coursediv data={course.mockData} />
                                        )}
                                        <img
                                            src={coursesToRemove.includes(course.name) ? bookMarkBlank : bookMark}
                                            className="w-4 h-4 sm:w-6 sm:h-6 sm:m-4 place-self-center"
                                            alt="bookmark"
                                            onClick={() => handleBookmarkClick(course.name)}
                                        />
                                    </div>
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