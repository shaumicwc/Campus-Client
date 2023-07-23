import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {
    const { data: reviews = [] } = useQuery({
        queryKey: ['candidate'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/reviews`);
            return response.data;
        },
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : true,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
    };

    return (
        <div className='w-full'>
            <p className='text-center md:text-2xl text-xl font-bold mt-5 md:mt-10'>Testimonials</p>
            <div className='w-1/4 md:w-1/12 bg-cyan-500 h-[3px] mx-auto mb-4 md:mb-6 mt-1'></div>
            <Slider {...settings}>
                {reviews.map((review, index) => (
                    <div key={index} className="flex flex-col items-center justify-center lg:mx-96 md:mx-44">
                        <p className="py-8">{review.review}</p>
                        <Rating style={{ maxWidth: 180 }} value={review.ratings} readOnly />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Review;
