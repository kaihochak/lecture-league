import React, { useState, useEffect, useContext } from "react";
import '../styles/AccountSettings.css';
import Header from '../components/Header';
import { UserContext } from "../UserContext";
import AccountSettingsMain from "./AccountSettingsAccount";
import { useCookies } from 'react-cookie';
import APIService from "../APIService";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"

const Profile = () => {

    const [activePage, setActivePage] = useState('account');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { username } = useContext(UserContext);
    
    const [cookies, setCookie] = useCookies(['mytoken']);
    const myToken = cookies['mytoken'];

    // Fetch user data on component mount
    useEffect(() => {

        const handleSuccess = (data) => {
            setUserData(data);
            setLoading(false);
        };

        const handleError = (error) => {
            console.error('Error:', error);
            setLoading(false);
        };

        APIService.GetUserData(myToken, username, handleSuccess, handleError);
    }, []);
    
    const handleButtonClick = (page) => {
        setActivePage(page === activePage ? page : page);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col w-full">
                {/* Title */}
                <div className="flex flex-col items-center justify-center mt-10">
                    <h1 className="text-4xl font-semibold">Profile</h1>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="Reviews">
                    <TabsList className="grid w-[80%] mx-auto mt-10 grid-cols-2">
                        <TabsTrigger value="Reviews">Account</TabsTrigger>
                        {/* <TabsTrigger value="RatedReviews">Rated Reviews</TabsTrigger> */}
                        <TabsTrigger value="Saved">Password</TabsTrigger>
                    </TabsList>

                    {/* My Reviews */}
                    <TabsContent value="Reviews">
                        <AccountSettingsMain userData={userData} setUserData={setUserData} />
                    </TabsContent>

                    {/* Saved */}
                    <TabsContent value="Saved">
                        <AccountSettingsPassword/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};


// Account Settings Account
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

// Account Settings Password
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

export default Profile;