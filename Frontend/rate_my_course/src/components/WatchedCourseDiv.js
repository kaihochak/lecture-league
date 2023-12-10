import React from 'react';
import { Link } from 'react-router-dom';
import uni_logo from '../resources/logo-ucalgary.jpg';
import Stars from '../resources/stars.jpg';


export default function Course_div({ data }) {


    const courseChoice = (result) => {
        console.log("Choosing class", result);
    };

    if (data) {
        return (
            <Link to={`/overallCourseReview/${encodeURIComponent(data.name)}`} className="w-3/4 md:w-4/12 h-24 mt-6">
                <div className='search-results'>
                    <div key={data.id} className='result-box border-2 border-red-600 container shadow-lg w-full' onClick={() => courseChoice(data)}>
                        <div className='results-left'>
                            <h2 className="text-2xl lg:text-3xl">{data.name}</h2>
                            <h2 className="text-1xl lg:text-xl"> Computer Science class </h2>
                            <img src={Stars} alt="Starts-4"className='stars w-3/4' />
                        </div>
                        <div className='results-left'>
                            <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Workload: </strong>2.4</div>
                            <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Difficulty: </strong>3.4</div>
                            <div className="text-1xl lg:text-2xl whitespace-nowrap"><strong>Usefulness: </strong>4.8</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}