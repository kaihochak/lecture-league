import React from 'react';
import { Link } from 'react-router-dom';
import uni_logo from '../resources/logo-ucalgary.jpg'; // Assuming you use this somewhere
import Stars from '../resources/stars.jpg';

export default function Course_div({ data }) {


    if (data) {
        return (
            <Link 
                to={`/overallCourseReview/${encodeURIComponent(data.name)}`} 
                className="w-3/4 md:w-4/12 h-24 mt-6"
            >
                <div className='search-results'>
                    <div key={data.id} className='result-box border-2 border-red-600 container shadow-lg w-full md:w-3/4 lg:w-1/2'>
                        <div className='results-left'>
                            <h2 className="text-2xl lg:text-3xl">{data.name}</h2>
                            <h2 className="text-1xl lg:text-xl"> Computer Science class </h2>
                        </div>
                        <div className='results-left'>
                            <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Difficulty: </strong>{data.average_difficulty}</div>
                            <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Workload: </strong>{data.average_workload}</div>
                            <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Usefulness: </strong>{data.average_usefulness}</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
