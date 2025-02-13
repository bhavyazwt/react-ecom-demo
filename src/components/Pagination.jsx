import React from "react";

function Pagination({ totalPages, onClick }) {
  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1
  );

  return (
    <div>
      <div className="container mx-auto px-4 mt-[150px]">
        <nav
          className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
          aria-label="Pagination"
        >
          <a
            className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
            href="#"
            title="Previous Page"
            onClick={(e) => {
              e.preventDefault();
              onClick(pages[0] - 1);
            }}
          >
            <span className="sr-only">Previous Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="block w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </a>
          {pages.map((page) => (
            <a
              key={page}
              className={`flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 ${
                page === pages[pages.length - 1] ? "pointer-events-none" : ""
              }`}
              href="#"
              title={`Page ${page}`}
              onClick={(e) => {
                e.preventDefault();
                onClick(page);
              }}
            >
              {page}
            </a>
          ))}
          <a
            className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
            href="#"
            title="Next Page"
            onClick={(e) => {
              e.preventDefault();
              onClick(pages[pages.length - 1] + 1);
            }}
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="block w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
