import styles from './MenuUser.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuUser() {
  const data = [
    {
      title: 'Đổi mật khẩu',
      icon: <FontAwesomeIcon icon={faKey} />,
      action: '/change-pass',
    },
    {
      title: 'Đăng xuất',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      action: '/',
    },
  ];
  const navigate = useNavigate();
  return (
    <div className={cx('wrapper')}>
      {data.map((e, i) => (
        <div key={i} className={cx('item')} onClick={() => navigate(e.action)}>
          <div>{e.icon}</div>
          <div className={cx('title')}>{e.title}</div>
        </div>
      ))}
    </div>
  );
}

export default MenuUser;
