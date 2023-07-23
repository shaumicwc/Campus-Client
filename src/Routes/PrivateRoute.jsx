import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import Loader from '../Pages/Shared/Loader/Loader';
import { Navigate, useLocation} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuthContext()
    const location =useLocation()
    
    if(loading){
        return <Loader/>
    }

    if(user){
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace/>
};

export default PrivateRoute;