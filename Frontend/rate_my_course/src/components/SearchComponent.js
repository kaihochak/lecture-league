import React, { useState, useEffect } from 'react';

const SearchComponent = ({ data, onSearchResults, placeholder }) => {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // Perform the search whenever searchInput changes
        const filteredResults = searchInput === '' ? data : data.filter(item =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        onSearchResults(filteredResults);
    // }, [searchInput, data, onSearchResults, placeholder]); // Re-run the effect when searchInput or data changes
    }, [searchInput, data]); // Re-run the effect when searchInput or data changes


    return (
        <div className="flex items-center border-2 border-red-500 shadow-lg h-14">
            <input
                className="flex-1 px-6 h-full rounded-full text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchComponent;
