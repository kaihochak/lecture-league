import React, { useState, useEffect, useContext } from 'react';
import thumbsUpBlank from '../resources/thumbs-up.svg';
import thumbsUpGreen from '../resources/thumbs-up-green.svg';
import thumbsDownBlank from '../resources/thumbs-down.svg';
import thumbsDownRed from '../resources/thumbs-down-red.svg';
import APIService from '../APIService';
import { UserContext } from "../UserContext";
import { Rating } from '@mui/material';
import { StarIcon } from 'lucide-react';

function OverarallReviews({ isEditable, data }) {
    const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
    const [professor, setProfessor] = useState("");
    const [review, setReview] = useState("");
    const [university, setUniversity] = useState("");
    const [course, setCourse] = useState("");
    const [likedCount, setLikedCount] = useState(8);
    const [dislikedCount, setDislikedCount] = useState(3);
    const [submissionDate, setSubmissionDate] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [workload, setWorkload] = useState(0);
    const [usefulness, setUsefulness] = useState(0);
    const { username } = useContext(UserContext);

    useEffect(() => {
        if (data) {
            setUniversity(data.university);
            setCourse(data.course);
            setReview(data.review);
            setDifficulty(data.difficulty);
            setWorkload(data.workload);
            setUsefulness(data.usefulness);
            setProfessor(data.professor);
            setSubmissionDate(data.submission_date);
            setLikedCount(data.likes);
            setDislikedCount(data.dislikes);
        }
    }, [data]);

    const handleThumbsUpClick = () => {
        setThumbsUpClicked(!thumbsUpClicked);

        if (!thumbsUpClicked) {
            setLikedCount(likedCount + 1);
            if (thumbsDownClicked) {
                setDislikedCount(dislikedCount - 1);
            }
        } else {
            setLikedCount(likedCount - 1);
        }

        setThumbsDownClicked(false);

        const postData = {
            course,
            university,
            professor,
            workload,
            difficulty,
            usefulness,
            review,
            user: username,
            likes: likedCount,
            dislikes: dislikedCount
        }
        APIService.UpdateReview(postData, data.id);
    };

    const handleThumbsDownClick = () => {
        setThumbsDownClicked(!thumbsDownClicked);

        if (!thumbsDownClicked) {
            setDislikedCount(dislikedCount + 1);
            if (thumbsUpClicked) {
                setLikedCount(likedCount - 1);
            }
        } else {
            setDislikedCount(dislikedCount - 1);
        }

        setThumbsUpClicked(false);

        const postData = {
            course,
            university,
            professor,
            workload,
            difficulty,
            usefulness,
            review,
            user: username,
            likes: likedCount,
            dislikes: dislikedCount
        }
        APIService.UpdateReview(postData, data.id);
    };


    return (
        <div className='font-Montserrat shadow-lg rounded-sm bg-primary
                                my-6 p-2 md:p-4 items-center justify-between'>
            {
                isEditable ?
                    (
                        <div>

                        </div>
                    ) :
                    (
                        <div>
                            <div className='flex flex-col'>
                                {/* prof & date */}
                                <div className='flex justify-between mx-6 my-2'>
                                    <div><span className='font-semibold'>Professor: </span>{professor}</div>
                                    <div>{submissionDate}</div>
                                </div>

                                {/* main content */}
                                <div className='flex md:flex-row mx-6 my-2 gap-x-10 justify-between'>
                                    {/* Review */}
                                    <div className='md:w-[80%] py-2 px-4 border-2 border-tertiary sm:min-h-[150px]'>
                                        {review}
                                    </div>
                                    {/* Ratings & Likes */}
                                    <div className='flex flex-col justify-around'>
                                        {/* Ratings */}
                                        <div className='flex flex-col gap-x-6'>
                                            {/* Difficult */}
                                            <div className='flex justify-between gap-x-6'>
                                                <div className='font-semibold w-26'>Difficulty </div>
                                                <Rating
                                                    name="text-feedback"
                                                    value={difficulty}
                                                    readOnly
                                                    precision={1}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                            </div>
                                            {/* Workload */}
                                            <div className='flex justify-between gap-x-6'>
                                                <div className='font-semibold w-26'>Workload </div>
                                                <Rating
                                                    name="text-feedback"
                                                    value={workload}
                                                    readOnly
                                                    precision={1}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                            </div>
                                            {/* Usefulness */}
                                            <div className='flex justify-between'>
                                                <div className='font-semibold w-26'>Usefulness </div>
                                                <Rating
                                                    name="text-feedback"
                                                    value={usefulness}
                                                    readOnly
                                                    precision={1}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                            </div>
                                        </div>
                                        {/* Like Dislike */}
                                        <div className='flex flex-row md:flex-col items-center'>
                                            <div className='font-semibold flex'>
                                                <div onClick={handleThumbsUpClick}>
                                                    <img src={thumbsUpClicked ? thumbsUpGreen : thumbsUpBlank} className="h-6 w-6 cursor-pointer" alt="thumbs-up" />
                                                </div>
                                                <span className="text-md text-black ml-1">{likedCount}</span>
                                                <div onClick={handleThumbsDownClick} className='ml-4 mt-1'>
                                                    <img src={thumbsDownClicked ? thumbsDownRed : thumbsDownBlank} className="h-6 w-6 cursor-pointer" alt="thumbs-down" />
                                                </div>
                                                <span className="text-md text-black ml-1">{dislikedCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default OverarallReviews;


