import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css"

interface PaginationProps {
  maxPage:number
  setPage: (page: number) => void;

}

const Pagination: React.FC<PaginationProps> = ({ maxPage, setPage }) => {
  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={"← Prev"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={maxPage}
      marginPagesDisplayed={0}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"pagination__page__item--active"}
      pageLinkClassName={"pagination__page__link"}
      previousClassName={"pagination__prev"}
      breakLinkClassName={"pagination__page__link"}
      nextClassName={"pagination__next"}
    />
  );
};
 export default Pagination