import ReactPaginate from 'react-paginate'
import {useState} from 'react'
import React from "react";

const Pragination = (props)=>{
    return (
        <ReactPaginate
            initialPage={0}
            containerClassName='flex h-12 font-medium rounded-full justify-center'
                       pageCount={30}
                       pageRangeDisplayed={3}
                       marginPagesDisplayed={1}
                       pageClassName='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-50 ease-in  rounded-full'
                       activeClassName='flex text-red-700 border-solid border-4 border-light-blue-500 rounded-full'
                       previousLinkClassName='flex text-gray-700'
                       previousLabel={<div
                           className="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="feather feather-chevron-left w-6 h-6">
                               <polyline points="15 18 9 12 15 6"></polyline>
                           </svg>
                       </div>}
                       nextLabel={<div
                           className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="feather feather-chevron-right w-6 h-6">
                               <polyline points="9 18 15 12 9 6"></polyline>
                           </svg>
                       </div>}
                       pageLinkClassName='border-none outline-none'
            onPageChange={props.handleClick}
        >

        </ReactPaginate>
    )
}
export default Pragination