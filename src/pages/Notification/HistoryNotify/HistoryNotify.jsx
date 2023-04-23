import styles from './HistoryNotify.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// import data from './data';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { typeNotify } from '~/global/functionGlobal';
import notifyAPI from '~/api/notify';
import { formatDateFull } from '~/global/formatDateCustom';
import MyPagination from '~/components/MyPagination/MyPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HistoryNotify() {
  const navigate = useNavigate();
  const [listNotify, setListNotify] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    const getNotify = async () => {
      try {
        const res = await notifyAPI.get({
          limit: 10,
          page: page,
        });
        if (!res.isNotFound) {
          setListNotify(res.data);
          setTotalItems(res.totalPage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotify();
  }, [page]);

  return (
    <div>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      />
      <div className={cx('title-header')}>Lịch sử thông báo</div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Mã thông báo</th>
            <th>Người tạo</th>
            <th>Loại thông báo</th>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listNotify.map((e, i) => (
            <tr key={i}>
              <td>{e.id_notify}</td>
              <td>{e.id_handler.fullname}</td>
              <td>{typeNotify(e.type_notify)}</td>
              <td>{e.title}</td>
              <td>{formatDateFull(e.createdAt)}</td>

              <td style={{ width: '10%' }}>
                <Button
                  color="primary"
                  onClick={() => navigate(`/notification/history/${e.id}`, { state: e })}
                >
                  <h4>Xem</h4>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MyPagination setPage={setPage} page={page} totalItems={totalItems.length} />
    </div>
  );
}

export default HistoryNotify;
