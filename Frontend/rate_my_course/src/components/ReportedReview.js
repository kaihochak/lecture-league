import '../styles/Reviews.css';
import React, { useState } from 'react';
import Date from './Date';

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

function ReportedReview({id, onDelete}) {
    const [professor, setProfessor] = useState('Joseph James');
    const [difficulty, setDifficulty] = useState(5);
    const [workload, setWorkload] = useState(2);
    const [usefulness, setUsefulness] = useState(3);
    const [comments, setComments] = useState('Great course!');
    const [university, setUniversity] = useState('Test Uni');
    const [courseNum, setCourseNum] = useState('Test CourseNum');
    const [courseCode, setCourseCode] = useState('Test CourseCode');

    const handleRemoveClick = () => {
        const confirmed = window.confirm("Are you sure you want to remove this review?");
        
        if (confirmed) {
            onDelete(id);
        }
    };

    const handleApproveClick = () => {
        onDelete(id); // This will call the function passed from the parent component
    };

    return (
        <div className='md:flex-row w-full'>
            <div className='form-container-3'>
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
                        value={courseCode}
                        className="form-input rounded-full py-2 px-4 border-2 border-red-600 my-4 mr-5 w-full md:w-min focus:outline-none cursor-default"
                        placeholder="Course Code"
                    />
                    <input
                        readOnly={true}
                        type="text"
                        value={courseNum}
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
                <div className='my-4 pl-4'>
                    <RatingSet label='Difficulty' rating={difficulty} />
                </div>
                <div className='my-4 pl-4'>
                    <RatingSet label='Workload' rating={workload} />
                </div>
                <div className='my-4 pl-4'>
                    <RatingSet label='Usefulness' rating={usefulness} />
                </div>
                <div
                    className='form-input flex-grow py-2 px-4 border-2 border-red-600 my-4 mx-5 sm:min-h-[200px]'
                >
                    {comments}
                </div>
            </div>
  
            <Date></Date>

            <div className="flex mt-5 mb-10">
                <div className="approve-button" onClick={handleApproveClick}>
                    <button className='rounded h-10 w-1/8 bg-green-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-green-900'>Approve
                    </button>
                </div>
                <div className="remove-button ml-6" onClick={handleRemoveClick}>
                    <button className='rounded h-10 w-1/8 bg-red-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-red-900'>Remove
                    </button>                           
                </div>
            </div>

        </div>
    );
  }
  
  export default ReportedReview;