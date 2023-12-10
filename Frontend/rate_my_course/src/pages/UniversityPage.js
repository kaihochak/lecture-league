
import SearchComponent from '../components/SearchComponent';
import Header from '../components/Header';
import CourseDiv from '../components/CourseDiv';
import '../styles/SearchResults.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import APIService from '../APIService';

function UniversityPage() {
    const { universityName } = useParams();

    const [universityData, setUniversityData] = useState({
        name: '',
        reviews: null,
        image: '',
    });

    // search functionality
    const [courseCode, setCourseCode] = useState('Code');
    const [courseNumber, setCourseNumber] = useState('xxx');
    const [filter, setFilter] = useState('Filter');
    const [filteredResults, setFilteredResults] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    // Initialize searchResults with the full list of universities
    const [searchResults, setSearchResults] = useState([]);
    const courseNames = Array.from(new Set(searchResults.map(course => {
        const match = course.name.match(/[A-Za-z]+/);
        return match ? match[0] : '';
    })));

    // Fetch the university data based on universityName
    useEffect(() => {
        if (universityName) {
            const decodedUniversityName = decodeURIComponent(universityName);

            const onSuccess = (data) => {
                // console.log('Fetched university data:', data);
                setUniversityData(data);
            };
            const onError = (error) => {
                console.error('Error:', error);
            };

            APIService.GetUniversityData(decodedUniversityName, onSuccess, onError);
        }
    }, [universityName]);

    // Fetch the list of universities from the backend
    useEffect(() => {
        const decodedUniversityName = decodeURIComponent(universityName);

        const onSuccess = (data) => {
            // console.log('Fetched university data:', data);
            setSearchResults(data);
        };
        const onError = (error) => {
            console.error('Error:', error);
        };

        APIService.GetCourseData(decodedUniversityName, onSuccess, onError);
    }, []);

    // useEffect(() => {
    //     if (universityName) {
    //         const decodedUniversityName = decodeURIComponent(universityName);
    //         const url = `http://localhost:8000/api/Course/?university=${decodedUniversityName}`;
    //         fetch(url, {
    //             method: 'GET',
    //             headers: {
    //             'Content-Type':'application/json',
    //             }
    //         })
    //         .then(resp => resp.json())
    //         .then((data) => { setSearchResults(data); })
    //         .catch(error => console.log(error))
    //     }
    // }, [universityName]);

    // Sort the results when isChecked changes
    useEffect(() => {
        // Sort the results when isChecked changes
        function sortedResults() {
            if (isChecked) {
                const sortedResults = [...searchResults].sort((a, b) => a.name.localeCompare(b.name));
                setSearchResults(sortedResults);
            } 
        
        }
      sortedResults();
    }, [isChecked]);

    // Apply sorting to the new search results if isChecked is true
    const handleSearchResults = useCallback((results) => {
        const sortedResults = isChecked
          ? [...results].sort((a, b) => a.name.localeCompare(b.name))
          : results;
        setFilteredResults(sortedResults);
    }, [isChecked]);

    // search functionality
    useEffect(() => {
        let filtered = searchResults;

        if(courseCode !== 'Code' && courseCode !== '----')
        {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(courseCode.toLowerCase()));
        }
        if(courseNumber !== 'xxx' && courseNumber !== 'All')
        {
            filtered = filtered.filter(item =>{
                const match = item.name.match(/\b\d+/);
                if (match && match[0]) {
                    const firstDigit = match[0][0]; 
                    return firstDigit === courseNumber[0]; 
                }
                return false;
            });
        }

        if(filter === 'Workload')
        {
            
            filtered = [...filtered].sort((a, b) => a.average_workload - b.average_workload);
        }
        else if (filter === 'Difficulty')
        {
            filtered = [...filtered].sort((a, b) => a.average_difficulty - b.average_difficulty);
        }
        else if (filter === 'Usefulness')
        {
            filtered = [...filtered].sort((a, b) => a.average_usefulness - b.average_usefulness);
        }
        
        setFilteredResults(filtered);
    }, [courseCode, courseNumber, filter, searchResults]);

    return (
        <div>
            <Header />

            <div className='search-container'>
            
                <div className='search-header'>

                    {/* delete flex items-center to put logo back on top */}
                    <div className='flex flex-col items-center'>
                        <div className="w-1/2 md:w-1/3 max-w-xs relative m-6">
                            <img src={universityData.image} alt="University-Search-Logo" />
                        </div>
                        <h1 className="text-4xl mb-5">{universityName}</h1>
                    </div>
                    <div className='search-filters'>
                        <div className='search-comp'>
                            <SearchComponent className='' data={searchResults} onSearchResults={handleSearchResults} placeholder={"Search Course"}/>
                        </div>
                        <div className='drop-downs'>
                            <div className='select-wrapper'>
                                <select 
                                    value={courseCode} 
                                    onChange={e => setCourseCode(e.target.value)}
                                    className='border-2 border-red-600 rounded-full p-1 lg:p-3 lg:text-lg text-sm'
                                >
                                    <option value='----'>----</option>
                                    {courseNames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                                <label className='ml-2 lg:text-lg text-sm'>Code</label>
                            </div>
                            <div className='select-wrapper ml-3'>
                                <select 
                                    value={courseNumber} 
                                    onChange={e => setCourseNumber(e.target.value)}
                                    className='border-2 border-red-600 rounded-full p-1 lg:p-3 lg:text-lg text-sm'
                                >
                                    <option value='All'>All</option>
                                    <option value='5'>5xx</option>
                                    <option value='4'>4xx</option>
                                    <option value='3'>3xx</option>
                                    <option value='2'>2xx</option>
                                    <option value='1'>1xx</option>
                                </select>
                                <label className='ml-2 lg:text-lg text-sm'>Number</label>
                            </div>
                            <div className='select-wrapper ml-3'>
                                <select 
                                    value={filter} 
                                    onChange={e => setFilter(e.target.value)}
                                    className='border-2 border-red-600 rounded-full p-1 lg:p-3 lg:text-lg text-sm lg:w-7/10 w-1/2'
                                >
                                    <option value='-----'>-----</option>
                                    <option value='Workload'>Workload - Low to High</option>
                                    <option value='Difficulty'>Difficulty - Low to High</option>
                                    <option value='Usefulness'>Usefulness - Low to High</option>
                                </select>
                                <label className='ml-2 lg:text-lg text-sm'>Filter</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display search results */}
                { filteredResults.map(result => <CourseDiv data={result} key={result.id}/>) }

            </div>
        </div>  
    );
  }
  
  export default UniversityPage;