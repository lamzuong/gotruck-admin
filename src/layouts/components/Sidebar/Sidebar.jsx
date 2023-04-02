import styles from './Sidebar.module.scss';
import MyMenu from '~/components/MyMenu/MyMenu';
import logo from '~/assets/images/logo-name-white.png';
import sidebar from './data';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Sidebar() {
  const baseUrl = 'http://localhost:8080';

  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.href);
  }, [window.location.href]);

  const totalNotify = (item) => {
    let total = 0;
    for (let i = 0; i < item.sub.length; i++) {
      total += item.sub[i].numberNotify;
    }
    return total;
  };

  return (
    <div className={cx('wrapper')}>
      <Link to={'/earning'}>
        <img src={logo} alt="GoTruck" className={cx('logo')} />
      </Link>
      {sidebar.map((e, i) =>
        e.sub.length === 0 ? (
          <Link
            to={e.path}
            className={
              path.startsWith(baseUrl + e.path) ? cx('wrapper-choose') : cx('wrapper-item')
            }
            key={i}
          >
            <div className={cx('icon')}>{e.icon}</div>
            <div className={cx('item-title')}>{e.title}</div>
          </Link>
        ) : (
          <MyMenu offset={[0, -10]} items={e.sub} key={i}>
            <div
              className={
                path.startsWith(baseUrl + e.path) ? cx('wrapper-choose') : cx('wrapper-item')
              }
            >
              <div className={cx('icon')}>{e.icon}</div>
              <div className={cx('item-title')}>{e.title}</div>
              {e.title === 'Đơn xử lý' && (
                <div className={cx('total-notify')}>
                  {totalNotify(e) > 0 ? totalNotify(e) : null}
                </div>
              )}
            </div>
          </MyMenu>
        ),
      )}
    </div>
  );
}

export default Sidebar;
