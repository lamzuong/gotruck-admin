import styles from './HistoryButton.module.scss';
import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HistoryButton({ header, action = () => {} }) {
  return (
    <div className={cx('inline-between')}>
      <div className={cx('title-header')}>{header}</div>
      <div className={cx('title-link')} onClick={action}>
        Xem lịch sử thay đổi &#62;&#62;
      </div>
    </div>
  );
}

export default HistoryButton;
