import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Colleges from "../Pages/Colleges/Colleges";
import Admission from "../Pages/Admission/Admission";
import MyColleges from "../Pages/MyColleges/MyColleges";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import CollegeDetails from "../Pages/CollegeDetails/CollegeDetails";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : 'colleges',
                element : <Colleges/>
            },
            {
                path : 'college-details/:id',
                element : <PrivateRoute><CollegeDetails/></PrivateRoute>,
                loader : ({params}) => fetch(`${import.meta.env.VITE_BASE_URL}/all-colleges/${params.id}`)
            },
            {
                path : 'admission',
                element : <Admission/>
            },
            {
                path : 'my-colleges',
                element : <PrivateRoute><MyColleges/></PrivateRoute>
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : 'sign-up',
                element : <SignUp/>
            },
            {
                path : 'reset-password',
                element : <ResetPassword/>
            },
            {
                path : 'profile',
                element : <PrivateRoute><ProfilePage/></PrivateRoute>
            }
        ]
    }
])

export default router;