import styles from './WithdrawDetail.module.scss';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Input, Modal } from 'reactstrap';
import { convertMoney } from '~/global/functionGlobal';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function WithdrawDetail() {
  const location = useLocation();
  const item = location.state;

  const [imagePay, setImagePay] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Ảnh minh chứng nạp tiền</div>
          {imagePay === null ? (
            <MyButtonAdd data={setImagePay} />
          ) : (
            <div>
              <img
                src={imagePay !== null && window.URL.createObjectURL(imagePay[0])}
                className={cx('img')}
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={cx('icon-del')}
                onClick={() => setImagePay(null)}
              />
            </div>
          )}
          <input type={'file'} />
          <Button block color="primary" className={cx('button')} size="lg">
            <h4>Xác nhận</h4>
          </Button>
        </div>
      </Modal>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <img src={item.user.avatar} className={cx('avatar')} />
        </div>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin cá nhân</h1>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Mã người gửi</label>
            <label className={cx('content')}>{item.user.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Tên người gửi</label>
            <label className={cx('content')}>{item.user.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Số tiền cần rút</label>
            <label className={cx('content')}>{convertMoney(item.money, 'đ')}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Thời gian gửi</label>
            <label className={cx('content')}>{item.time}</label>
          </div>
          {item.img !== null && (
            <div>
              <label className={cx('label-short')}>Hình ảnh nạp tiền</label>
              <label className={cx('content')}>
                <img src={item.img} className={cx('img')} />
              </label>
            </div>
          )}
          {item.status === 'Chưa xử lý' ? (
            <div className={cx('wrapper-button')}>
              <Button className={cx('button-unblock')} color="success" onClick={toggle}>
                Xác nhận xử lý xong
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WithdrawDetail;
