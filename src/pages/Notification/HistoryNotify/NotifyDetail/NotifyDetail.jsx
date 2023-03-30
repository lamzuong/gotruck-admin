import styles from './NotifyDetail.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { typeNotify, typeSend } from '~/global/functionGlobal';

const cx = classNames.bind(styles);

function NotifyDetail() {
  const location = useLocation();
  const item = location.state;

  return (
    <div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Thông báo tới</div>
        <div className={cx('content')}>{typeSend(item.typeSend)}</div>
      </div>
      {item.typeSend === 'Specific' && (
        <div className={cx('inline')}>
          <div className={cx('label')}>Mã người dùng</div>
          <div className={cx('content')}>{item.idUser}</div>
        </div>
      )}
      <div className={cx('inline')}>
        <div className={cx('label')}>Loại thông báo</div>
        <div className={cx('content')}>{typeNotify(item.typeNotify)}</div>
      </div>
      <div className={cx('inline')}>
        <div className={cx('label')}>Thời gian</div>
        <div className={cx('content')}>{item.createdAt}</div>
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
