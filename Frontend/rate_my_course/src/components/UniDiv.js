import React from 'react';
import { Link } from 'react-router-dom';

export default function Uni_div({ data }) {
  if (data) {
    return (
      <Link
        to={`/UniversityPage/${encodeURIComponent(data.name)}`}
        className="w-3/4 md:w-4/12 mt-6"
      >
        <div className='border-2 border-red-600 container shadow-lg p-2 md:p-4 flex items-center justify-between'>
          <div className="w-1/3 md:w-1/4 max-w-xs relative">
            <img src={data.image} className="w-full h-auto max-h-24 object-contain p-2" alt={`${data.name} logo`} />
          </div>
          <div className='w-2/3 md:w-3/4 px-2 md:pl-7'>
            <span className="block text-lg md:text-2xl font-normal text-left">{data.name}</span>
            <span className="block text-xs md:text-sm text-gray-500 font-normal">{data.reviewNum} reviews</span>
          </div>
        </div>
      </Link>
    )
  }
}
