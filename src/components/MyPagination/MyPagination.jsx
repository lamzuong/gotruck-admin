import styles from './MyPagination.module.scss';

import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MyPagination({ page = 1, totalItems = 10, setPage }) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  return (
    <div className={cx('inline-around')}>
      <div></div>
      <div className={cx('wrapper-pagination')}>
        <Pagination size="lg">
          <PaginationItem>
            <PaginationLink
              previous
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              next
              onClick={() =>
                currentPage < Math.ceil(totalItems / 10) && setCurrentPage(currentPage + 1)
              }
            />
          </PaginationItem>
        </Pagination>
      </div>
      <div style={{ color: 'grey' }}>
        Tổng số trang: {currentPage} trên {totalItems / 10 == 0 ? 1 : Math.ceil(totalItems / 10)}
      </div>
    </div>
  );
}

export default MyPagination;
