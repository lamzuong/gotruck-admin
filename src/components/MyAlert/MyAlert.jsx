import styles from './MyAlert.module.scss';

import React, { useState } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MyAlert = ({ id, message, autoClose, type, onClose }) => {
  let bgcolor = type === 'success' ? 'lightgreen' : type === 'error' ? '#ffcccc' : 'lightyellow';
  return (
    <div className={cx('alert')} style={{ backgroundColor: bgcolor }}>
      <span className={cx('view-message')}>
        <p>{message}</p>
      </span>
      {!autoClose && (
        <button
          onClick={() => {
            onClose(id);
          }}
        >
          close
        </button>
      )}
    </div>
  );
};

export default MyAlert;
