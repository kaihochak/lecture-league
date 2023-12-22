import React, { useContext, useState, useEffect } from "react";
import logo from '../resources/logo/Lecture League-logos_transparent.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { useCookies } from 'react-cookie';
import APIService from "../APIService";
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"


export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
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
    if (isLoggedIn) {

      const handleSuccess = (data) => {
        setUserData(data);
      };

      const handleError = (error) => {
        console.error('Error:', error);
      };

      APIService.GetUserData(myToken, username, handleSuccess, handleError);
    }
  }, []);

  const handleMyReviews = () => {
    navigate('/my-reviews');
  }

  const handleProfile = () => {
    navigate('/profile');
  }

  const handleLogout = () => {
    // Remove the token cookie
    removeCookie('mytoken', { path: '/' });

    navigate('/');

    setIsLoggedIn(false);
  };

  return (
    <div className='className="font-Montserrat" h-22 xs:h-28 w-screen bg-primary flex items-center justify-between flex-wrap px-4 md:px-10'>
      <Link to="/">
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
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-m font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                            px-6 py-3 hover:bg-accent hover:text-accent-foreground hover:text-white text-accent">
              {username ? username : ''}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleMyReviews}>Reviews</DropdownMenuItem>
              <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}