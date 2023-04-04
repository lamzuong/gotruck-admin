import styles from './Header2.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { noAvatar } from '~/global/imagesLink';
import MenuUser from '~/components/MenuUser/MenuUser';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header2() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    setShowMenu(false);
  }, [window.location.href]);

  useEffect(() => {
    if (user === null) navigate('/');
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div></div>
      <div className={cx('user')}>
        <div className={cx('name')}>{user?.fullname}</div>
        <img src={noAvatar} className={cx('image-avatar')} onClick={() => setShowMenu(!showMenu)} />
        {showMenu && (
          <div className={cx('menu')}>
            <MenuUser />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header2;
