import styles from './HistoryPage.module.scss';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import policyAPI from '~/api/policyAPI';
import { formatDatetime } from '~/global/functionGlobal';

const cx = classNames.bind(styles);

function HistoryPage() {
  const navigate = useNavigate();
  const url = window.location.href.slice(21);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const item = location.state;
  const [policy, setPolicy] = useState([]);

  const data = [
    {
      title: 'ABC',
      content: ['zxcvzxc', 'zxcvzxcv', 'zxvczxcv'],
      type: 'Customer',
      history: {
        oldValue: {
          title: null,
          content: [],
        },
        modifiedAt: '24/02/2023 3:43 P.M',
        modifiedBy: 'Nguyen Van An',
      },
      deletedAt: null,
      deletedBy: null,
      hide: false,
    },
    {
      title: 'DEF',
      content: ['zxcvzxc', 'zxcvzxcv', 'zxvczxcv'],
      type: 'Customer',
      history: {
        oldValue: {
          title: 'ABC',
          content: ['zxcvzxc', 'zxcvzxcv', 'zxvczxcv'],
        },
        modifiedAt: '24/02/2023 3:43 P.M',
        modifiedBy: 'Nguyen Van Linh',
      },
      deletedAt: null,
      deletedBy: null,
      hide: false,
    },
    {
      title: 'GHI',
      content: ['zxcvzxc', 'zxcvzxcv', 'zxvczxcv'],
      type: 'Customer',
      history: {
        oldValue: {
          title: null,
          content: [],
        },
        modifiedAt: '24/02/2023 3:43 P.M',
        modifiedBy: 'Le Hong Dao',
      },
      deletedAt: '24/02/2023 3:43 P.M',
      deletedBy: 'Tran Hong Vy',
      hide: false,
    },
    {
      title: 'CVB',
      content: ['zxcvzxc', 'zxcvzxcv', 'zxvczxcv'],
      type: 'Customer',
      history: {
        oldValue: {
          title: 'QER',
          content: ['zxcvzxc', 'zxcvzxcv', 'zxvczxcv'],
        },
        modifiedAt: '24/02/2023 3:43 P.M',
        modifiedBy: 'Le Hong Dao',
      },
      deletedAt: '24/02/2023 3:43 P.M',
      deletedBy: 'Tran Hong Vy',
      hide: false,
    },
  ];

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const res = await policyAPI.getByType(item.type);
        setPolicy(
          res.sort(
            (a, b) =>
              new Date(b.deletedAt || b.history.modifiedAt) -
              new Date(a.deletedAt || a.history.modifiedAt),
          ),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPolicy();
  }, []);

  const checkModify = (item) => {
    if (item.deletedBy !== null) return 'Xóa bỏ';
    else if (item.history.oldValue?.title === null) return 'Thêm mới';
    else return 'Chỉnh sửa';
  };
  const peopleModify = (item) => {
    if (item.deletedBy !== null) return item.deletedBy.fullname;
    else return item.history.modifiedBy.fullname;
  };

  return (
    <div>
      <div className={cx('title-header')}>Lịch sử thay đổi</div>
      <Table striped>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Thời gian thay đổi</th>
            <th>Loại thay đổi</th>
            <th>Người thay đổi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {policy.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.title}</td>
              <td>{formatDatetime(e.deletedBy === null ? e.history.modifiedAt : e.deletedAt)}</td>
              <td>{checkModify(e)}</td>
              <td>{peopleModify(e)}</td>
              <td style={{ width: '10%' }}>
                <Button color="primary" onClick={() => navigate(`${url}/detail`, { state: e })}>
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

export default HistoryPage;
