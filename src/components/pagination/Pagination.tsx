import "./Pagination.scss";

import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import {useSearch} from "../../store/SearchContext.tsx";


const Pagination: FC = () => {

  const {pagination, setPagination} = useSearch()


  return (
      <ReactPaginate
          className="root"
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event) => setPagination({totalPages: pagination.totalPages, currentPage: event.selected + 1})}
          pageRangeDisplayed={10}
          pageCount={pagination.totalPages}
          previousLabel="<"
          forcePage={pagination.currentPage - 1}
          renderOnZeroPageCount={null}
      />
  );
};

export default Pagination;