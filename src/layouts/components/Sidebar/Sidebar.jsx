import styles from './Sidebar.module.scss';
import MyMenu from '~/components/MyMenu/MyMenu';
import logo from '~/assets/images/logo-name-white.png';
import sidebarLocal from './data';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);

function Sidebar() {
  const baseUrl = 'http://localhost:8080';

  const [path, setPath] = useState('');
  const [sidebar, setSliebar] = useState(sidebarLocal);

  useEffect(() => {
    setPath(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    const getTotalForm = async (type) => {
      const sidebarTemp = sidebar;
      const resFeedback = await axiosClient.get('form/feedback');
      const resRegister = await axiosClient.get('form/register');
      const resWithDraw = await axiosClient.get('form/withdraw');
      const resVehicle = await axiosClient.get('form/vehicle');

      sidebar.map((item, i) => {
        if (item.title === 'Đơn xử lý') {
          item.sub.map((itemOld, index) => {
            if (itemOld.type === 'feedback') {
              sidebarTemp[i].sub[index].numberNotify = resFeedback.total || 0;
            } else if (itemOld.type === 'register') {
              sidebarTemp[i].sub[index].numberNotify = resRegister.total || 0;
            } else if (itemOld.type === 'withdraw') {
              sidebarTemp[i].sub[index].numberNotify = resWithDraw.total || 0;
            } else if (itemOld.type === 'vehicle') {
              sidebarTemp[i].sub[index].numberNotify = resVehicle.total || 0;
            }
            return itemOld;
          });
        }
        return item;
      });
      setSliebar([...sidebarTemp]);
    };
    getTotalForm();
    // window.addEventListener('click', () => {
    //   getTotalForm();
    // });
  }, []);

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
              {e.title === 'Đơn xử lý' && totalNotify(e) > 0 && (
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
