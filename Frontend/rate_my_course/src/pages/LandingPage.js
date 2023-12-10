import React, { useState, useEffect} from 'react'
import rateMyCourse_white_logo from '../resources/logo-white.png';
import UniDiv from '../components/UniDiv';
import Header from '../components/Header';
import '../styles/LandingPage.css';
// import SearchComponent from '../components/SearchComponent'; 

function LandingPage() {
  const [searchInput, setSearchInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);

  // Effect to fetch data from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/University/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
      }
    })
    .then(resp => resp.json())
    .then((data) => { setSearchResults(data); })
    .catch(error => console.log(error))

  }, []);

  // Effect for filtering results based on search input
  useEffect(() => {
    const filteredResults = searchInput === '' 
      ? searchResults 
      : searchResults.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    setDisplayResults(filteredResults);
  }, [searchInput, searchResults]);

// Effect for sorting results when isChecked is true
useEffect(() => {
  const sortedResults = isChecked
    ? [...searchResults].sort((a, b) => a.name.localeCompare(b.name))
    : searchResults;

  // Check if sortedResults is different from the current displayResults to prevent infinite loop
  if (JSON.stringify(sortedResults) !== JSON.stringify(displayResults)) {
    setDisplayResults(sortedResults);
  }
}, [isChecked, searchResults]); // Note: We use searchResults here, not displayResults

  return (
    <div className='flex flex-col items-center justify-center mb-5'>
      <Header />
      <img src={rateMyCourse_white_logo} className=' max-h-60' alt='logo' />
        {/* Search */}
      <div className="flex items-center border-2 border-red-500 shadow-lg h-14">
          <input
              className="flex-1 px-6 h-full rounded-full text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={"Search University"}
          />
      </div>

      <div className='flex justify-between text-sm mt-5 w-3/4 md:w-4/12'>
        {/* number of results */}
        <p className=' mt-1'>{displayResults.length} Results</p>

        {/* sort by A-Z */}
        <div className='flex justify-between'>
          <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <span className="slider round"></span>
          </label>
          <p className=' mt-1 ml-2'>Sort A-Z</p>
        </div>
      </div>

      {/* Display search results */}
      {displayResults.map((result) => (
        <UniDiv data={result} key={result.id} />
      ))}
    </div>
  );
}

export default LandingPage;