import styles from './ShipperAccount.module.scss';

import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Modal, Table } from 'reactstrap';
import {
  BodyTableVehicle,
  HeaderTableVehicle,
} from '../../components/MyTableVehicle/MyTableVehicle';
import { convertMoney } from '~/global/functionGlobal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ShipperAccount() {
  const location = useLocation();
  const item = location.state;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Mã tài xế:</div>
            <div>{item.id}</div>
          </div>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Số tiền nạp:</div>
            <Input type="number" className={cx('input')} />
            <div style={{ marginLeft: 10 }}>VNĐ</div>
          </div>
        </div>
      </Modal>
      <div className={cx('display-flex')}>
        <img src={item.avatar} className={cx('avatar')} />
        <div className={cx('column')}>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Mã tài xế</label>
            <label className={cx('content')}>{item.id}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>CMND/CCCD</label>
            <label className={cx('content')}>{item.identityNumber}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Email</label>
            <label className={cx('content')}>abc@gmail.com</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Địa chỉ</label>
            <label className={cx('content')} style={{ marginBottom: 20 }}>
              Số 10 Lê Lợi Phường 4 Quận Gò Vấp TPHCM
            </label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-medium')}>Hình ảnh giấy tờ</label>
            <label className={cx('view-image')} style={{ marginBottom: 20 }}>
              {item.imagePapers.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} />
              ))}
            </label>
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
            <label className={cx('label-long')}>Số dư ví GoTruck</label>
            <label className={cx('content')}>{convertMoney(15145, 'VNĐ')}</label>
          </div>

          <div>
            <label className={cx('label-long')}>Ngày bắt đầu hoạt động</label>
            <label className={cx('content')}>{item.firstTime}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Lần cuối cùng hoạt động</label>
            <label className={cx('content')}>{item.lastTime}</label>
          </div>

          <div className={cx('view-button')}>
            {item.status === 'Đã khóa' ? (
              <Button className={cx('button-unblock')} color="success">
                Mở khóa tài khoản
              </Button>
            ) : (
              <>
                <Button className={cx('button-unblock')} color="success" onClick={toggle}>
                  Nạp tiền
                </Button>
                <Button className={cx('button-block')} color="danger">
                  Khóa tài khoản
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className={cx('label-nor')}>Danh sách phương tiện của shipper</label>
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
