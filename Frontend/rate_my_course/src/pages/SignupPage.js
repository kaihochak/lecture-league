import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import rateMyCourse_white_logo from '../resources/logo-white.png';
import APIService from "../APIService";
import { UserContext } from "../UserContext";

import '../styles/LoginPage.css';

const SignupPage = (props) => {

    // fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // error messages
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [confirmPasswordError, setConfirmNewPasswordError] = useState("");
    const [confirmRegisterError, setConfirmRegisterError] = useState("");

    const { setIsLoggedIn } = useContext(UserContext);

    const navigate = useNavigate();

    const validateSignUp = () => {
        let isValidSignUp = true;

        if (!firstName || !lastName || !username || !password || !confirmPassword) {
            isValidSignUp = false;
            // setPasswordVisibility("changePasswordButtonInvisible");

        }
        if (!firstName) {
            setFirstNameError("First name is required");
        } else {
            setFirstNameError("");
        }

        if (!lastName) {
            setLastNameError("Last name is required");
        } else {
            setLastNameError("");
        }

        if (!username) {
            setUsernameError("Username is required");
        }
        else {
            setUsernameError("");
        }

        if (!password) {
            setPasswordError("Password is required");
        }
        else {
            setPasswordError("");
        }

        if (!confirmPassword) {
            setConfirmNewPasswordError("Confirm password is required");
        }
        else {
            setConfirmNewPasswordError("");
        }

        return isValidSignUp;
    }

    const RegisterUser = () => {

        if (validateSignUp()) {

            if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters long.");
                return; // Stop the function if password is too short
            }

            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match.");
                return; // Stop the function if passwords do not match
            }

            // Reset the password error if passwords match
            setPasswordError("");

            const data = {
                username: username,
                password: password,
                first_name: firstName,
                last_name: lastName,
            };

            APIService.RegisterUser(data)
            .then(resp => {
                console.log(resp);

                if (resp.success) {
                    console.log("Registration successful", resp.data);
                    navigate('/home'); // Redirect to home page on successful registration
                    setIsLoggedIn(true); // Update the login state to reflect that the user is logged in
                } else {
                    console.log("Registration failed", resp.error);
                    // Handle errors
                    setConfirmRegisterError("Registration failed. Please try again.");
                }
            })
            .catch(error => {
                console.log("Network or server error", error);
                // Handle network or unexpected errors
                // Display a generic error message to the user
                // For example: setError("Unable to register. Please try again later.");
            });
        }
    }

    return (
        <div className={"mainContainer"} id="signupPageMainContainer">
            <div className="innerContainer">
                <img src={rateMyCourse_white_logo} className='max-h-72' alt='logo' />
                <div className={"titleContainer"}>Signup</div>

                {/* First name input */}
                <div className={"inputContainer"}>
                    <div className="inputContainerTitle">
                        First Name:
                    </div>
                    <input
                        value={firstName}
                        placeholder="First name"
                        onChange={ev => setFirstName(ev.target.value)}
                        className={"inputBox"} />
                    <label className="text-red-600 ml-1">{firstNameError}</label>
                </div>
                <br />

                {/* Last name input */}
                <div className={"inputContainer"}>
                    <div className="inputContainerTitle">
                        Last Name:
                    </div>
                    <input
                        value={lastName}
                        placeholder="Last name"
                        onChange={ev => setLastName(ev.target.value)}
                        className={"inputBox"} />
                    <label className="text-red-600 ml-1">{lastNameError}</label>
                </div>
                <br />

                {/* Username input */}
                <div className={"inputContainer"}>
                    <div className="inputContainerTitle">
                        Username:
                    </div>
                    <input
                        value={username}
                        placeholder="Username"
                        onChange={ev => setUsername(ev.target.value)}
                        className={"inputBox"} />
                    <label className="text-red-600 ml-1">{usernameError}</label>
                </div>
                <br />

                {/* Password input */}
                <div className={"inputContainer"}>
                    <div className="inputContainerTitle">
                        Password:
                    </div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={ev => setPassword(ev.target.value)}
                        className={"inputBox"} />
                    <label className="text-red-600 ml-1">{passwordError}</label>
                </div>

                <br />

                {/* Confirm Password input */}
                <div className={"inputContainer"}>
                    <div className="inputContainerTitle">
                        Confirm Password:
                    </div>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={ev => setConfirmPassword(ev.target.value)}
                        className={"inputBox"} />
                    <label className="text-red-600 ml-1">{confirmPasswordError}</label>
                </div>

                <br />

                {/* Signup button */}
                <button className="loginButton" onClick={RegisterUser}>Signup</button>

                <label className="text-red-600 ml-1">{confirmRegisterError}</label>
            </div>
        </div>
    );
}

export default SignupPage;