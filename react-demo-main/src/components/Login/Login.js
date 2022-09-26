import React, { useState } from 'react';
import logoImg from '../../utils/images/reactjs-logo.jpg';
import logoIcon from '../../utils/images/reactjs-logo-icon.jpg';
import "../../utils/css/login.css";
import "../../utils/css/animate.css";
import Error from '../ui/Error';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../redux/features/api/apiSilce";
import { useEffect } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validationErr, setValidationErr] = useState('');
    const navigate = useNavigate();
    const [login, { data, isLoading, isError }] = useLoginMutation();

    useEffect(() => {
        if (data?.userStatus === "success") {
            const newData = {
                ...data,
                remember
            }
            const userData = JSON.stringify(newData)
            Cookies.set("user", userData)

            // Navigate to dashboard
            return navigate("/dashboard")
        }
    }, [data, navigate, remember])

    useEffect(() => {
        let user;
        const cookie = Cookies.get("user");

        if (cookie) user = JSON.parse(cookie)
        if (user?.remember) return navigate("/dashboard")
    }, [remember, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setValidationErr("Enter a valid email!")
        if (password.length < 8) return setValidationErr("Password should minimum 8 charecters long!")

        setValidationErr('');

        login({ emailAddress: email, password })
    }

    return (
        <>
            <header>
                <img src={logoImg} alt="React Logo" />
            </header>
            <div className="login-wrapper animated fadeIn">
                <div className="login-l">
                    <img src={logoIcon} alt="React Logo" />
                </div>
                <div className="login-r">
                    <img src={logoImg} alt="React Logo" />
                    <p className="log-in-txt">Use your ReactDemo account information to sign in.</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="Login"
                            title="User name"
                            id=""
                            className="login-field"
                            autoComplete="off"
                            spellCheck="false" tabIndex="1"
                            placeholder="User Name"
                            required
                            maxLength="100"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {data?.userStatus === "invalidemail" && <Error message="Invalid Email!" />}

                        <input
                            type="password"
                            name="Password"
                            title="Password"
                            id=""
                            className="login-field"
                            autoComplete="off"
                            spellCheck="false"
                            tabIndex="2"
                            placeholder="Password"
                            required
                            maxLength="20"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {data?.userStatus === "invalidpassword" && <Error message="Incorrect Password!" />}

                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                value=""
                                defaultChecked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            <label htmlFor="rememberme"> Remember Me</label>
                        </div>

                        <button
                            // onClick={handleLogin}
                            disabled={isLoading}
                            type='submit'
                            className="login-btn"
                            tabIndex="4"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Error Message */}
                    {isError && <Error message="Error Occured!" />}
                    {validationErr && <Error message={validationErr} />}
                </div>
            </div>
        </>
    );
};

export default Login;