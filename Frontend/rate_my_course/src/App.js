import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
import { UserProvider } from './UserContext.js';

// Pages
import LandingPage from './pages/LandingPage.js';
import SignupPage from './pages/SignupPage.js';
import LoginPage from './pages/LoginPage.js';
import MyReviews from './pages/MyReviews.js';
import CreateReview from './pages/CreateReview.js';
import UniversityPage from './pages/UniversityPage.js';
import OverallCourseReviews from './pages/OverallCourseReviews.js';
import Profile from './pages/Profile.js';

function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/my-reviews" element={<MyReviews />} />
            <Route exact path="/UniversityPage/:universityName/" element={<UniversityPage />} />
            <Route exact path="/overallCourseReview/:courseName/" element={<OverallCourseReviews />} />
            <Route exact path="/review/:courseName/" element={<CreateReview />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
