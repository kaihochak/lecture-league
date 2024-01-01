import React from 'react';
import { Link } from 'react-router-dom';

export default function Uni_div({ data }) {
  if (data) {
    return (
      <Link
        to={`/UniversityPage/${encodeURIComponent(data.name)}`}
        className="w-[70%] md-[60%] lg:w-[50%] xl:w-[40%] m-2"

      >
        <div className='font-Montserrat border-1 shadow-lg border-tertiary rounded-sm bg-primary
                        p-2 md:p-4 flex items-center justify-between
                        hover:scale-105 transition duration-300 ease-in-out'>
          {/* logo */}
          <div className="w-[20%] relative">
            <img src={data.image} className="w-full h-auto max-h-24 object-contain p-2" alt={`${data.name} logo`} />
          </div>
          {/* Uni Info */}
          <div className='w-[80%] md:w-3/4 px-2 md:pl-7'>
            <span className="block text-sm xs:text-lg md:text-2xl font-normal text-left">{data.name}</span>
            <span className="block text-xs xs:text-xs md:text-sm text-gray-500 font-normal">{data.reviewNum} reviews</span>
          </div>
        </div>
      </Link>
    )
  }
}
