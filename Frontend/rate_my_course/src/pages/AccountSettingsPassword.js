import React, { useState, useContext } from "react";
import '../styles/AccountSettingsPassword.css';
import { useCookies } from 'react-cookie';
import APIService from "../APIService";
import { UserContext } from "../UserContext";


const AccountSettingsPassword = () => {
    // form fields 
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setConfirmPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    // cookies
    const [cookies, setCookie] = useCookies(['mytoken']);
    const myToken = cookies['mytoken'];

    // error messages
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  
    // Success or error message
    const [message, setMessage] = useState("");

    const { username } = useContext(UserContext);

    // Validate form
    const handlePasswordChange = async () => {
        // Reset error messages
        setOldPasswordError("");
        setNewPasswordError("");
        setConfirmNewPasswordError("");
        setMessage(""); 
        
        // Validate new passwords match
        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("New passwords do not match");
            return;
        }

        const onSuccess = () => {
            setMessage("Password changed successfully");
        };

        const onError = (error) => {
            if (error.old_password && Array.isArray(error.old_password) && error.old_password.length > 0) {
                setOldPasswordError("Incorrect password");
            } else {
                setMessage(`Error: ${error.message}`); // Set error message
                console.error('Error while changing password:', error);
            }
        };

        await APIService.ChangePassword(myToken, username, oldPassword, onSuccess, onError);
    };
    

    return (
        <div className="mainContainer--changePassword">
            <div className="textFieldContainer">
                <div className="titleContainer">Change Password</div>

                <div className="inputContainer--accountSettingsPassword">
                    <label className="top-label">Enter Current Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        placeholder="Enter Current Password"
                        onChange={(ev) => setOldPassword(ev.target.value)}
                        className={"inputBox"}
                        id="currentPassword"
                    />
                    <label className={`text-red-600 ml-1 ${oldPasswordError ? 'visible' : 'hidden'}`}>{oldPasswordError}</label>
                </div>
                <br />

                <div className="inputContainer--accountSettingsPassword">
                    <label className="top-label">Enter New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        placeholder="Enter New Password"
                        onChange={(ev) => setConfirmPassword(ev.target.value)}
                        className={"inputBox"}
                        id="newPassword"
                    />
                    <label className="text-red-600 ml-1">{newPasswordError}</label>
                </div>

                <br></br>

                <div className="inputContainer--accountSettingsPassword">
                    <label className="top-label">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        placeholder="Re-type New Password"
                        onChange={(ev) => setConfirmNewPassword(ev.target.value)}
                        className={"inputBox"}
                        id="retypeNewPassword"
                    />
                    <label className="text-red-600 ml-1">{confirmNewPasswordError}</label>
                </div>
            </div>
            <br></br>
            <div className="changePasswordButtonContainer">
                <button id="changePasswordButton" onClick={() => handlePasswordChange(oldPassword)}>Change Password</button>
            </div>
            <label className="text-red-600 ml-1">{message}</label>
        </div>
    );
};
export default AccountSettingsPassword;
