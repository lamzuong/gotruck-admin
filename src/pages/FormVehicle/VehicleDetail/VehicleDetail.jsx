import styles from './VehicleDetail.module.scss';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Input, Modal } from 'reactstrap';

const cx = classNames.bind(styles);

function VehicleDetail() {
  const location = useLocation();
  const item = location.state;

  const [inputReason, setInputReason] = useState('');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Nhập lý do từ chối</div>
          <Input
            onChange={(e) => setInputReason(e.target.value)}
            value={inputReason}
            bgsize="lg"
            className={cx('input')}
          />
          <Button block color="primary" className={cx('button')} size="lg">
            <h4>Xác nhận</h4>
          </Button>
        </div>
      </Modal>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin cá nhân</h1>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Mã tài xế</label>
            <label className={cx('content')}>{item.user.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Tên tài xế</label>
            <label className={cx('content')}>{item.user.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.user.phone}</label>
          </div>
          <div>
            <label className={cx('label-short')}>CMND/CCCD</label>
            <label className={cx('content')}>{item.user.cmnd}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Thời gian gửi</label>
            <label className={cx('content')}>{item.time}</label>
          </div>
        </div>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin phương tiện</h1>
          <div>
            <label className={cx('label-short')}>Tên xe</label>
            <label className={cx('content')}>{item.truck.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Trọng tải</label>
            <label className={cx('content')}>Xe {item.truck.weight} tấn</label>
          </div>
          <div>
            <label className={cx('label-short')}>Số xe</label>
            <label className={cx('content')}>{item.truck.number}</label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-short')}>Hình ảnh giấy tờ</label>
            <label className={cx('view-image')}>
              {item.truck.img.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} />
              ))}
            </label>
          </div>
          {item.status === 'Từ chối' ? (
            <div>
              <label className={cx('label-short')}>Lý do từ chối</label>
              <label className={cx('content')}>{item.reason}</label>
            </div>
          ) : null}
          {item.status === 'Chưa xử lý' ? (
            <div className={cx('wrapper-button')}>
              <Button className={cx('button-unblock')} color="success">
                Chấp thuận phương tiện
              </Button>
              <Button className={cx('button-block')} color="danger" onClick={toggle}>
                Từ chối
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
