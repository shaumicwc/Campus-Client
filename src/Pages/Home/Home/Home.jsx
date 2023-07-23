import React from 'react';
import PopularColleges from '../PopularColeges/PopularColleges';
import GraduatesGallery from '../GraduatesGallery/GraduatesGallery';
import Researches from '../Researches/Researches';
import { Helmet } from 'react-helmet';
import Review from '../Review/Review';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Campus Hive || Home</title>
            </Helmet>
            <div className='flex flex-col items-center justify-center w-full'>
                <PopularColleges />
                <GraduatesGallery />
                <Researches />
                <Review/>
            </div>
        </>
    );
};

export default Home;