import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet";
// import { useAuth } from '../../Hooks/useAuth';
import Loader from '../Shared/Loader/Loader';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(true)
    const [showPass, setShowPass] = useState(true)
    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, setUser, loading, setLoading, createUser, googleSignInUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = async data => {
        const name = data.name;
        const password = data.password;
        const email = data.email;

        if (data.password !== data.confirmPassword) {
            setPasswordError('Password did not match. Try again')
            return;
        }
        setError('')
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                const savedUser = { name: name, primaryEmail: user.email, secondaryEmail: null, university : null, address: null }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, savedUser)
                setLoading(false)
                toast.success('Sign up successfully')
            })
            .catch((err) => {
                const errorMessage = err.message;
                if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    setError('Please input a valid email address');
                    setLoading(false)
                } else if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                    setError('This email already exists. Please login');
                    setLoading(false)
                } else if (errorMessage === 'Firebase: Error (auth/popup-closed-by-user).') {
                    setLoading(false)
                }
                console.log(errorMessage);
            });
    }
    // console.log(user)
    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                const user = result.user;
                const savedUser = { name: user.displayName, primaryEmail: user.email, secondaryEmail: null, university : null, address: null }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, savedUser)
                setUser(user)
                setLoading(false)
                toast.success('Sign up successfully')
            })
            .catch(err => {
                if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
                    setLoading(false)
                }
                console.log(err.message)
                setLoading(false)
            })
    }

    return (
        <>
            <Helmet>
                <title>Campus Hive || Sign Up</title>
            </Helmet>

            <div className='my-10 mx-5 md:mx-auto lg:mx-auto md:w-1/2 lg:w-1/3 bg-gray-400 p-10 shadow-2xl rounded-lg flex flex-col' >
                {
                    loading && <Loader />
                }
                <p className='text-4xl font-bold text-center mb-5 text-black'>Sign Up</p>
                <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <label className='md:text-xl font-semibold mb-3 text-black'>Name</label>
                    <input placeholder='Name' className='mb-5 p-3 focus:outline-none' {...register('name', { required: true })} />
                    {errors?.name?.types === 'required' && <p className='text-red-800 mb-2'>Name is required</p>}
                    <label className='md:text-xl font-semibold mb-3 text-black'>Email</label>
                    <input placeholder='Email' className='mb-5 p-3 focus:outline-none' {...register('email', { required: true })} />
                    {errors?.email?.types === 'required' && <p className='text-red-800 mb-2'>Email is required</p>}
                    <label className='md:text-xl font-semibold mb-3 text-black'>Password</label>
                    <div className='relative w-full'>
                        <input placeholder='Password' className='mb-5 w-full p-3 focus:outline-none' type={show ? 'text' : 'password'} {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/ })} />
                        <div onClick={() => setShow(!show)} className='absolute inset-y-0 right-3 top-3.5'>
                            {show ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />}
                        </div>
                    </div>
                    {errors.password?.type === 'required' && <p className='text-red-800 -mt-2 mb-2'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-800 -mt-2 mb-2'>Password must be at least 6 characters</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-800 -mt-2 mb-2'>Password must have at least 1 capital letter and 1 special character</p>}
                    <label className='md:text-xl font-semibold mb-3 text-black'>Confirm Password</label>
                    <div className='relative w-full'>
                        <input placeholder='Password' className='mb-5 w-full p-3 focus:outline-none' type={showPass ? 'text' : 'password'} {...register('confirmPassword', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/ })} />
                        <div onClick={() => setShowPass(!showPass)} className='absolute inset-y-0 right-3 top-3.5'>
                            {showPass ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />}
                        </div>
                    </div>
                    {errors.confirmPassword?.type === 'required' && <p className='text-red-800 -mt-2 mb-2'>Password is required</p>}
                    {errors.confirmPassword?.type === 'minLength' && <p className='text-red-800 -mt-2 mb-2'>Password must be at least 6 characters</p>}
                    {errors.confirmPassword?.type === 'pattern' && <p className='text-red-800 -mt-2 mb-2'>Password must have at least 1 capital letter and 1 special character</p>}
                    {passwordError && <p className='text-red-800 -mt-2 mb-2'>{passwordError}</p>}
                    <p className='mb-3 text-black'>Already have an account ? <Link to='/login'><span className='underline'>Please login</span></Link></p>
                    <p className='text-red-800 py-3'>{error}</p>
                    <button type='submit' className='btn  btn-primary font-bold'>Sign Up</button>
                </form>
                <div className='divider'>Or</div>
                <div onClick={handleGoogleSignIn} className='text-black cursor-pointer flex items-center justify-evenly w-full py-3 px-2 md:px-10 mx-auto border-2 mt-3 border-black rounded-full'><FcGoogle className='w-7 h-7' /> <p className='font-bold md:text-xl text-center'>Sign in with Google</p></div>
            </div>
        </>
    );
};

export default Login;