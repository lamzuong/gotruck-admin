import styles from './CustomerAccount.module.scss';
import { noAvatar } from '~/global/imagesLink';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const cx = classNames.bind(styles);

function CustomerAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;
  return (
    <div className={cx('wrapper')}>
      <div className={cx('display-flex')}>
        <img src={item.avatar || noAvatar} className={cx('avatar')} />
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã khách hàng</label>
            <label className={cx('content')}>{item.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Ngày bắt đầu hoạt động</label>
            <label className={cx('content')}>{item.firstTime}</label>
          </div>
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-long')}>Số đơn hoàn thành</label>
            <label className={cx('content')}>{item.finishOrder}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Số đơn không hoàn thành</label>
            <label className={cx('content')}>{item.boomOrder}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Số đơn hủy</label>
            <label className={cx('content')}>{item.cancelOrder}</label>
          </div>
          <div>
            <label className={cx('label-long')}>
              {item.status === 'Đã khóa' ? (
                <Button className={cx('button-unblock')} color="success">
                  Mở khóa tài khoản
                </Button>
              ) : (
                <Button className={cx('button-block')} color="danger">
                  Khóa tài khoản
                </Button>
              )}
            </label>
            <label className={cx('content')}>
              <Button
                className={cx('button-custom')}
                color="success"
                onClick={() => {
                  navigate(`/shipper/${item.id}/order`, { state: item });
                }}
              >
                Xem danh sách đơn hàng
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccount;
