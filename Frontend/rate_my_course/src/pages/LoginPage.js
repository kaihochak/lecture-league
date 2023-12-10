import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import rateMyCourse_white_logo from '../resources/logo-white.png';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';

import '../styles/LoginPage.css';

const LoginPage = (props) => {
    const [username, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [token, setToken] = useCookies(['mytoken'])
    
    const { setIsLoggedIn, setUsername } = useContext(UserContext);

    const navigate = useNavigate();
    
    useEffect(() => {
        if(token['mytoken']) {
            navigate('/home');
        }
    }, [token, navigate]);

    const validateForm = () => {
        let isValid = true;
        if (!username) {
            setEmailError("Email is required");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError("");
        }
        return isValid;
    }

    const loginBtn = () => {
        if (validateForm()) {
            APIService.LoginUser({username, password})
            .then(resp => {
                if (resp.token) {
                    setToken("mytoken", resp.token);
                    setIsLoggedIn(true); // Update the login state
                    setUsername(username);
                    localStorage.setItem('username', username);
                    navigate('/home');
                } else {
                    setEmailError("Incorrect credentials, please try again");
                    setPasswordError("Incorrect credentials, please try again");
                }
            })
            .catch(error => {
                setEmailError("Login failed, please try again");
                setPasswordError("Login failed, please try again");
                console.log(error);
            });
        }
    }

    return(
        <div className={"mainContainer"} id="loginPageMainContainer">
            <div className="innerContainer mt-20 md:mt-28">
                <img src={rateMyCourse_white_logo} className=' h-72 md:h-96' alt='logo' />
                <div className={"titleContainer"}>Login</div>

                <br />
                <div className={"inputContainer"}>
                    <div className="inputContainerTitle md:text-3xl">
                        Username: 
                    </div>
                    <input
                        value={username}
                        placeholder="Username"
                        onChange={ev => setEmail(ev.target.value)}
                        className={"inputBox"} />
                    <label className="text-red-600 ml-1">{emailError}</label>
                </div>
                <br />

                <div className={"inputContainer"}>
                    <div className="inputContainerTitle md:text-3xl">
                        Password:
                    </div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={ev => setPassword(ev.target.value)}
                        className={"inputBox"} />
                    <label className=" text-red-600 ml-1">{passwordError}</label>
                </div>
                <br />
                <button onClick = {loginBtn} className="loginButton">Login</button>
                <a href="http://localhost:8000/admin" className=" mt-4 text-lg font-bold" target="_blank">Login as Admin</a>
                
            </div>
        </div>
    )
}


export default LoginPage;