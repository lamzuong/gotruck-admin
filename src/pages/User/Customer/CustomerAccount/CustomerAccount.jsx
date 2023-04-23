import styles from './CustomerAccount.module.scss';
import { noAvatar } from '~/global/imagesLink';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import MyConfirm from '~/components/MyConfirm/MyConfirm';
import { useEffect, useState } from 'react';
import customerAPI from '~/api/customerAPI';
import { formatDateFull } from '~/global/formatDateCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CustomerAccount() {
  const location = useLocation();
  const navigate = useNavigate();

  const [item, setItem] = useState(location.state);
  const [showConfirm, setShowConfirm] = useState(false);
  const [txtConfirm, setTxtConfirm] = useState(false);

  const handleBlock = async () => {
    await customerAPI.block(item.id_cus);
    setShowConfirm(false);
    const res = await customerAPI.getCusById(item.id_cus);
    setItem(res);
  };
  const toggle = (block) => {
    setShowConfirm(!showConfirm);
    setTxtConfirm(
      block
        ? 'Bạn có chắc muốn khóa tài khoản này không ?'
        : 'Bạn muốn mở khóa tài khoản này đúng không ?',
    );
  };

  useEffect(() => {
    const getInfoCus = async () => {
      const res = await customerAPI.getCusById(item.id_cus);
      setItem(res);
    };
    getInfoCus();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer', marginBottom: 10 }}
        onClick={() => navigate(-1)}
      />
      <MyConfirm
        setShow={setShowConfirm}
        show={showConfirm}
        title={txtConfirm}
        action={handleBlock}
      />
      <div className={cx('display-flex')}>
        <img src={item.avatar || noAvatar} className={cx('avatar')} />
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã khách hàng</label>
            <label className={cx('content')}>{item.id_cus}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          {/* <div>
            <label className={cx('label-long')}>Ngày bắt đầu hoạt động</label>
            <label className={cx('content')}>{formatDateFull(item.createdAt)}</label>
          </div> */}
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-long')}>Số đơn hoàn thành</label>
            <label className={cx('content')}>{item.countCompleted}</label>
          </div>
          {/* <div>
            <label className={cx('label-long')}>Số đơn không hoàn thành</label>
            <label className={cx('content')}>{item.boomOrder}</label>
          </div> */}
          <div>
            <label className={cx('label-long')}>Số đơn hủy</label>
            <label className={cx('content')}>{item.countCancel}</label>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 180 }}>
        <label className={cx('label-long')}>
          {item.block ? (
            <Button className={cx('button-unblock')} color="success" onClick={() => toggle(false)}>
              Mở khóa tài khoản
            </Button>
          ) : (
            <Button className={cx('button-block')} color="danger" onClick={() => toggle(true)}>
              Khóa tài khoản
            </Button>
          )}
        </label>
        {/* <label className={cx('content')}>
          <Button
            className={cx('button-custom')}
            color="success"
            onClick={() => {
              navigate(`/order/shipper/${item.id}`, { state: item });
            }}
          >
            Xem danh sách đơn hàng
          </Button>
        </label> */}
      </div>
    </div>
  );
}

export default CustomerAccount;
