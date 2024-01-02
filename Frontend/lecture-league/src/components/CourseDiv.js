import React from 'react';
import { Link } from 'react-router-dom';

export default function Course_div({ data }) {


    if (data) {
        return (
            <Link 
                to={`/overallCourseReview/${encodeURIComponent(data.name)}`} 
                className="w-[70%] md-[60%] m-2"
            >
                <div key={data.id} className='font-Montserrat border-1 shadow-lg border-tertiary rounded-sm bg-primary
                                                p-2 md:p-4 flex items-center justify-around
                                                hover:scale-105 transition duration-300 ease-in-out'>
                    {/* course code */}
                    <div className='w-[60%] relative'>
                        <h2 className="text-sm md:text-xl lg:text-2xl font-semibold">{data.name}</h2>
                        <h2 className="text-xs md:text-lg lg:text-xl">{data.title}</h2>
                    </div>
                    {/* ratings */}
                    <div className='w-[50%] xs:w-[40%] sm:w-[40%] md:w-[30%] px-2 text-l lg:text-xl whitespace-nowrap'>
                        <div className="flex justify-between">
                            <div className='text-xs sm:text-sm lg:text-xl font-semibold'>Difficulty</div>
                            <div className='text-xs sm:text-sm lg:text-xl'>{data.average_difficulty}</div> 
                        </div>
                        <div className="flex justify-between">
                            <div className='text-xs sm:text-sm lg:text-xl font-semibold'>Workload</div>
                            <div className='text-xs sm:text-sm lg:text-xl'>{data.average_workload}</div> 
                        </div>
                        <div className="flex justify-between">
                            <div className='text-xs sm:text-sm lg:text-xl font-semibold'>Usefulness</div>
                            <div className='text-xs sm:text-sm lg:text-xl'>{data.average_usefulness}</div> 
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
