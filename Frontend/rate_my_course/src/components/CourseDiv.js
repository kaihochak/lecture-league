import React from 'react';
import { Link } from 'react-router-dom';
import uni_logo from '../resources/logo-ucalgary.jpg'; // Assuming you use this somewhere
import Stars from '../resources/stars.jpg';

export default function Course_div({ data }) {


    if (data) {
        return (
            <Link 
                to={`/overallCourseReview/${encodeURIComponent(data.name)}`} 
                className="w-[60%] md-[50%] lg:w-[45%] xl:w-[40%] m-2"
            >
                <div key={data.id} className='font-Montserrat border-1 shadow-lg border-tertiary rounded-sm bg-primary
                                                p-2 md:p-4 flex items-center justify-around
                                                hover:scale-105 transition duration-300 ease-in-out'>
                    <div className='w-[60%] relative'>
                        <h2 className="text-2xl lg:text-3xl">{data.name}</h2>
                        <h2 className="text-1xl lg:text-xl">{data.title}</h2>
                    </div>
                    {/* ratings */}
                    <div className='w-[40%] md:w-1/4 px-2 '>
                        <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Difficulty: </strong>{data.average_difficulty}</div>
                        <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Workload: </strong>{data.average_workload}</div>
                        <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Usefulness: </strong>{data.average_usefulness}</div>
                    </div>
                </div>
            </Link>
        )
    }
}
