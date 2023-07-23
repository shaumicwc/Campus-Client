import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const CollegeDetails = () => {
    const collegeDetails = useLoaderData()
    const {name, image, admission_dates, admission_process, event_details, events, events_facilities, 
        number_of_research, ratings, research_history, research_works, sports, sports_categories, 
        sports_facilities} = collegeDetails;
    // console.log(collegeDetails);
    return (
        <div className='flex flex-col'>
            <p className='text-center md:text-2xl text-xl font-bold my-5 md:my-7'>Details of {name}</p>
            <img className='md:w-11/12 md:mx-auto mx-3 mb-5' src={image} alt={name} />
            <div className='mx-3 md:mx-20 md:space-y-2'>
                <p className='text-base md:text-xl font-bold'>Admission Dates : <span className='font-normal'>{admission_dates}</span></p>
                <p className='text-base md:text-xl font-bold'>Admission Process : <span className='font-normal'>{admission_process}</span></p>
                <p className='text-base md:text-xl font-bold'>Events : <span className='font-normal'>{events.join(', ')}</span></p>
                <p className='text-base md:text-xl font-bold'>Event Details : <span className='font-normal'>{event_details}</span></p>
                <p className='text-base md:text-xl font-bold'>Event Facilities : <span className='font-normal'>{events_facilities}</span></p>
                <p className='text-base md:text-xl font-bold'>Sports : <span className='font-normal'>{sports.join(', ')}</span></p>
                <p className='text-base md:text-xl font-bold'>Sport Facilities : <span className='font-normal'>{sports_facilities}</span></p>
                <p className='text-base md:text-xl font-bold'>Sport Category : <span className='font-normal'>{sports_categories}</span></p>
                <p className='text-base md:text-xl font-bold'>Research Works : <span className='font-normal'>{research_works}</span></p>
                <p className='text-base md:text-xl font-bold'>Research History : <span className='font-normal'>{research_history}</span></p>
                <p className='text-base md:text-xl font-bold'>Number of Research : <span className='font-normal'>{number_of_research}</span></p>
                <p className='text-base md:text-xl font-bold flex items-center space-x-2'>Ratings : <span className='font-normal ml-1'>{ratings}</span><FaStar className='w-5 h-5 text-yellow-400'/></p>
            </div>
        </div>
    );
};

export default CollegeDetails;