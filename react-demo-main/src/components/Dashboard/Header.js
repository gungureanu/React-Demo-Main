import React from 'react';
import reactJsLogo from "../../utils/images/reactjs-logo.jpg";
import gabePPImg from "../../utils/images/Gabe-Profile-Pic.jpg";
import signOut from "../../utils/images/logout.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
    const { firstName, lastName } = user || {};

    const navigate = useNavigate();

    const handleLogOut = () => {
        Cookies.remove('user');
        navigate("/")
    }

    return (
        <>
            <header>
                <img src={reactJsLogo} alt="React Logo" />
                <div onClick={handleLogOut} className="user-area">
                    <div className="user-pic-wrap user-online">
                        <img className="user-pic" src={gabePPImg} alt="Gabriel" />
                    </div>
                    <p className="user-title">{firstName} {lastName}</p>
                    <div class="user-panel">
                        <p>
                            <img src={signOut} alt="Logout" />
                            Logout
                        </p>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;