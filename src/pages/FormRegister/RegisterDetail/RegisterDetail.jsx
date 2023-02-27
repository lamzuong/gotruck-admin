import styles from './RegisterDetail.module.scss';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Input, Modal } from 'reactstrap';

const cx = classNames.bind(styles);

function RegisterDetail() {
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
            Xác nhận
          </Button>
        </div>
      </Modal>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Email</label>
            <label className={cx('content')}>{item.email}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          <div>
            <label className={cx('label-short')}>CMND/CCCD</label>
            <label className={cx('content')}>{item.cmnd}</label>
          </div>
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Thời gian gửi</label>
            <label className={cx('content')}>{item.time}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Hình ảnh minh chứng </label>
            <label className={cx('content')}>
              {item.image.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} />
              ))}
            </label>
          </div>
          <div>
            <label className={cx('label-short')}>Trạng thái</label>
            <label className={cx('content')}>{item.status}</label>
          </div>
          {item.status === 'Từ chối' ? (
            <div>
              <label className={cx('label-short')}>Lý do từ chối</label>
              <label className={cx('content')}>{item.reason}</label>
            </div>
          ) : null}
          {item.status === 'Chưa tiếp nhận' ? (
            <div className={cx('wrapper-button')}>
              <Button className={cx('button-unblock')} color="success">
                Chấp thuận và cấp tài khoản
              </Button>
              <Button className={cx('button-block')} color="danger" onClick={toggle}>
                Từ chối đơn
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RegisterDetail;
