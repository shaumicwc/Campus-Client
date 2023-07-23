import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Colleges = () => {
    const { data: colleges = [] } = useQuery({
        queryKey: ['colleges'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-colleges`);
            return response.data;
        },
    });
    console.log(colleges);

    return (
        <>
            <Helmet>
                <title>Campus Hive || Colleges</title>
            </Helmet>
            <div>
                <p className='text-xl font-bold md:text-2xl text-center my-5 md:my-7'>All colleges</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {colleges.map((college, index) => (
                        // Return JSX elements here
                        <div key={index} className='card w-80 lg:w-96 glass mx-auto'>
                            <figure><img className='w-full h-[200px] md:h-[250px] lg:h-[270px]'  src={college.image} alt={college.name} /></figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{college.name}</h2>
                                <p className='font-semibold'>Admission Date: <span className='font-normal'>{college.admission_dates}</span></p>
                                <p className='font-semibold'>Number of Research: <span className='font-normal'>{college.number_of_research}</span></p>
                                <p className='font-semibold flex items-center space-x-2'>Ratings: <span className='font-normal ml-1'>{college.ratings}</span><FaStar className='w-5 h-5 text-yellow-400'/></p>
                            </div>
                            <Link to={`/college-details/${college._id}`}><button className='btn hover:bg-cyan-500 bg-cyan-500 font-bold w-full text-white'>See Details</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Colleges;
