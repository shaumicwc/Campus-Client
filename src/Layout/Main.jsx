import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import {Toaster} from 'react-hot-toast'

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            <Toaster/>
        </div>
    );
};

export default Main;