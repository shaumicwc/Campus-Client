import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../Providers/AuthProviders';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Hooks/useAuth';
import Loader from '../Shared/Loader/Loader';
import { toast } from 'react-hot-toast';
import useAuthContext from '../../Hooks/useAuthContext';

const ResetPassword = () => {
    const [error, setError] = useState('')
    const {loading, resetPassword, setLoading } = useAuthContext();
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.form?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        resetPassword(email)
        .then(() => {
            // Password reset email sent successfully
            toast.success('Password reset email sent. Please check your inbox')
            setLoading(false)
            navigate(from, { replace: true });
            console.log('Password reset email sent');
          })
          .catch((error) => {
            toast.error('Error sending password reset email. Resubmit the email and try again')
            setError('Password reset email sent. Please check your inbox')
            // Error occurred while sending password reset email
            console.log('Error sending password reset email', error.message);
          });
    }
    return (
        <>
            {
                loading && <Loader/>
            }
            <div className="hero">
                <form onSubmit={handleSubmit} className="card w-full max-w-sm md:max-w-md shadow-2xl bg-gray-400 my-10">
                    <p className='text-xl font-bold md:pt-5 pt-3 mx-auto md:text-3xl'>Reset Password</p>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input name='email' type="text" placeholder="Email" className="input input-bordered focus:outline-none" required />
                        </div>
                        <p className='text-red-600'>{error}</p>
                        <div className="form-control">
                            <button type='submit' className="btn btn-primary font-bold">submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;