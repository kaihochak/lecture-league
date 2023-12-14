import React, { useState, useEffect} from 'react'
import UniDiv from '../components/UniDiv';
import Header from '../components/Header';
import '../styles/LandingPage.css';

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
    <div className='flex flex-col font-Montserrat items-center justify-center mb-5'>
      <Header />

      {/* Banner */}
      <div className='bg-banner bg-cover flex flex-col items-center justify-center 
                      h-60 w-full p-4 md:p-10 gap-y-4 md:gap-y-10'>

      
        {/* Title */}
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-m-l md:text-2xl text-primary text-center'>Find Your University</h1>
        </div>

        {/* Search */}
            <input
                className="text-secondary focus:outline-none focus:shadow-outline rounded-lg py-1 px-4
                          w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-10 " 
                id="search"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={"Search University"}
            />
      </div>

      <div className='flex justify-between text-sm 
                      w-[70%] md-[60%] lg:w-[50%] xl:w-[40%] m-2 pt-4'>
        {/* number of results */}
        <p className='mt-1'>{displayResults.length} Results</p>

        {/* sort by A-Z */}
        <div className='flex justify-between'>
          <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <span className="slider round"></span>
          </label>
          <p className='mt-1 ml-2'>Sort A-Z</p>
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