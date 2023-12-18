import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Reviews.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import APIService from '../APIService';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { Box, Rating } from '@mui/material';
import { UserContext } from "../UserContext";
import { StarIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

function RatingSet({ label, rating, setRating }) {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center space-x-2">
      {levels.map((level) => (
        <button
          key={level}
          className={`h-8 w-8 rounded-full ${rating >= level ? 'bg-secondary' : 'bg-accent'}`}
          onClick={() => setRating(level)}
          aria-label={`Set ${label} to ${level}`}
        />
      ))}
      <span>{label}</span>      
    </div>
  );
}

function Reviews() {
  const navigate = useNavigate();
  // const [token] = useCookies(['myToken'])
  const [professor, setProfessor] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [workload, setWorkload] = useState(0);
  const [usefulness, setUsefulness] = useState(0);
  const [comments, setComments] = useState('');
  const { username } = useContext(UserContext);
  const { courseName } = useParams();
  const [course, setCourse] = useState({});
  const [uniLogo, setUniLogo] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    university: '',
    courseName: '',
    courseNum: '',
    professor: '',
    comments: ''
  });

  const validateInputs = () => {
    const errors = {};

    if (difficulty === 0) {
      errors.difficulty = 'Difficulty Rating is required';
    }

    if (workload === 0) {
      errors.workload = 'Workload Rating is required';
    }

    if (usefulness === 0) {
      errors.usefulness = 'Usefulness Rating is required';
    }

    if (professor.trim() === '') {
      errors.professor = 'Professor\'s Name is required';
    }

    if (comments.trim() === "") {
      errors.comments = 'Comments are required';
      console.log("Comments are required");
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSaveChanges = () => {

    const isValid = validateInputs();

    if (isValid) {
      navigate(-1);
      const postData = {
        course: courseName,
        professor,
        workload,
        difficulty,
        usefulness,
        review: comments,
        user: username
      }
      APIService.InsertReview(postData);
    }
  };

  useEffect(() => {
    // Fetch course data
    if (courseName) {
      const decodedCourseName = decodeURIComponent(courseName);
      fetch(`http://localhost:8000/api/Course/${decodedCourseName}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(resp => resp.json())
        .then(data => setCourse(data))
        .catch(error => console.log(error));
    }
  }, [courseName]); // Dependency on courseName

  useEffect(() => {
    // Fetch university data
    if (course && course.university) {
      const decodedUniversityName = decodeURIComponent(course.university);

      const onSuccess = (data) => {
        setUniLogo(data.image);
      };
      const onError = (error) => {
        console.error('Error:', error);
      };

      APIService.GetUniversityData(decodedUniversityName, onSuccess, onError);
    }
  }, [course]); // Dependency on course


  return (
    <div >
      <Header />
      <div className='flex flex-col font-Montserrat justify-center mt-5 mx-10 md:mx-10'>

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
                    <div className='font-semibold w-26'>Difficulty </div>
                    <div className='flex justify-between'>
                      <Rating
                        name="text-feedback"
                        value={course.average_difficulty}
                        readOnly
                        precision={1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Box className="w-8" sx={{ ml: 2 }}>{course.average_difficulty}</Box>
                    </div>
                  </div>
                  {/* Workload */}
                  <div className='flex justify-between gap-x-6'>
                    <div className='font-semibold w-26'>Workload </div>
                    <div className='flex justify-between'>
                      <Rating
                        name="text-feedback"
                        value={course.average_workload}
                        readOnly
                        precision={1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Box className="w-8" sx={{ ml: 2 }}>{course.average_workload}</Box>
                    </div>
                  </div>
                  {/* Usefulness */}
                  <div className='flex justify-between gap-x-6'>
                    <div className='font-semibold w-26'>Usefulness </div>
                    <div className='flex '>
                      <Rating
                        name="text-feedback"
                        value={course.average_usefulness}
                        readOnly
                        precision={1}
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


        {/* Form */}
        <div className='font-Montserrat shadow-lg rounded-sm bg-primary
                                my-6 p-2 md:p-4 items-center justify-between'>
          <div className='flex md:flex-row mx-6 my-2 gap-x-8 justify-between'>
            {/* prof & review*/}
            <div className='flex flex-col gap-y-2 md:w-[80%]  '>
              {/* prof */}
              <Input value={professor} className="border-2" type="email" placeholder="Professor name" onChange={(e) => setProfessor(e.target.value)} />
              {/* Review */}
              <Textarea
                  placeholder="What do you want others to know about this class?"
                  className="sm:min-h-[150px] resize-none"
                  value={comments}
                  // {...field}
                  onChange={(e) => setComments(e.target.value)}
              />
            </div>
            {/* Ratings & Submit */}
            <div className='flex flex-col justify-between h-full'>
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
              {/* Submit Button */}
              <div className='flex justify-end '>
                <Button className="text-md mt-4" variant="secondary" onClick={handleSaveChanges}>Submit</Button>
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

        {/* Old Form */}
        <div className="review-container">
          <div className='form-container'>
            <div className='ml-4 mr-4'>
              <div className='flex flex-col items-center md:items-start py-2'>
                {errorMessages.university && <div className="text-red-500">{errorMessages.university}</div>}
                {errorMessages.courseCode && <div className="text-red-500">{errorMessages.courseCode}</div>}
                {errorMessages.comments && <div className="text-red-500">{errorMessages.comments}</div>}
                {errorMessages.professor && <div className="text-red-500">{errorMessages.professor}</div>}
                {errorMessages.difficulty && <div className="text-red-500">{errorMessages.difficulty}</div>}
                {errorMessages.workload && <div className="text-red-500">{errorMessages.workload}</div>}
                {errorMessages.usefulness && <div className="text-red-500">{errorMessages.usefulness}</div>}
              </div>
              <input
                type="text"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                className="form-input rounded-full py-2 px-4 border-2 border-tertiary my-4 mr-5 w-full md:w-min"
                placeholder="Professor's Name"
              />
            </div>
            <div className='my-4 pl-4'>
              <RatingSet label='Difficulty' rating={difficulty} setRating={setDifficulty} />
            </div>
            <div className='my-4 pl-4'>
              <RatingSet label='Workload' rating={workload} setRating={setWorkload} />
            </div>
            <div className='my-4 pl-4'>
              <RatingSet label='Usefulness' rating={usefulness} setRating={setUsefulness} />
            </div>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className='form-input flex-grow py-2 px-4 border-2 border-tertiary my-4 mx-5 sm:min-h-[200px]'
              placeholder='What do you want others to know about this class?'
            ></textarea>
          </div>
        </div>
        <div className='buttons-container'>
          <button
            className='rounded-xl h-20 w-28 bg-secondary text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-secondary m-3'
            onClick={() => navigate(-1)}>
            Cancel</button>
          <button
            className='rounded-xl h-20 w-28 bg-secondary text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-secondary m-3'
            onClick={handleSaveChanges}>
            Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;