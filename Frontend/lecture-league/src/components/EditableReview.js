import '../styles/Reviews.css';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import APIService from '../APIService';
import { Box, Rating } from '@mui/material';
import { UserContext } from "../UserContext";
import { StarIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import thumbsUpBlank from '../resources/thumbs-up.svg';
import thumbsDownBlank from '../resources/thumbs-down.svg';
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Separator } from '../components/ui/separator';

function EditableReview({ data, id, onDelete }) {
  const [university, setUniversity] = useState(data.university || 'null');
  const [course, setCourse] = useState(data.course || 'null');
  const [professor, setProfessor] = useState(data.professor || 'null');
  const [difficulty, setDifficulty] = useState(data.difficulty || 0);
  const [workload, setWorkload] = useState(data.workload || 0);
  const [usefulness, setUsefulness] = useState(data.usefulness || 0);
  const [comments, setComments] = useState(data.review || 'null');
  const [submissionDate, setSubmissionDate] = useState(data.submission_date || '');
  const { username } = useContext(UserContext);
  const likedCount = data.likes;
  const dislikedCount = data.dislikes;

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
      <div className='shadow-lg rounded-sm bg-primary w-[85%] md:w-[75%] mx-auto md:mx-0
                                my-2 md:my-6 p-2 lg:p-4 items-center justify-between'>

        <div className='flex flex-col gap-y-2 w-full'>
          {/* info */}
          <div className='flex justify-between mx-2 my-1 lg:mx-6 md:my-2'>
            <div className='flex justify-start gap-x-2 lg:gap-x-6 text-xs sm:text-sm lg:text-base'>
              {/* professor */}
              {editable ?
                (<Input value={professor} className="w-24 sm:w-30 md:w-48" type="email" placeholder="Professor name" onChange={(e) => setProfessor(e.target.value)} />) :
                (<div><span className='font-semibold text-xs sm:text-sm lg:text-base'>Professor: </span>{professor}</div>)
              }
              <Separator orientation="vertical" />
              {/* university */}
              <Link
                className='flex items-center'
                to={`/UniversityPage/${encodeURIComponent(university)}`}
              >
                <div className='font-normal hover:underline'>{university}</div>
              </Link>
              {/* course */}
              <Separator orientation="vertical" />
              <Link
                className='flex items-center'
                to={`/overallCourseReview/${encodeURIComponent(course)}`}
              >
                <div className='font-normal hover:underline'>{course}</div>
              </Link>

            </div>
            <div className='text-xs sm:text-sm lg:text-base flex self-center'>{submissionDate}</div>
          </div>
          {/* Main Content */}
          {editable ?
            (
              <div className='flex flex-col mx-2 lg:mx-6 my-2 justify-between '>
                <div className='flex flex-col md:flex-row gap-x-4 gap-y-2 lg:gap-x-10 '>
                  <Textarea
                    placeholder="What do you want others to know about this class?"
                    className="md:w-[80%] sm:min-h-[140px] resize-none "
                    value={comments}
                    // {...field}
                    onChange={(e) => setComments(e.target.value)}
                  />
                  <div className='flex flex-col justify-around'>
                    {/* Ratings */}
                    <div className='flex flex-col gap-x-6'>
                      {/* Difficult */}
                      <div className='flex justify-between gap-x-6'>
                        <div className='font-semibold w-26 text-xs sm:text-sm lg:text-base'>Difficulty </div>
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
                        <div className='font-semibold w-26 text-xs sm:text-sm lg:text-base'>Workload </div>
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
                        <div className='font-semibold w-26 text-xs sm:text-sm lg:text-base'>Usefulness </div>
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
                      <div className='flex gap-x-4 font-semibold mx-auto'>
                        <div className='flex flex-col items-center'>
                          <img src={thumbsUpBlank} className="h-4 w-4 lg:h-6 lg:w-6 my-2" alt="thumbs-up" />
                          <span className="text-xs md:text-sm lg:text-base text-black">{likedCount}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                          <img src={thumbsDownBlank} className="h-4 w-4 lg:h-6 lg:w-6 my-2" alt="thumbs-down" />
                          <span className="text-xs md:text-sm lg:text-base text-black">{dislikedCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* error messages */}
                <div className='flex flex-col items-center md:items-start mx-6'>
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
              <div className='flex flex-col md:flex-row mx-2 lg:mx-6 lg:my-2 gap-y-2 gap-x-2 md:gap-x-4 lg:gap-x-10 justify-between'>
                {/* Review */}
                <div className='md:w-[80%] py-2 px-4 border-2 border-tertiary min-h-[100px] sm:min-h-[150px]'>
                  {comments}
                </div>
                {/* Ratings & Likes */}
                <div className='flex flex-col justify-around'>
                  {/* Ratings */}
                  <div className='flex flex-col gap-x-6'>
                    {/* Difficult */}
                    <div className='flex justify-between gap-x-6'>
                      <div className='font-semibold w-26 text-xs sm:text-sm lg:text-base'>Difficulty </div>
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
                      <div className='font-semibold w-26 text-xs sm:text-sm lg:text-base'>Workload </div>
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
                      <div className='font-semibold w-26 text-xs sm:text-sm lg:text-base'>Usefulness </div>
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
                  <div className='flex flex-row md:flex-col items-center mx-auto'>
                    <div className='flex gap-x-4 font-semibold'>
                      <div className='flex flex-col items-center'>
                          <img src={thumbsUpBlank} className="h-4 w-4 lg:h-6 lg:w-6 my-2" alt="thumbs-up" />
                          <span className="text-xs md:text-sm lg:text-base text-black">{likedCount}</span>
                      </div>
                      <div className='flex flex-col items-center'>
                        <img src={thumbsDownBlank} className="h-4 w-4 lg:h-6 lg:w-6 my-2" alt="thumbs-down" />
                        <span className="text-xs md:text-sm lg:text-base text-black">{dislikedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="flex flex-row md:flex-col justify-end gap-x-4 md:justify-around md:mx-auto mb-4 mt-2 mr-10 sm:mr-14 md:mt-0 md:ml-4 md:mr-0">
        {editable ? (
          <>
            <div className="cursor-pointer text-lg md:text-2xl lg:text-4xl" onClick={handleSaveChanges}>
              <CiCircleCheck className='text-[#006400]' />
            </div>
            <div className="cursor-pointer text-lg md:text-2xl lg:text-4xl" onClick={handleDiscardChanges}>
              <CiCircleRemove className='text-[#8b0000]' />
            </div>
          </>
        ) : (
          <>
            <div className="cursor-pointer text-lg md:text-2xl lg:text-4xl" onClick={handleEditClick}>
              <CiEdit className='text-accent' />
            </div>
            <div className="cursor-pointer text-lg md:text-2xl lg:text-4xl" onClick={handleDeleteClick}>
              <CiTrash className='text-accent' />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditableReview;