import React, { useState, useEffect, useContext } from "react";
import '../styles/AccountSettings.css';
import Header from '../components/Header';
import { UserContext } from "../UserContext";
import AccountSettingsPassword from "./AccountSettingsPassword";
import AccountSettingsMain from "./AccountSettingsAccount";
import { useCookies } from 'react-cookie';
import APIService from "../APIService";

const AccountSettings = () => {

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
            <div className="mainContainer--accountSettings">
                        
                <div className="selectionsContainer">
                    <button className={activePage === "account" ? "active" : "selection"} onClick={() => handleButtonClick('account')}>
                        Account
                    </button>
                    <button className={activePage === "password" ? "active" : "selection"} onClick={() => handleButtonClick('password')}>
                        Password
                    </button>
                </div>

                <div id="accountSettingsDividerBar"></div>

                <div id="componentContainer">
                    {activePage === 'password' && <AccountSettingsPassword/>}
                    {activePage === 'account' && <AccountSettingsMain userData={userData} setUserData={setUserData} />}
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;