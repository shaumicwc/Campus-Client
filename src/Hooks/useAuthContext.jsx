import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useAuthContext = () => {
    const {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        googleSignInUser,
        signOutUser,
        resetPassword
    } = useContext(AuthContext);

    return {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        googleSignInUser,
        signOutUser,
        resetPassword
    }
};

export default  useAuthContext;
