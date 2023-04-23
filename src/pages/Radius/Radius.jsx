import styles from './Radius.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Table } from 'reactstrap';
import radiusAPI from '~/api/radius';
import { useSelector } from 'react-redux';
import { formatDateFull } from '~/global/formatDateCustom';

const cx = classNames.bind(styles);

function Radius() {
  const [radiusShow, setRadiusShow] = useState('');
  const [valueRadius, setValueRadius] = useState('');
  const [showEditRadius, setShowEditRadius] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const handleRadiusChange = (event) => {
    const limit = 2;
    setValueRadius(event.target.value.slice(0, limit));
  };
  const handleEditRadius = async () => {
    await radiusAPI.putRadius({
      radius: Number(valueRadius) * 1000,
      nameUserChange: user.fullname,
    });

    const resHistoryChange = await radiusAPI.getHistoryChange();
    if (!resHistoryChange.notFound) {
      setValueRadius(resHistoryChange[0].distance_receive_order / 1000);
      setData([...resHistoryChange]);
      setRadiusShow(resHistoryChange[0].distance_receive_order / 1000);
    }

    setShowEditRadius(false);
  };

  useEffect(() => {
    const getHistoryChange = async () => {
      const resHistoryChange = await radiusAPI.getHistoryChange();
      if (!resHistoryChange.notFound) {
        setValueRadius(resHistoryChange[0].distance_receive_order / 1000);
        setRadiusShow(resHistoryChange[0].distance_receive_order / 1000);
        setData([...resHistoryChange]);
      }
    };
    getHistoryChange();
  }, []);
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
          <th>Bán kính nhận đơn</th>
          <th>Thời gian thay đổi</th>
          <th>Người thay đổi</th>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{Number(e.distance_receive_order) / 1000 + ' km'}</td>
              <td>{formatDateFull(e.createdAt)}</td>
              <td>{e.nameUserChange}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Radius;
