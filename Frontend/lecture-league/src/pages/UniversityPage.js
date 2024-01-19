import SearchComponent from "../components/SearchComponent";
import Header from "../components/Header";
import CourseDiv from "../components/CourseDiv";
import "../styles/SearchResults.css";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import APIService from "../APIService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"


function UniversityPage() {
  const { universityName } = useParams();

  const [universityData, setUniversityData] = useState({
    name: "",
    reviews: null,
    image: "",
  });

  // search functionality
  const [courseCode, setCourseCode] = useState("Code");
  const [courseNumber, setCourseNumber] = useState("xxx");
  const [filter, setFilter] = useState("Filter");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // Initialize searchResults with the full list of universities
  const [searchResults, setSearchResults] = useState([]);
  const courseNames = Array.from(
    new Set(
      searchResults.map((course) => {
        const match = course.name.match(/[A-Za-z]+/);
        return match ? match[0] : "";
      })
    )
  );

  // Fetch the university data based on universityName
  useEffect(() => {
    if (universityName) {
      const decodedUniversityName = decodeURIComponent(universityName);

      const onSuccess = (data) => {
        // console.log('Fetched university data:', data);
        setUniversityData(data);
      };
      const onError = (error) => {
        console.error("Error:", error);
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
      console.error("Error:", error);
    };

    APIService.GetCourseData(decodedUniversityName, onSuccess, onError);
  }, []);

  // Sort the results when isChecked changes
  useEffect(() => {
    // Sort the results when isChecked changes
    function sortedResults() {
      if (isChecked) {
        const sortedResults = [...searchResults].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSearchResults(sortedResults);
      }
    }
    sortedResults();
  }, [isChecked]);

  // Apply sorting to the new search results if isChecked is true
  const handleSearchResults = useCallback(
    (results) => {
      const sortedResults = isChecked
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : results;
      setFilteredResults(sortedResults);
    },
    [isChecked]
  );

  // search functionality
  useEffect(() => {
    let filtered = searchResults;

    if (courseCode !== "Code" && courseCode !== "----") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(courseCode.toLowerCase())
      );
    }
    if (courseNumber !== "xxx" && courseNumber !== "All") {
      filtered = filtered.filter((item) => {
        const match = item.name.match(/\b\d+/);
        if (match && match[0]) {
          const firstDigit = match[0][0];
          return firstDigit === courseNumber[0];
        }
        return false;
      });
    }

    if (filter === "Workload") {
      filtered = [...filtered].sort(
        (a, b) => a.average_workload - b.average_workload
      );
    } else if (filter === "Difficulty") {
      filtered = [...filtered].sort(
        (a, b) => a.average_difficulty - b.average_difficulty
      );
    } else if (filter === "Usefulness") {
      filtered = [...filtered].sort(
        (b, a) => a.average_usefulness - b.average_usefulness
      );
    }

    setFilteredResults(filtered);
  }, [courseCode, courseNumber, filter, searchResults]);

  return (
    <div className='flex flex-col font-Montserrat items-center justify-center mb-5'>
      <Header />

      {/* Banner */}
      <div className='bg-banner-uni bg-cover flex flex-col items-center justify-center
                      h-60 sm:h-80 md:h-96 lg:h-[1/2] w-full p-4 md:p-72 sm:gap-y-2 md:gap-y-6'>
        {/* Uni Info*/}
        <div className="flex flex-col items-center my-2">
          <div className="relative w-1/5 lg:w-1/3 max-w-xs m-6">
            <img src={universityData.image} alt="University-Search-Logo" />
          </div>
          <h1 className="sm:text-xl lg:text-4xl text-primary">{universityName}</h1>
        </div>
        {/* Search Component */}
        <SearchComponent
          data={searchResults}
          onSearchResults={handleSearchResults}
          placeholder={"Search Course"}
        />
      </div>

      {/* Search Filter */}
      <div className="flex flex-col xs:flex-row w-[80%] xl:w-auto gap-x-4 gap-y-2 mx-auto my-4 items-center">
        {/* Course Code */}
        <Select onValueChange={(value) => setCourseCode(value)} >
          <SelectTrigger className="w-[150px] sm:w-[280px] text-xs md:text-md">
            <SelectValue placeholder="Course Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup >
              <SelectLabel>Course Code</SelectLabel>
              <SelectItem value="----">All</SelectItem>
              {courseNames.map((name, index) => (
                <SelectItem key={index} value={name} >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Course Number */}
        <Select onValueChange={(value) => setCourseNumber(value)} >
          <SelectTrigger className="w-[150px] sm:w-[280px] text-xs md:text-md">

            <SelectValue placeholder="Course Number" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup >
              <SelectLabel>Course Number</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="5">500 Levels</SelectItem>
              <SelectItem value="4">400 Levels</SelectItem>
              <SelectItem value="3">300 Levels</SelectItem>
              <SelectItem value="2">200 Levels</SelectItem>
              <SelectItem value="1">100 Levels</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Ratings */}
        <Select onValueChange={(value) => setFilter(value)} >
          <SelectTrigger className="w-[150px] sm:w-[280px] text-xs md:text-md">

            <SelectValue placeholder="Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ratings</SelectLabel>
              <SelectItem value="-----">Reset</SelectItem>
              <SelectItem value="Workload">Workload - Low to High</SelectItem>
              <SelectItem value="Difficulty">Difficulty - Low to High</SelectItem>
              <SelectItem value="Usefulness">Usefulness - High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Display search results */}
      {filteredResults.map((result, index) => (
        <CourseDiv data={result} key={index} />
      ))}
    </div>
  );
}

export default UniversityPage;
