import '../styles/Reviews.css';
import editImage from '../resources/edit.svg';
import deleteImage from '../resources/delete.svg';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import APIService from '../APIService';
import { Box, Rating } from '@mui/material';
import { UserContext } from "../UserContext";
import { StarIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import thumbsUpBlank from '../resources/thumbs-up.svg';
import thumbsDownBlank from '../resources/thumbs-down.svg';
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Separator } from '../components/ui/separator';

function RatingSet({ label, rating, setRating, editable }) {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center space-x-2">
      {levels.map((level) => (
        <button
          key={level}
          className={`h-8 w-8 rounded-full ${(rating >= level && editable) ? 'bg-secondary' :
            (rating <= level && editable) ? 'bg-secondary' :
              (rating >= level && !editable) ? 'bg-gray-600' :
                'bg-gray-400' // default background color if not editable or other conditions are not met
            } ${editable ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => (editable ? setRating(level) : null)}
          aria-label={`Set ${label} to ${level}`}
        />
      ))}
      <span>{label}</span>
    </div>
  );
}

function EditableReview({ data, id, onDelete }) {
  const [university, setUniversity] = useState(data.university || 'University of Calgary');
  const [course, setCourse] = useState(data.course || '513');
  const [professor, setProfessor] = useState(data.professor || 'Professor');
  const [difficulty, setDifficulty] = useState(data.difficulty || 0);
  const [workload, setWorkload] = useState(data.workload || 0);
  const [usefulness, setUsefulness] = useState(data.usefulness || 0);
  const [comments, setComments] = useState(data.review || 'No review available.');
  const [submissionDate, setSubmissionDate] = useState(data.submission_date || '');
  const { username } = useContext(UserContext);
  const [likedCount, setLikedCount] = useState(data.likes || 0);
  const [dislikedCount, setDislikedCount] = useState(data.dislikes || 0);

  const [editable, setEditable] = useState(false);

  const initialState = {
    university: university,
    course: course,
    professor: professor,
    difficulty: difficulty,
    workload: workload,
    usefulness: usefulness,
    comments: comments,
  };
  const [originalState, setOriginalState] = useState(initialState);
  const [currentState, setCurrentState] = useState({ ...initialState });

  // Handels Edit
  const handleSaveChanges = () => {
    setSaveAttempted(true);
    const isValid = validateInputs();

    if (isValid) {
      setEditable(false);
      setOriginalState({ ...currentState });

      const postData = {
        course: course,
        university,
        professor,
        workload,
        difficulty,
        usefulness,
        review: comments,
        user: username
      }
      APIService.UpdateReview(postData, data.id);
    }
  };

  // Handles Delete Review
  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (confirmed) {
      onDelete(id);
      APIService.DeleteReview(data.id);
    }
  };

  const [errorMessages, setErrorMessages] = useState({
    university: '',
    course: '',
    professor: '',
    comments: '',
  });

  const [saveAttempted, setSaveAttempted] = useState(false);

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
    setCurrentState((prevState) => ({
      ...prevState,
      comments: e.target.value,
    }));
  };

  const validateInputs = () => {
    const errors = {};

    if (university.trim() === '') {
      errors.university = 'University is required';
    }

    if (course.trim() === '') {
      errors.course = 'Course Code is required';
    }

    if (professor.trim() === '') {
      errors.professor = 'Professor\'s Name is required';
    }

    if (comments.trim() === '') {
      errors.comments = 'Comments are required';
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  // implement with backend
  const handleDiscardChanges = () => {
    setEditable(false);
    setCurrentState({ ...originalState });
    setSaveAttempted(false);
    setErrorMessages({
      university: '',
      course: '',
      professor: '',
      comments: '',
    });
    setUniversity(originalState.university);
    setCourse(originalState.course);
    setProfessor(originalState.professor);
    setDifficulty(originalState.difficulty);
    setWorkload(originalState.workload);
    setUsefulness(originalState.usefulness);
    setComments(originalState.comments);
    setSubmissionDate(originalState.submissionDate);
  };

  return (
    <div className='font-Montserrat flex flex-col md:flex-row w-full place-content-center'>

      {/* Form */}
      <div className=' shadow-lg rounded-sm bg-primary w-[75%]
                                my-6 p-2 md:p-4 items-center justify-between'>

        <div className='flex flex-col gap-y-2 w-full'>
          {/* info */}
          <div className='flex justify-between mx-6 my-2'>
            <div className='flex justify-start gap-x-6'>
              {/* professor */}
              {editable ?
                (<Input value={professor} className="w-48" type="email" placeholder="Professor name" onChange={(e) => setProfessor(e.target.value)} />) :
                (<div><span className='font-semibold'>Professor: </span>{professor}</div>)
              }
              {/* university */}
              <Separator orientation="vertical" />
              <Link
                to={`/UniversityPage/${encodeURIComponent(university)}`}
              >
                <div className='font-normal hover:underline'>{university}</div>
              </Link>
              {/* course */}
              <Separator orientation="vertical" />
              <Link
                to={`/overallCourseReview/${encodeURIComponent(course)}`}
              >
                <div className='font-normal hover:underline'>{course}</div>
              </Link>

            </div>
            <div>{submissionDate}</div>
          </div>
          {/* Main Content */}
          {editable ?
            (
              <div className='flex flex-col mx-6 my-2 gap-x-10 justify-between'>
                <div className='flex'>
                  <Textarea
                    placeholder="What do you want others to know about this class?"
                    className="sm:min-h-[150px] resize-none"
                    value={comments}
                    // {...field}
                    onChange={(e) => setComments(e.target.value)}
                  />
                  <div className='flex flex-col justify-around'>
                    {/* Ratings */}
                    <div className='flex flex-col  gap-x-6'>
                      {/* Difficult */}
                      <div className='flex justify-between gap-x-6'>
                        <div className='font-semibold w-26'>Difficulty </div>
                        <Rating
                          name="text-feedback"
                          value={difficulty}
                          precision={1}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          onChange={(event, newValue) => {
                            setDifficulty(newValue);
                          }}
                        />
                      </div>
                      {/* Workload */}
                      <div className='flex justify-between gap-x-6'>
                        <div className='font-semibold w-26'>Workload </div>
                        <Rating
                          name="text-feedback"
                          value={workload}
                          precision={1}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          onChange={(event, newValue) => {
                            setWorkload(newValue);
                          }}
                        />
                      </div>
                      {/* Usefulness */}
                      <div className='flex justify-between'>
                        <div className='font-semibold w-26'>Usefulness </div>
                        <Rating
                          name="text-feedback"
                          value={usefulness}
                          precision={1}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          onChange={(event, newValue) => {
                            setUsefulness(newValue);
                          }}
                        />
                      </div>
                    </div>
                    {/* Like Dislike */}
                    <div className='flex flex-row md:flex-col items-center'>
                      <div className='font-semibold flex gap-x-4'>
                        <img src={thumbsUpBlank} className="h-6 w-6" alt="thumbs-up" />
                        <span className="text-md text-black ml-1">{likedCount}</span>
                        <img src={thumbsDownBlank} className="h-6 w-6" alt="thumbs-down" />
                        <span className="text-md text-black ml-1">{dislikedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* error messages */}
                <div className='flex flex-col items-center md:items-start py-2 mx-6'>
                  {errorMessages.university && <div className="text-red-500">{errorMessages.university}</div>}
                  {errorMessages.courseCode && <div className="text-red-500">{errorMessages.courseCode}</div>}
                  {errorMessages.comments && <div className="text-red-500">{errorMessages.comments}</div>}
                  {errorMessages.professor && <div className="text-red-500">{errorMessages.professor}</div>}
                  {errorMessages.difficulty && <div className="text-red-500">{errorMessages.difficulty}</div>}
                  {errorMessages.workload && <div className="text-red-500">{errorMessages.workload}</div>}
                  {errorMessages.usefulness && <div className="text-red-500">{errorMessages.usefulness}</div>}
                </div>
              </div>
            ) :
            (
              <div className='flex md:flex-row mx-6 my-2 gap-x-10 justify-between'>
                {/* Review */}
                <div className='md:w-[80%] py-2 px-4 border-2 border-tertiary sm:min-h-[150px]'>
                  {comments}
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
                      <img src={thumbsUpBlank} className="h-6 w-6" alt="thumbs-up" />
                      <span className="text-md text-black ml-1">{likedCount}</span>
                      <img src={thumbsDownBlank} className="h-6 w-6" alt="thumbs-down" />
                      <span className="text-md text-black ml-1">{dislikedCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="flex flex-row md:flex-col justify-evenly mt-4 md:mt-0 md:ml-4  md:mr-0">
        {editable ? (
          <>
            <div className="cursor-pointer text-4xl md:text-2xl lg:text-4xl" onClick={handleSaveChanges}>
              <CiCircleCheck className='text-[#006400]' />
            </div>
            <div className="cursor-pointer text-4xl md:text-2xl lg:text-4xl" onClick={handleDiscardChanges}>
              <CiCircleRemove className='text-[#8b0000]' />
            </div>
          </>
        ) : (
          <>
            <div className="cursor-pointer text-2xl md:text-2xl lg:text-4xl" onClick={handleEditClick}>
              <CiEdit className='text-accent' />
            </div>
            <div className="cursor-pointer text-2xl md:text-2xl lg:text-4xl" onClick={handleDeleteClick}>
              <CiTrash className='text-accent' />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditableReview;