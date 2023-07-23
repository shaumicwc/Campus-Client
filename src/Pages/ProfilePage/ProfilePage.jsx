import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
// import useAuth from '../../Hooks/useAuthContext';
import useAuthContext from '../../Hooks/useAuthContext';

const ProfilePage = () => {
    const { user } = useAuthContext()
    const [showModal, setShowModal] = useState(false)

    const { data: currentUser = {}, refetch } = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/current-user?email=${user?.email}`);
            return response.data;
        },
    });

    const handleProfileUpdate = () => {
        setShowModal(true)
        // axios.put(`${import.meta.env.VITE_BASE_URL}/update-profile`, profile)
        //     .then(response => {
        //         console.log(response.data);
        //     })
    }

    useEffect(() => {
        if (showModal) {
            const modal = document.getElementById('modal_1')
            modal.showModal()
        }
    }, [showModal])

    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const university = form.university.value;
        const address = form.address.value;

        const updatedProfile = {name, email, university, address};

        console.log(updatedProfile);

        axios.put(`${import.meta.env.VITE_BASE_URL}/update-profile?id=${currentUser?._id}`, updatedProfile)
        .then(response => {
            if (response.data.acknowledged === true) {
                toast.success('Profile updated successfully')
                refetch()
            }
            console.log(response.data);
        })

        setShowModal(false)
    }
    console.log(currentUser);
    return (
        <>
            <Helmet>
                <title>Campus Hive || Profile</title>
            </Helmet>
            <div>
                <p className='text-xl font-bold md:text-2xl text-center my-5 md:my-7'>Your Profile</p>
                <div className='md:w-1/2 w-11/12 mx-auto p-5 rounded-md bg-gray-300 flex flex-col'>
                    <p className='text-base md:text-xl font-bold'>Profile Name : <span className='font-normal'>{currentUser?.name}</span></p>
                    <p className='text-base md:text-xl font-bold'>Primary Email : <span className='font-normal'>{currentUser?.primaryEmail}</span></p>
                    <p className='text-base md:text-xl font-bold'>Secondary Email : <span className='font-normal'>{currentUser?.secondaryEmail}</span></p>
                    <p className='text-base md:text-xl font-bold'>University : <span className='font-normal'>{currentUser?.university}</span></p>
                    <p className='text-base md:text-xl font-bold'>Address : <span className='font-normal'>{currentUser?.address}</span></p>
                    <button onClick={handleProfileUpdate} className='btn hover:bg-cyan-500 bg-cyan-500 mx-auto mt-5 font-bold w-2/3 border-none text-white'>Edit Profile</button>
                </div>

            </div>
            {
                showModal && (
                    <dialog id='modal_1' className="modal">
                        <form onSubmit={handleSubmit} method="dialog" className="modal-box w-full p-7 md:p-10 max-w-sm md:max-w-2xl">
                            <p className='text-xl font-bold md:text-2xl text-center mb-5 md:mb-7'>Update Your Profile</p>
                            <div className="form-control">
                                <label className='font-semibold pb-2'>Profile Name</label>
                                <input type="text" name='name' placeholder='Profile Name' className='input input-bordered focus:outline-none mb-3' />
                            </div>
                            <div className="form-control">
                                <label className='font-semibold pb-2'>Profile Email</label>
                                <input type="email" name='email' placeholder='Profile Email' className='input input-bordered focus:outline-none mb-3' />
                            </div>
                            <div className="form-control">
                                <label className='font-semibold pb-2'>University</label>
                                <input type="text" name='university' placeholder='University Name' className='input input-bordered focus:outline-none mb-3' />
                            </div>
                            <div className="form-control">
                                <label className='font-semibold pb-2'>Address</label>
                                <input type="text" name='address' placeholder='Address' className='input input-bordered focus:outline-none mb-3' />
                            </div>
                            <button type='submit' className="btn hover:bg-gray-500 bg-gray-500 font-bold w-full text-white">Save Changes</button>
                        </form>
                    </dialog>
                )
            }
        </>
    );
};

export default ProfilePage;