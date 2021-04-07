import React from "react"
import ReactPaginate from "react-paginate"
import PropTypes from "prop-types"

const Pragination = ({ countPagination, handleClick, pageNumber }) => (
  <ReactPaginate
    forcePage={pageNumber}
    containerClassName="flex h-12 font-medium rounded-full justify-center"
    pageCount={countPagination}
    pageRangeDisplayed={3}
    marginPagesDisplayed={1}
    pageClassName="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-50 ease-in  rounded-full"
    activeClassName="flex text-red-700 border-solid border-4 border-light-blue-500 rounded-full"
    previousLinkClassName="flex text-gray-700"
    previousLabel={
      <div className="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
    }
    nextLabel={
      <div className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    }
    pageLinkClassName="border-none outline-none"
    onPageChange={handleClick}
  />
)
export default Pragination

Pragination.propTypes = {
  countPagination: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}
