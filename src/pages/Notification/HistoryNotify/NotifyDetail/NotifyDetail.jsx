import styles from './NotifyDetail.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { typeNotify, typeSend } from '~/global/functionGlobal';
import { formatDateFull } from '~/global/formatDateCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function NotifyDetail() {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();
  return (
    <div>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      />
      <div className={cx('inline')}>
        <div className={cx('label')}>Mã thông báo</div>
        <div className={cx('content')}>{item.id_notify}</div>
      </div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Người gửi</div>
        <div className={cx('content')}>{item.id_handler.fullname}</div>
      </div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Thông báo tới</div>
        <div className={cx('content')}>{typeSend(item.type_send)}</div>
      </div>
      {item.type_send === 'Specific' && (
        <div className={cx('inline')}>
          <div className={cx('label')}>Tên người dùng</div>
          <div className={cx('content')}>{item.id_receiver.name}</div>
        </div>
      )}
      <div className={cx('inline')}>
        <div className={cx('label')}>Loại thông báo</div>
        <div className={cx('content')}>{typeNotify(item.type_notify)}</div>
      </div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Thời gian</div>
        <div className={cx('content')}>{formatDateFull(item.createdAt)}</div>
      </div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Tiêu đề</div>
        <div className={cx('content')}>{item.title}</div>
      </div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Nội dung</div>
        <div className={cx('content')}>{item.content}</div>
      </div>
      {item.image.length > 0 && (
        <div className={cx('inline')}>
          <div className={cx('label')}>Hình ảnh</div>
          <div className={cx('content')}>
            {item.image.map((e, i) => (
              <img src={e} key={i} className={cx('image')} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotifyDetail;
