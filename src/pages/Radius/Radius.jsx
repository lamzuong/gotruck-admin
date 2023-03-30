import styles from './Radius.module.scss';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Table } from 'reactstrap';

const cx = classNames.bind(styles);
const data = [
  { time: '23/1/2023 2:03 P.M', radius: 3, user: { id: 1, name: 'Nguyễn Tiến Đạt' } },
  { time: '21/12/2022 3:03 P.M', radius: 3, user: { id: 2, name: 'Trần Văn Nhân' } },
  { time: '1/11/2022 4:03 P.M', radius: 3, user: { id: 3, name: 'Lê Đình Thái' } },
  { time: '21/10/2022 6:03 P.M', radius: 3, user: { id: 4, name: 'Nguyễn Ngọc Ngà' } },
];
function Radius() {
  const [radiusShow, setRadiusShow] = useState(5);
  const [valueRadius, setValueRadius] = useState(5);
  const [showEditRadius, setShowEditRadius] = useState(false);
  const handleRadiusChange = (event) => {
    const limit = 2;
    setValueRadius(event.target.value.slice(0, limit));
  };
  const handleEditRadius = () => {
    setShowEditRadius(false);
    setRadiusShow(valueRadius);
    // call API
  };
  return (
    <div>
      <div className={cx('wrapper-radius')}>
        <div className={cx('radius-view')}>
          <div className={cx('title-header')}>Bán kính nhận đơn:</div>
          <span className={cx('txt-value')}>{radiusShow} km</span>
          {!showEditRadius && (
            <span className={cx('button-edit')} onClick={() => setShowEditRadius(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          )}
        </div>
        {showEditRadius && (
          <div className={cx('wrapper-input')}>
            <div className={cx('inline-center')}>
              <Input
                bsSize="lg"
                type="number"
                max={2}
                value={valueRadius}
                onChange={handleRadiusChange}
              />
              <div style={{ margin: 10 }}>km</div>
            </div>
            <div className={cx('wrapper-button')}>
              <Button color="primary" size="lg" className={cx('button')} onClick={handleEditRadius}>
                OK
              </Button>
              <Button
                color="danger"
                size="lg"
                className={cx('button')}
                onClick={() => setShowEditRadius(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className={cx('title-header')}>Lịch sử thay đổi</div>
      <Table striped bordered className={cx('table-order')}>
        <thead>
          <th>STT</th>
          <th>Thời gian thay đổi</th>
          <th>Bán kính nhận đơn</th>
          <th>Người thay đổi</th>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{e.time}</td>
              <td>{e.radius + ' km'}</td>
              <td>{e.user.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Radius;
