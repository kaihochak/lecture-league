import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input"

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
        <div className="flex flex-row items-center justify-center my-4 
                        w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
            <Input
                className="mb-2"
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
