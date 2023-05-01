import styles from './FeeApp.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatDateFull } from '~/global/formatDateCustom';
import feeAppAPI from '~/api/feeAppAPI';

const cx = classNames.bind(styles);

function FeeApp() {
  const [feeShow, setFeeShow] = useState('');
  const [valueFee, setValueFee] = useState('');
  const [showEditFee, setShowEditFee] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const handleFeeChange = (event) => {
    const limit = 2;
    setValueFee(event.target.value.slice(0, limit));
  };
  const handleEditFee = async () => {
    if (Number(valueFee) <= 0) {
      alert('Phí phải lớn hơn 0');
      return;
    }
    await feeAppAPI.putFee({
      fee: Number(valueFee),
      id_modify: user._id,
    });

    const resHistoryChange = await feeAppAPI.getHistoryChange();
    if (!resHistoryChange.notFound) {
      setValueFee(resHistoryChange[0].fee);
      setData([...resHistoryChange]);
      setFeeShow(resHistoryChange[0].fee);
    }

    setShowEditFee(false);
  };

  useEffect(() => {
    const getHistoryChange = async () => {
      const resHistoryChange = await feeAppAPI.getHistoryChange();
      if (!resHistoryChange.notFound) {
        setValueFee(resHistoryChange[0].fee);
        setFeeShow(resHistoryChange[0].fee);
        setData([...resHistoryChange]);
      }
    };
    getHistoryChange();
  }, []);

  return (
    <div>
      <div className={cx('wrapper-radius')}>
        <div className={cx('radius-view')}>
          <div className={cx('title-header')}>Phí vận chuyển:</div>
          <span className={cx('txt-value')}>{feeShow} %</span>
          {!showEditFee && (
            <span className={cx('button-edit')} onClick={() => setShowEditFee(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          )}
        </div>
        {showEditFee && (
          <div className={cx('wrapper-input')}>
            <div className={cx('inline-center')}>
              <Input
                bsSize="lg"
                type="number"
                max={2}
                value={valueFee}
                onChange={handleFeeChange}
              />
              <div style={{ margin: 10 }}>%</div>
            </div>
            <div className={cx('wrapper-button')}>
              <Button color="primary" size="lg" className={cx('button')} onClick={handleEditFee}>
                OK
              </Button>
              <Button
                color="danger"
                size="lg"
                className={cx('button')}
                onClick={() => setShowEditFee(false)}
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
          <th>Phí vận chuyển</th>
          <th>Ngày bắt đầu</th>
          <th>Ngày kết thúc</th>
          <th>Người thay đổi</th>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{Number(e.fee) + ' %'}</td>
              <td>{formatDateFull(e.dateStart)}</td>
              <td>{e.dateEnd ? formatDateFull(e.dateEnd) : ' '}</td>
              <td>{e?.modifyBy?.fullname}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FeeApp;
