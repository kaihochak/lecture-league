import React, { useContext, useState, useEffect } from "react";
import logo from '../resources/logo/Lecture League-logos_transparent.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { useCookies } from 'react-cookie';
import APIService from "../APIService";
import { Button } from "../components/ui/button"

export default function Header() {
  const {isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { username } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['mytoken']);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const myToken = cookies['mytoken'];

  // Fetch user data on component mount
  useEffect(() => {
      const handleSuccess = (data) => {
          setUserData(data);
      };

      const handleError = (error) => {
          console.error('Error:', error);
      };

      APIService.GetUserData(myToken, username, handleSuccess, handleError);
  }, []);

  const handleLogout = () => {
    // Remove the token cookie
    removeCookie('mytoken', { path: '/' });

    navigate('/home');

    setIsLoggedIn(false);
  };

  return (
    <div className='className="font-Montserrat" h-22 xs:h-28 w-screen bg-primary flex items-center justify-between flex-wrap px-4 md:px-10'>
      <Link to="/home">
        <img src={logo} className='w-16 ml-2 xs:w-18 xs:h-10 xs:ml-4 md:h-24 md:w-24 object-cover scale-150 ' alt='logo' />
      </Link>


      {/* NOT Logged-In */}
      {isLoggedIn === false ? (
        <div className='flex flex-wrap justify-center text-xs gap-x-2'>
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>

          <Link to="/signup">
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </div>
      
      ) : (
        // If Logged-In
        <div className='flex flex-wrap justify-center'>
          <button 
          onClick={toggleMenu} 
          className={`${
            isMenuOpen ? 'bg-secondary' : 'bg-secondary'
          } text-white font-bold py-2 px-4 rounded-full shadow-lg w-38 md:w-60 md:h-20 cursor-pointer`}
        >
          <h2 className=" md:text-xl">
            {username ? username : ''}
          </h2>
        </button>
          {isMenuOpen && (
            <div className="absolute right-0 m-2 mt-11 md:mt-24 md:border-2 md:mr-16 w-48 py-2 bg-white shadow-lg rounded-lg border border-tertiary z-50">
              <a href="/MyProfile" className="block px-4 py-2 text-sm md:text-lg hover:bg-gray-100 cursor-pointer">Profile</a>
              <a href="/accountSettings" className="block px-4 py-2 text-sm md:text-lg hover:bg-gray-100 cursor-pointer">Settings</a>
              <a href="/home" onClick={handleLogout} className="block px-4 py-2 text-sm md:text-lg hover:bg-gray-100 cursor-pointer">Logout</a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}