import styles from './SupportDetail.module.scss';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from 'reactstrap';

const cx = classNames.bind(styles);

function SupportDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Mã người dùng</label>
            <label className={cx('content')}>{item.sender.id}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.sender.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Email</label>
            <label className={cx('content')}>{item.email}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Vấn đề</label>
            <label className={cx('content')}>{item.subject}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Mô tả</label>
            <label className={cx('content')}>{item.description}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Trạng thái</label>
            <label className={cx('content')}>{item.status}</label>
          </div>
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
            {item.status === 'Chưa tiếp nhận' ? (
              <Button className={cx('button-unblock')} color="success">
                Tiếp nhận
              </Button>
            ) : item.status === 'Đã tiếp nhận' ? (
              <div className={cx('inline')}>
                <Button className={cx('button-unblock')} color="success">
                  Đã xong
                </Button>
                <Button
                  className={cx('button-custom')}
                  color="warning"
                  onClick={() =>
                    navigate(`/form-support/support-detail/${item.id}/contact`, {
                      state: item,
                    })
                  }
                >
                  Liên hệ với người gửi
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportDetail;
