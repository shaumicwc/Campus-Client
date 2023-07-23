import React, { useEffect, useState } from 'react';
// import useAuth from '../../Hooks/useAuthContext';
import useAuthContext from '../../Hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

const MyColleges = () => {
    const { user } = useAuthContext()
    const [showModal, setShowModal] = useState(false)
    const { data: candidate = [] } = useQuery({
        queryKey: ['candidate', user],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/candidates`);
            return response.data;
        },
    });

    const handleReview = () => {
        setShowModal(true)
    }

    useEffect(() => {
        if (showModal) {
            const modal = document.getElementById('modal_1')
            modal.showModal()
        }
    }, [showModal])

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target;
        const review = form.review.value;
        const ratings = parseFloat(form.ratings.value);

        const reviewData = { review, ratings }

        await axios.post(`${import.meta.env.VITE_BASE_URL}/reviews`, reviewData)
            .then(response => {
                console.log(response.data);
                if (response.data.acknowledged === true) {
                    toast.success('Review submitted successfully')
                }
            })

        setShowModal(false)
    }

    return (
        <>
            <Helmet>
                <title>Campus Hive || My College</title>
            </Helmet>
            <div>
                <p className='text-xl font-bold md:text-2xl text-center my-5 md:my-7'>My College</p>
                <div className='flex md:flex-row flex-col mx-auto md:space-x-5 w-11/12 md:w-2/3'>
                    {
                        candidate.slice(0, 1).map((candidate, index) => (
                            <>
                                <div className='md:w-1/2 w-full'>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Candidate Name</label>
                                        <input type="text" defaultValue={candidate.name} placeholder='Candidate Name' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Candidate Email</label>
                                        <input type="text" defaultValue={candidate.email} placeholder='Candidate Email' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Candidate Contact</label>
                                        <input type="text" defaultValue={candidate.contact} placeholder='Candidate Contact' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>College Name</label>
                                        <input type="text" defaultValue={candidate.collegeName} placeholder='Date of Birth' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                </div>
                                <div className='md:w-1/2 w-full'>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Subject</label>
                                        <input type="text" defaultValue={candidate.subject} placeholder='Subject' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Address</label>
                                        <input type="text" defaultValue={candidate.address} placeholder='Address' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Date of Birth</label>
                                        <input type="date" defaultValue={candidate.birthDate} placeholder='Date of Birth' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <button onClick={handleReview} className='btn hover:bg-cyan-500 bg-cyan-500 mx-auto mt-5 md:mt-9 font-bold w-full md:w-2/3 border-none text-white'>Add Review</button>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
            {
                showModal && (
                    <dialog id='modal_1' className="modal">
                        <form onSubmit={handleSubmit} method="dialog" className="modal-box w-full p-7 md:p-10 max-w-sm md:max-w-2xl">
                            <p className='text-xl font-bold md:text-2xl text-center mb-5 md:mb-7'>Add a Review</p>
                            <div className="form-control">
                                <label className="font-semibold pb-2">Add Review</label>
                                <textarea name='review' placeholder="Review" className="textarea textarea-bordered w-full focus:outline-none mb-3" ></textarea>
                            </div>
                            <div className="form-control">
                                <label className="font-semibold pb-2">Add Ratings</label>
                                <input type="text" name='ratings' placeholder='Ratings in 5' className='input input-bordered focus:outline-none mb-3' />
                            </div>
                            <button type='submit' className="btn hover:bg-gray-500 bg-gray-500 font-bold w-full text-white">Submit</button>
                        </form>
                    </dialog>
                )
            }
        </>
    );
};

export default MyColleges;