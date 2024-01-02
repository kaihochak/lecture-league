import React, { useState, useEffect, useContext } from "react";
import '../styles/AccountSettings.css';
import Header from '../components/Header';
import { UserContext } from "../UserContext";
import { useCookies } from 'react-cookie';
import APIService from "../APIService";
import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import { Input } from '../components/ui/input';
import { Button } from "../components/ui/button"

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
                    <TabsList className="grid w-[80%] sm:w-[60%] mx-auto mt-10 grid-cols-2">
                        <TabsTrigger value="Reviews">Account</TabsTrigger>
                        <TabsTrigger value="Saved">Change Password</TabsTrigger>
                    </TabsList>

                    {/* My Reviews */}
                    <TabsContent value="Reviews">
                        <AccountSettingsAccount userData={userData} setUserData={setUserData} />
                    </TabsContent>

                    {/* Saved */}
                    <TabsContent value="Saved">
                        <AccountSettingsPassword />
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
        <div className="flex flex-col sm:w-[70%] md:w-[65%] mx-auto p-12 gap-y-6" id="textFieldContainer--accountSettingsAccount">

            <AccountInformation
                editable={false}
                label="Username"
                value={userData.username || ""}
                fieldType='text'
                editMode={editMode.username}
            />

            {/* first name */}
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

            {/* last name */}
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
    );
};

// Custom component for each editable field
const AccountInformation = ({ editable, label, value, editMode, onEditClick, onSaveClick, onCancelClick, onChange, fieldType }) => (
    <div className="flex items-center justify-center">

        {label && (
            <label className="text-xs sm:text-base md:w-[15%] self-center whitespace-nowrap overflow-hidden text-ellipsis flex-shrink-0 mr-2">
                {label}
            </label>
        )}

        {editMode ? (
            <Input
                className="md:w-[55%]"
                type={fieldType}
                value={value}
                readOnly={!editMode}
                onChange={(e) => onChange(e.target.value)}
            />

        ) : <Input disabled
            className="md:w-[55%]"
            type={fieldType}
            value={value}
            readOnly={!editMode}
            onChange={(e) => onChange(e.target.value)}
        />

        }

        {/* only show when it's editable */}
        {editable ? (
            <div className="w-[15%]">
                {editMode ? (
                    <div className="flex ">
                        <div className="cursor-pointer text-lg md:text-xl lg:text-2xl ml-4" onClick={onSaveClick}>
                            <CiCircleCheck className='text-[#006400]' />
                        </div>
                        <div className="cursor-pointer text-lg md:text-xl lg:text-2xl ml-4" onClick={onCancelClick}>
                            <CiCircleRemove className='text-[#8b0000]' />
                        </div>
                    </div>

                ) : (
                    <div className="cursor-pointer text-lg md:text-xl lg:text-2xl ml-4" onClick={onEditClick}>
                        <CiEdit className='text-accent' />
                    </div>
                )}
            </div>
        ) : <div className="w-[15%]"></div>}
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
        <div className="flex flex-col w-full sm:w-[70%] md:w-[50%] mx-auto p-10 gap-y-2" >

            {/* current */}
            <div className="flex gap-x-4 items-center">
                <label className="text-xs xs:text-sm md:text-base w-[35%]">Enter Current Password</label>
                <Input
                    type="password"
                    value={oldPassword}
                    placeholder="Enter Current Password"
                    onChange={(ev) => setOldPassword(ev.target.value)}
                    className="text-sm md:text-base"
                    id="currentPassword"
                />
            </div>
            <label className={`text-red-600 ml-1`}>{oldPasswordError}</label>

            {/* new */}
            <div className="flex gap-x-4  items-center">
                <label className="text-xs xs:text-sm md:text-base w-[35%]">Enter New Password</label>
                <Input
                    type="password"
                    value={newPassword}
                    placeholder="Enter New Password"
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    className="text-sm md:text-base"
                    id="newPassword"
                />
            </div>
            <label className="text-red-600 ml-1">{newPasswordError}</label>

            {/* confirm new */}
            <div className="flex gap-x-4 items-center">
                <label className="text-xs xs:text-sm md:text-base w-[35%]">Confirm New Password</label>
                <Input
                    type="password"
                    value={confirmNewPassword}
                    placeholder="Re-type New Password"
                    onChange={(ev) => setConfirmNewPassword(ev.target.value)}
                    className="text-sm md:text-base"
                    id="retypeNewPassword"
                />
            </div>
            <label className="text-red-600 ml-1">{confirmNewPasswordError}</label>

            {/*  button */}
            <div className="flex mx-auto">
                <Button onClick={() => handlePasswordChange(oldPassword)}>Change Password</Button>
            </div>

            {/* error message */}
            <label className="text-red-600 ml-1">{message}</label>
        </div>
    );
};

export default Profile;