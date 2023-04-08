import styles from './HistoryDetail.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function HistoryDetail() {
  const location = useLocation();
  const item = location.state;

  return (
    <div>
      {item.history.oldValue.title && item.deletedBy === null && (
        <>
          <div className={cx('title-header')}>Chính sách ban đầu</div>
          <div className={cx('body')}>
            <div className={cx('inline')}>
              <div className={cx('title')}>Tiêu đề</div>
              <div className={cx('content')}>{item.history.oldValue.title}</div>
            </div>
            <div className={cx('inline')}>
              <div className={cx('title')}>Nội dung</div>
              <div className={cx('content')}>
                {item.history.oldValue.content.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </div>
            </div>
          </div>
          <div className={cx('title-header')}>Sau khi thay đổi</div>
        </>
      )}
      <div className={cx('body')}>
        <div className={cx('inline')}>
          <div className={cx('title')}>Tiêu đề</div>
          <div>{item.title}</div>
        </div>
        <div className={cx('inline')}>
          <div className={cx('title')}>Nội dung</div>
          <div className={cx('content')}>
            {item.content.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetail;
