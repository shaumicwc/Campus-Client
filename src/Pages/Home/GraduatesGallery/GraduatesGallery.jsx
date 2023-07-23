import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const GraduatesGallery = () => {
    const { data: colleges = [] } = useQuery({
        queryKey: ['popular-colleges'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-colleges`);
            return response.data;
        },
    })
    return (
        <div className='w-full'>
            <p className='text-center md:text-2xl text-xl font-bold mt-5 md:mt-10'>Gallery</p>
            <div className='w-1/4 md:w-1/12 bg-cyan-500 h-[3px] mx-auto mb-4 md:mb-6 mt-1'></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    colleges.map((college, index) => (
                        <div key={index} className='mx-3 md:mx-5 pb-3 border-2 border-gray-500 rounded-lg'>
                            <img className='w-full h-[300px] rounded-t-md' src={college.graduates_image} alt="" />
                            <p className='text-center text-base md:text-xl font-bold mt-2 md:mt-3'>{college.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default GraduatesGallery;