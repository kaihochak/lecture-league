import React, { useState, useContext } from "react";
import '../styles/AccountSettingsAccount.css';
import UserAccountSettingsProfilePicture from '../resources/user_profile.png';
import { useCookies } from 'react-cookie';
import APIService from "../APIService";
import { UserContext } from "../UserContext";

// Custom component for each editable field
const AccountInformation = ({ editable, label, value, editMode, onEditClick, onSaveClick, onCancelClick, onChange, fieldType }) => (
    <div className="inputContainer--account">
        {label && <label>{label}</label>}
        <input
            className="inputBox" id="inputBox--accountSettingsAccount"
            type={fieldType}
            value={value}
            readOnly={!editMode}
            onChange={(e) => onChange(e.target.value)}
        />
        {/* only show when it's editable */}
        {editable && (
        <div className="editButtonsContainer">
            {editMode ? (
                <div className="editButtons">
                    <button id="saveButton" onClick={onSaveClick}>Save</button>
                    <button id="cancelButton" onClick={onCancelClick}>Cancel</button>
                </div>
            ) : (
                <button id="editButton" onClick={onEditClick}>Edit</button>
            )}
        </div>
        )}
    </div>
);

const AccountSettingsAccount = ({ userData, setUserData }) => {
    const [tempData, setTempData] = useState({});
    const [isEditPressed, setEditPressed] = useState(false);
    const { username } = useContext(UserContext);

    // for when editing fields
    const [confirmUsernameChanged, setConfirmUsernameChanged] = useState("");
    const [confirmFirstNameChanged, setConfirmFirstNameChanged] = useState("");
    const [confirmLastNameChanged, setConfirmLastNameChanged] = useState("");
    const [isValidName, setIsValidName] = useState(true);

    const [cookies, setCookie] = useCookies(['mytoken']);
    const myToken = cookies['mytoken'];

    // for when editing fields
    const [editMode, setEditMode] = useState({
        firstName: false,
        lastName: false,
        yearOfStudy: false,
        university: false,
        email: false,
    });

    const handleEditClick = (field) => {
        if (!isEditPressed) {
            setTempData((prevTempData) => ({
                ...prevTempData,
                [field]: userData[field],
            }));

            setEditMode((prevEditMode) => ({
                ...prevEditMode,
                [field]: true,
            }));

            setEditPressed(true);

            // Reset the confirmUsernameChanged message
            setConfirmUsernameChanged("");
            setConfirmFirstNameChanged("");
            setConfirmLastNameChanged("");
        }
    };

    const handleSaveClick = async (field) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [field]: false,
        }));
        setEditPressed(false);

        const handleSuccess = () => {
            switch (field) {
                case "username":
                    setConfirmUsernameChanged('Username changed successfully');
                    break;
                case "first_name":
                    setConfirmFirstNameChanged('First name changed successfully');
                    break;
                case "last_name":
                    setConfirmLastNameChanged('Last name changed successfully');
                    break;
                default:
                    break;
            }
            console.log('Data saved successfully to the backend.');
            // Handle successful update, e.g., update local state
        };

        const handleError = (error) => {
            console.error('Error while saving data to the backend:', error);

            const errorMessage = error.message || "An unknown error occurred";
            if (errorMessage.includes("already exists.")) {
                setConfirmUsernameChanged(error);
            }

            // make save button visible again
            setEditMode((prevEditMode) => ({
                ...prevEditMode,
                [field]: true,
            }));

            // record fail change for cancel button
            setIsValidName(false);
        };

        await APIService.UpdateUserProfile(myToken, username, field, userData[field], handleSuccess, handleError);
    };

    const handleCancelClick = (field) => {

        // if the user changed the username to an existing username, then we want to revert the username back to the original
        if (!isValidName) {
            setUserData((prevData) => ({
                ...prevData,
                [field]: tempData[field],
            }));
        }

        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [field]: false,
        }));

        setUserData((prevData) => ({
            ...prevData,
            [field]: tempData[field],
        }));

        setEditPressed(false);
    };

    const handleInputChange = (field, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };


    if (!userData) {
        // Render loading state ...
        return <div>Loading...</div>;
    }

    return (
        <div className="mainContainer--account">
            <div className="titleContainer">Account Details</div>

            <img id="accountImage" src={UserAccountSettingsProfilePicture} alt="user-profile-logo" />

            <div className="entireDiv">
                <div className="textFieldContainer" id="textFieldContainer--accountSettingsAccount">
                    <AccountInformation
                        editable={false}
                        label="Username"
                        value={userData.username || ""}
                        fieldType='text'
                        editMode={editMode.username}
                        onEditClick={() => handleEditClick("username")}
                        onSaveClick={() => handleSaveClick("username")}
                        onCancelClick={() => handleCancelClick("username")}
                        onChange={(value) => handleInputChange("username", value)}
                    />
                    <label className={`text-red-600 ml-1 ${confirmUsernameChanged ? 'visible' : 'hidden'}`}>{confirmUsernameChanged}</label>
                    <AccountInformation
                        editable={true}
                        label="First Name"
                        value={userData.first_name || ""}
                        fieldType='text'
                        editMode={editMode.first_name}
                        onEditClick={() => handleEditClick("first_name")}
                        onSaveClick={() => handleSaveClick("first_name")}
                        onCancelClick={() => handleCancelClick("first_name")}
                        onChange={(value) => handleInputChange("first_name", value)}
                    />
                    <label className={`text-red-600 ml-1 ${confirmFirstNameChanged ? 'visible' : 'hidden'}`}>{confirmFirstNameChanged}</label>
                    <AccountInformation
                        editable={true}
                        label="Last Name"
                        value={userData.last_name || ""}
                        fieldType='text'
                        editMode={editMode.last_name}
                        onEditClick={() => handleEditClick("last_name")}
                        onSaveClick={() => handleSaveClick("last_name")}
                        onCancelClick={() => handleCancelClick("last_name")}
                        onChange={(value) => handleInputChange("last_name", value)}
                    />
                    <label className={`text-red-600 ml-1 ${confirmLastNameChanged ? 'visible' : 'hidden'}`}>{confirmLastNameChanged}</label>

                </div>
            </div>
        </div>
    );
};

export default AccountSettingsAccount;



