import React from 'react';
import './pagination.css';
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";



const Pagination = ({setCurrentPage, currentPage, numberOfPages, dispatch}) => {

        const renderPagination = () => {
            if (currentPage === numberOfPages && currentPage ===1) return null;  //if there is only one page show nothing
            if (currentPage ===1){
                return(
                    <>
                        <p>1</p>
                        <button onClick={()=>{ dispatch(setCurrentPage(currentPage+1))}} className='buttonNext'><BiSolidSkipNextCircle  style={{fontSize:'32px', color:'gray' , marginLeft:'10px'}}/></button>
                    </>
                ) }

            else if(currentPage !== numberOfPages){
                return (
                    <>
                        <button onClick={()=>{ dispatch(setCurrentPage(currentPage-1))}}  className='buttonPrev'><BiSolidSkipPreviousCircle style={{fontSize:'32px' ,color:'gray' , marginRight:'10px'}} /></button>
                        <p>{currentPage}</p>
                        <button onClick={()=>{ dispatch(setCurrentPage(currentPage+1))}} className='buttonNext'><BiSolidSkipNextCircle style={{fontSize:'32px',color:'gray' , marginLeft:'10px'}} /></button>
                    </>
                )
            }else {
                return(
                <>
                    <button onClick={()=>{ dispatch(setCurrentPage(currentPage-1))}} className='buttonPrev'><BiSolidSkipPreviousCircle  style={{fontSize:'32px' ,color:'gray' , marginRight:'10px'}}/></button>
                    <p>{currentPage}</p>
                </>
            )}
        }
    return (
        <div style={{display: "flex"}} > 
            {renderPagination()}
        </div>
    )
}

export default Pagination