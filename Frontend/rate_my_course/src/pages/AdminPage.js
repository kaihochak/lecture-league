import React, { useState, useEffect } from "react";
import adminImage from '../resources/admin-image.svg';
import arrowLeft from '../resources/arrow-left.svg';
import '../styles/MyReviews.css';
import userImage from '../resources/user-image.svg';
import bookMark from '../resources/bookmark.svg';
import bookMarkBlank from '../resources/bookmark-blank.svg';
import StaticReview from "../components/StaticReview";
import ReportedReview from "../components/ReportedReview";
import RatedReview from "../components/RatedReview";
import Date from "../components/Date";
import Header from "../components/Header";

const MyReviews = () => {
    const [activeTab, setActiveTab] = useState('reportedPosts');
    const [showPopup, setShowPopup] = useState(false);

    var name = "John Smith";
    var title = "Rate My Course Admin";

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleNewReviewClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const PopupContent = () => (
        <div className="popup">
            <button onClick={handlePopupClose}>X</button>
            <div>Test</div>
        </div>
    );

    const coursesData = [
        {
            name: "SENG 513",
            reviews: [
            <StaticReview key={1} />,
            <StaticReview key={2} />,
            ],
        },
        {
            name: "SENG 511",
            reviews: [
                <StaticReview key={1} />,
                <StaticReview key={2} />,
            ],
            }
    ];

    const [reviewData, setReviewData] = useState([
        { id: 1, content: <ReportedReview key={1} /> },
        { id: 2, content: <ReportedReview key={2} /> }
        // Assuming you add an 'id' field for identification
    ]);

    const handleRemoveReview = (id) => {
        setReviewData(currentReviews => currentReviews.filter(review => review.id !== id));
    };

    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [courseCode, setCourseCode] = useState('Professor');
  
  
    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };
  
    const handleOnChange2 = () => {
      setIsChecked2(!isChecked2);
    };
    
    return (
        <div>
            <Header/>
            <div className="flex flex-col w-full">
                <div className="top-row">
                    <img src = {arrowLeft} className="arrow-left" alt="arrow-left"/>
                </div>
                <div className="user-info justify-center">
                    <div className="adminImage">
                        <img src = {adminImage} className="admin-image w-24 h-24" alt="admin-image"/>
                    </div>
                    <div className="flex flex-col">
                        <div className="user-name ml-2">
                            <p>{name}</p>
                        </div>
                        <div className="user-year ml-2">
                            <p>{title}</p>
                        </div>
                    </div>
                </div>
                <div className='nav-bar text-lg sm:text-base'>
                    <div
                        className={`nav-bar-item ml-8 ${activeTab === 'reportedPosts' ? 'active2' : ''}`}
                        onClick={() => handleTabClick('reportedPosts')}>
                        <p>Reported Posts</p>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'reportedPosts' && (
                        <div className="review-content">
                            <div>
                                {reviewData.map((reportedReview, index) => (
                                    <div key={index} className="review">
                                        <ReportedReview
                                            id={reportedReview.id}
                                            onDelete={handleRemoveReview}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default MyReviews;