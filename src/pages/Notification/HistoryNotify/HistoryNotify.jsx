import styles from './HistoryNotify.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import data from './data';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { typeNotify } from '~/global/functionGlobal';

const cx = classNames.bind(styles);

function HistoryNotify() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={cx('title-header')}>Lịch sử thông báo</div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Ngày tạo</th>
            <th>Loại thông báo</th>
            <th>Tiêu đề</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr key={i}>
              <td>{e.createdAt}</td>
              <td>{typeNotify(e.typeNotify)}</td>
              <td>{e.title}</td>
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
    </div>
  );
}

export default HistoryNotify;
