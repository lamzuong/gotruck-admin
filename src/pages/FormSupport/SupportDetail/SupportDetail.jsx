import styles from './SupportDetail.module.scss';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from 'reactstrap';
import { formatDateFull } from '~/global/formatDateCustom';
import formFeedbackAPI from '~/api/formFeedback';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SupportDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const itemTemp = location.state;
  const user = useSelector((state) => state.auth.user);
  const [item, setItem] = useState(itemTemp);

  const handleReceive = async () => {
    const dataSend = item;
    dataSend.status = 'Đã tiếp nhận';
    dataSend.id_handler = user._id;
    await formFeedbackAPI.put(dataSend);
    const resFeedback = await formFeedbackAPI.getById(item._id);
    setItem(resFeedback);
  };

  const handleComplete = async () => {
    const dataSend = item;
    dataSend.status = 'Đã xong';
    dataSend.id_handler = user._id;
    await formFeedbackAPI.put(dataSend);
    navigate('/form-support');
  };

  return (
    <div className={cx('wrapper')}>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ fontSize: '150%', cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <h1 style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 15 }}>Chi tiết đơn xử lý</h1>
      </div>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id_feedback}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Mã người dùng</label>
            <label className={cx('content')}>{item.id_sender.id_cus}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.id_sender.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Người xử lý</label>
            <label className={cx('content')}>{item.id_handler.fullname}</label>
          </div>

          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.id_sender.phone}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Thời gian gửi</label>
            <label className={cx('content')}>{formatDateFull(item.createdAt)}</label>
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
            <label className={cx('label-long')}>Hình ảnh minh chứng </label>
            <label className={cx('content')}>
              {item.list_image.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} />
              ))}
            </label>
          </div>
          <div>
            {item.status === 'Đã gửi' ? (
              <Button
                className={cx('button-unblock')}
                color="success"
                onClick={() => handleReceive()}
              >
                Tiếp nhận
              </Button>
            ) : item.status === 'Đã tiếp nhận' ? (
              <div className={cx('inline')}>
                <Button
                  className={cx('button-unblock')}
                  color="success"
                  onClick={() => handleComplete()}
                >
                  Đã xong
                </Button>
                <Button
                  className={cx('button-custom')}
                  color="warning"
                  onClick={() =>
                    navigate(`/form-support/support-detail/${item.id_feedback}/contact`, {
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
