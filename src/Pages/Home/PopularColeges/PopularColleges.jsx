import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FiSearch} from 'react-icons/fi'

const PopularColleges = () => {
    const [search, setSearch] = useState('')
    const { data: colleges = [] } = useQuery({
        queryKey: ['popular-colleges'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-colleges`);
            return response.data;
        },
    })
    const { data: singleCollege = [] } = useQuery({
        queryKey: ['single-college', search],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/search-colleges/${search}`);
            return response.data;
        },
    })

    const handleSearch = (e) => {
        console.log(e.target.value);
            // setSearch(e.target.value)
        }

    console.log(search);
    // vents, research history, and sports
    return (
        <div className='w-full'>
            <div className="relative mx-auto w-2/3 md:w-1/2 mt-5">
                <input  onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Type here to search" className="p-3 border-2 focus:outline-none rounded-lg border-gray-600 w-full" />
                <FiSearch  className='absolute right-5 top-4 cursor-pointer w-6 h-6' />
            </div>
            <p className='text-center md:text-2xl text-xl font-bold mt-5 md:mt-10'>Popular Colleges</p>
            <div className='w-1/4 md:w-1/12 bg-cyan-500 h-[3px] mx-auto mb-4 md:mb-6 mt-1'></div>
            <div className="grid gri-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                  search === '' &&  colleges.slice(0, 3).map((college, index) => (
                        <div key={index} className='card w-80 lg:w-96 glass mx-auto'>
                            <figure><img className='w-full h-[200px] md:h-[250px] lg:h-[270px]' src={college.image} alt={college.name} /></figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{college.name}</h2>
                                <p className='font-semibold'>Admission Date: <span className='font-normal'>{college.admission_dates}</span></p>
                                <p className='font-semibold'>Events : <span className='font-normal'>{college.events.join(', ')}</span></p>
                                <p className='font-semibold'>Spots : <span className='font-normal'>{college.sports.join(', ')}</span></p>
                                <p className='font-semibold'>Research History : <span className='font-normal'>{college.research_history}</span></p>
                            </div>
                            <Link to={`/college-details/${college._id}`}><button className='btn hover:bg-cyan-500 bg-cyan-500 font-bold w-full text-white'>See Details</button></Link>
                        </div>
                    ))
                }
                {
                  search !== '' &&  singleCollege.map((college, index) => (
                        <div key={index} className='card w-80 lg:w-96 glass mx-auto'>
                            <figure><img className='w-full h-[200px] md:h-[250px] lg:h-[270px]' src={college.image} alt={college.name} /></figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{college.name}</h2>
                                <p className='font-semibold'>Admission Date: <span className='font-normal'>{college.admission_dates}</span></p>
                                <p className='font-semibold'>Events : <span className='font-normal'>{college.events.join(', ')}</span></p>
                                <p className='font-semibold'>Spots : <span className='font-normal'>{college.sports.join(', ')}</span></p>
                                <p className='font-semibold'>Research History : <span className='font-normal'>{college.research_history}</span></p>
                            </div>
                            <Link to={`/college-details/${college._id}`}><button className='btn hover:bg-cyan-500 bg-cyan-500 font-bold w-full text-white'>See Details</button></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PopularColleges;