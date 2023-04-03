import styles from './Header2.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { noAvatar } from '~/global/imagesLink';
import MenuUser from '~/components/MenuUser/MenuUser';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Header2() {
  const auth = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    setShowMenu(false);
  }, [window.location.href]);

  return (
    <div className={cx('wrapper')}>
      <div></div>
      <div className={cx('user')}>
        <div className={cx('name')}>{auth.user.fullname}</div>
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
