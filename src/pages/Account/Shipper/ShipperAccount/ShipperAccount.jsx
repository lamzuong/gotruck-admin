import styles from './ShipperAccount.module.scss';

import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'reactstrap';
import {
  BodyTableVehicle,
  HeaderTableVehicle,
} from '../../components/MyTableVehicle/MyTableVehicle';

const cx = classNames.bind(styles);

function ShipperAccount() {
  const location = useLocation();
  const item = location.state;
  console.log(item);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('display-flex')}>
        <img src={item.avatar} className={cx('avatar')} />
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã tài xế</label>
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
            <label className={cx('label-short')}>CMND/CCCD</label>
            <label className={cx('content')}>{item.identityNumber}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Ngày bắt đầu hoạt động</label>
            <label className={cx('content')}>{item.firstTime}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Lần cuối cùng hoạt động</label>
            <label className={cx('content')}>{item.lastTime}</label>
          </div>
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-long')}>Đánh giá của tài xế</label>
            <label className={cx('content')}>{item.star}</label>
            <label className={cx('content')}>
              <FontAwesomeIcon icon={faStar} color="yellow" />
            </label>
          </div>
          <div>
            <label className={cx('label-long')}>Số đơn hoàn thành</label>
            <label className={cx('content')}>{item.finishOrder}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Số đơn hủy</label>
            <label className={cx('content')}>{item.cancelOrder}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Hình ảnh giấy tờ</label>
            <label className={cx('content')}>
              {item.imagePapers.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} />
              ))}
            </label>
          </div>
          <div>
            <label className={cx('label-long')}></label>
            <label className={cx('content')}>
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
          </div>
        </div>
      </div>
      <div>
        <label className={cx('label-medium')}>Danh sách phương tiện của shipper</label>
        <Table striped>
          <HeaderTableVehicle />
          <tbody>
            {item.vehicle.map((e, i) => (
              <BodyTableVehicle item={e} key={i} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ShipperAccount;
