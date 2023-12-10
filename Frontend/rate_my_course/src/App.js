import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
import { UserProvider } from './UserContext.js';

// Pages
import LandingPage from './pages/LandingPage.js';
import SignupPage from './pages/SignupPage.js';
import LoginPage from './pages/LoginPage.js';
import MyProfile from './pages/MyProfle.js';
import AdminPage from './pages/AdminPage.js';
import ReviewPage from './pages/ReviewPage.js';
import UniversityPage from './pages/UniversityPage.js';
import OverallCourseReviews from './pages/OverallCourseReviews.js';
import AccountSettings from './pages/AccountSettings.js';

function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/AccountSettings" element={<AccountSettings />} />
            <Route exact path="/MyProfile" element={<MyProfile />} />

            <Route exact path="/home" element={<LandingPage />} />
            <Route exact path="/UniversityPage/:universityName/" element={<UniversityPage />} />
            <Route exact path="/overallCourseReview/:courseName/" element={<OverallCourseReviews />} />
            <Route exact path="/review" element={<ReviewPage />} />
            
            <Route exact path="/AdminPage" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
