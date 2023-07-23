import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Researches = () => {
  const { data: colleges = [] } = useQuery({
    queryKey: ['popular-colleges'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-colleges`);
      return response.data;
    },
  });

  // Filter colleges with valid research links
  const researchLinkColleges = colleges.filter((college) => college.research_link);

  return (
    <div className='w-full'>
      <p className='text-center md:text-2xl text-xl font-bold mt-5 md:mt-10'>Research Papers Links</p>
      <div className='w-1/4 md:w-1/12 bg-cyan-500 h-[3px] mx-auto mb-4 md:mb-6 mt-1'></div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {researchLinkColleges.map((college, index) => (
          <div key={index} className='bg-cyan-400 p-7 rounded-lg mx-3 md:mx-5'>
            <p className='text-center md:text-2xl text-xl font-bold'>{college.name}</p>
            <p className='text-base font-bold mt-1'>Research Link : <a className='font-normal' href={college.research_link} target='_blank'>{college.research_link}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Researches;
