import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import useAuthContext from '../../Hooks/useAuthContext';

const Admission = () => {
    const { user } = useAuthContext()
    const [showModal, setShowModal] = useState(false)
    const [selectedCollege, setSelectedCollege] = useState({})
    const { data: colleges = [] } = useQuery({
        queryKey: ['colleges'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-colleges`);
            return response.data;
        },
    });

    const handleApply = college => {
        if (!user) {
            toast.error('Without login you can not apply for admission')
            return;
        } else {
            setSelectedCollege(college)
            setShowModal(true)
        }
    }

    useEffect(() => {
        if (showModal) {
            const modal = document.getElementById('modal_1')
            modal.showModal()
        }
    }, [showModal])

    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const contact = form.contact.value;
        const subject = form.subject.value;
        const address = form.address.value;
        const birthDate = form.birthDate.value
        const image = form.image.files[0]

        const formData = new FormData();
        formData.append('image', image);

        await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(data => {
                const photo = data.data.url;
                const candidateData = { name, email, address, birthDate, contact, subject, photo, collegeName: selectedCollege.name };
                axios.post(`${import.meta.env.VITE_BASE_URL}/candidates`, candidateData)
                    .then(response => {
                        if (response.data.acknowledged === true) {
                            toast.success('Applied successfully')
                        }
                    })
            })

        setShowModal(false)
    }

    return (
        <>
            <Helmet>
                <title>Campus Hive || Colleges</title>
            </Helmet>
            <div>
                <p className='text-xl font-bold md:text-2xl text-center my-5 md:my-7'>Apply for an Admission</p>
                <div className="overflow-x-auto md:w-2/3 lg:w-1/2 mx-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='bg-gray-500 text-white'>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                colleges.map((college, index) => (
                                    <tr key={index} className="hover:bg-cyan-500">
                                        <th>{index + 1}</th>
                                        <td><img className='w-[80px]' src={college.image} alt={college.name} /></td>
                                        <td className='text-base font-semibold'>{college.name}</td>
                                        <td><button onClick={() => handleApply(college)} className='btn hover:bg-gray-500 bg-gray-500 font-bold w-full text-white'>Apply</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                showModal && (
                    <dialog id='modal_1' className="modal w-full">
                        <form onSubmit={handleSubmit} method="dialog" className="modal-box w-11/12 max-w-5xl">
                            <div className='flex md:flex-row flex-col md:space-x-5 w-full'>
                                <div className='md:w-1/2 w-full'>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Candidate Name</label>
                                        <input type="text" name='name' placeholder='Candidate Name' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Candidate Email</label>
                                        <input type="text" name='email' placeholder='Candidate Email' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Candidate Contact</label>
                                        <input type="text" name='contact' placeholder='Candidate Contact' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                </div>
                                <div className='md:w-1/2 w-full'>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Subject</label>
                                        <input type="text" name='subject' placeholder='Subject' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Address</label>
                                        <input type="text" name='address' placeholder='Address' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                    <div className="form-control">
                                        <label className='font-semibold pb-2'>Date of Birth</label>
                                        <input type="date" name='birthDate' placeholder='Date of Birth' className='input input-bordered focus:outline-none mb-3' />
                                    </div>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className='font-semibold pb-2'>Candidate Image</label>
                                <input type="file" name='image' className="file-input file-input-bordered w-full mb-3" />
                            </div>
                            <div className='flex justify-evenly space-x-5 w-full'>
                                <button type='submit' className="btn hover:bg-gray-500 bg-gray-500 font-bold w-1/3 text-white">Apply</button>
                                <button onClick={() => setShowModal(false)} className="btn hover:bg-gray-500 bg-gray-500 font-bold w-1/3 text-white">Close</button>
                            </div>
                        </form>
                    </dialog>
                )
            }
        </>
    );
};

export default Admission;