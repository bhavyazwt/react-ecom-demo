import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setFilteredOptions([]);
        setShowOptions(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/products/product/search", {
          params: { search: term },
        });
        setFilteredOptions(response.data);
        setShowOptions(true);
      } catch (error) {
        console.error("Search error:", error);
        setFilteredOptions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleOptionClick = () => {
    setShowOptions(false);
    setSearchTerm("");
  };

  return (
    <div className="mr-14" id="search-container">
      <label
        className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          placeholder="Search For Products"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          value={searchTerm}
          onChange={handleInputChange}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          </div>
        )}
        {showOptions && (
          <ul className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-md p-2 max-h-48 overflow-y-auto z-50">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                onClick={handleOptionClick}
              >
                <Link to={`/product/${option.id}`}>{option.name}</Link>
              </li>
            ))}
            {filteredOptions.length === 0 && !isLoading && searchTerm && (
              <li className="px-4 py-2 text-center text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        )}
      </label>
    </div>
  );
}

export default SearchBar;
