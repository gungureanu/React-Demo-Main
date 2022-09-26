import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const RouteDashBoard = () => {
    // If not valid user Redirect to login page
    const navigate = useNavigate();
    const cookie = Cookies.get("user")

    let user;
    if (cookie) user = JSON.parse(cookie)

    useEffect(() => {
        if (user?.userStatus !== "success") navigate("/")
    }, [user, cookie, navigate])

    return (
        <>
            <Outlet />
        </>
    );
};

export default RouteDashBoard;