import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(['mytoken']);

  const [username, setUsername] = useState(() => {
    // Get username from localStorage if it exists
    const storedUsername = localStorage.getItem('username');
    return storedUsername || null;
  });

  useEffect(() => {
    // Check if the 'mytoken' cookie exists
    if (cookies.mytoken) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
