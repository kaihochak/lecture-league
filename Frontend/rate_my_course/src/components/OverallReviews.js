import '../styles/Reviews.css';
import React, { useState, useEffect, useContext } from 'react';
import Date from './Date';
import thumbsUpBlank from '../resources/thumbs-up.svg';
import thumbsUpGreen from '../resources/thumbs-up-green.svg';
import thumbsDownBlank from '../resources/thumbs-down.svg';
import thumbsDownRed from '../resources/thumbs-down-red.svg';
import APIService from '../APIService';
import { UserContext } from "../UserContext";


function RatingSet ({label, rating, setRating}) {
  const levels = [1,2,3,4,5];

  return (
    <div className="flex items-center space-x-2">
      {levels.map((level) => (
        <button
          key={level}
          className={`h-8 w-8 rounded-full cursor-default ${rating >= level ? 'bg-red-600' : 'bg-red-200'}`}
          aria-label={`Set ${label} to ${level}`}
        />
      ))}
      <span>{label}</span>
    </div>
  );
}

function OverarallReviews({data, index}) {
    const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
    const [professor, setProfessor] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [workload, setWorkload] = useState("");
    const [usefulness, setUsefulness] = useState("");
    const [review, setReview] = useState("");
    const [university, setUniversity] = useState("");
    const [course, setCourse] = useState("");
    const [likedCount, setLikedCount] = useState(8);
    const [dislikedCount, setDislikedCount] = useState(3);
    const [submissionDate, setSubmissionDate] = useState("");
    const { username } = useContext(UserContext);


    useEffect(() => {
        if(data) {
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

        const postData ={
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

        const postData ={
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
        <div>
            <div className='mt-6 bg-red-600 border-2 border-red-600 font-bold shadow-lg py-2 px-2 w-1/2 md:w-1/6'>
                <span className="text-md text-white text-center">Review #{index + 1}</span>
            </div>

            <div className='md:flex-row w-full'>
                <div className='form-container-3'>

                    <div className='flex justify-between'>
                        <div className='ml-4 mr-4'>
                            <input
                                readOnly={true}
                                type="text"
                                value={university}
                                className="form-input rounded-full py-2 px-4 border-2 border-red-600 my-4 mr-5 w-full md:w-min focus:outline-none cursor-default" 
                                placeholder="University"
                            />
                            <input
                                readOnly={true}
                                type="text"
                                value={course}
                                className="form-input rounded-full py-2 px-4 border-2 border-red-600 my-4 mr-5 w-full md:w-min focus:outline-none cursor-default"
                                placeholder="Course Number"
                            />
                            <input
                                readOnly={true}
                                type="text"
                                value={professor}
                                className="form-input rounded-full py-2 px-4 border-2 border-red-600 my-4 mr-5 w-full md:w-min focus:outline-none cursor-default"
                                placeholder="Professor's Name"
                            />
                        </div>
                        <div className=' mr-2 mt-4 md:mr-7'>
                            <span className=' text-sm md:text-black md:font-bold md:text-2xl'>{data.person}</span>
                        </div>
                    </div>

                    <div className='my-4 pl-4'>
                        <RatingSet label='Difficulty' rating={difficulty} />
                    </div>
                    <div className='my-4 pl-4'>
                        <RatingSet label='Workload' rating={workload} />
                    </div>
                    <div className='my-4 pl-4'>
                        <RatingSet label='Usefulness' rating={usefulness} />
                    </div>

                    <div className='form-input flex-grow py-2 px-4 border-2 border-red-600 my-4 mx-5 sm:min-h-[200px]'>
                        {review}
                    </div>

                    <div className = 'w-full md:flex md:flex-row flex flex-col mb-2'>
                        <div className='ml-8 mt-2 mb-2 font-bold flex'>
                            <div onClick={handleThumbsUpClick}>
                                <img src={thumbsUpClicked ? thumbsUpGreen : thumbsUpBlank} className="h-6 w-6 cursor-pointer" alt="thumbs-up"/>
                            </div>
                            <span className="text-md text-black ml-1">{likedCount}</span>
                            <div onClick={handleThumbsDownClick} className='ml-4 mt-1'>
                                <img src={thumbsDownClicked ? thumbsDownRed : thumbsDownBlank} className="h-6 w-6 cursor-pointer" alt="thumbs-down"/>
                            </div>
                            <span className="text-md text-black ml-1">{dislikedCount}</span>
                        </div>
                        {/* <div className='ml-8 mt-2 mb-2 font-bold'>
                            <span className="text-md text-gray-400">{likedCount} people upvoted this post</span>
                        </div> */}
                    </div>
                </div>
                <Date date={submissionDate}/>
            </div>
            
        </div>
    );
  }
  
  export default OverarallReviews;


