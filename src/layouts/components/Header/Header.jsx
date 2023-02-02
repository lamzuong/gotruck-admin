import styles from './Header.module.scss';
import logo from '~/assets/images/logo-name-green.png';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  faCircleExclamation,
  faClipboardList,
  faRightFromBracket,
  faRightToBracket,
  faSackDollar,
  faShieldHalved,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyMenu from '~/components/MyMenu/MyMenu';

const cx = classNames.bind(styles);

function Header() {
  const currentUser = true;
  const MENU_ITEMS_PRICE = [
    {
      title: 'Giá vận chuyển',
      to: '/feedback',
    },
    {
      title: 'Khuyến mãi',
      to: '/feedback',
    },

    {
      title: 'Lịch sử thay đổi',
      to: '/feedback',
    },
  ];
  const MENU_ITEMS_REPORT = [
    {
      title: 'Đơn Góp ý và Khiếu nại',
      to: '/feedback',
      numberNotify: 4,
    },
    {
      title: 'Đơn đăng ký của shipper',
      to: '/feedback',
      numberNotify: 2,
    },
    {
      title: 'Đơn yêu cầu thay đổi thông tin xe',
      to: '/feedback',
      numberNotify: 2,
    },
  ];
  const totalNotify = () => {
    let total = 0;
    for (let i = 0; i < MENU_ITEMS_REPORT.length; i++) {
      total += MENU_ITEMS_REPORT[i].numberNotify;
    }
    return total;
  };
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={'/'}>
          <img src={logo} alt="GoTruck" className={cx('logo')} />
        </Link>
        <div className={cx('list-header-items')}>
          {currentUser ? (
            <>
              <Link to={'/policy'} className={cx('header-item')}>
                <FontAwesomeIcon icon={faUserShield} />
                <div className={cx('item-title')}>Tài khoản</div>
              </Link>
              <MyMenu items={MENU_ITEMS_PRICE}>
                <div to={'/policy'} className={cx('header-item')}>
                  <FontAwesomeIcon icon={faSackDollar} />
                  <div className={cx('item-title')}>Giá cả</div>
                </div>
              </MyMenu>
              <MyMenu items={MENU_ITEMS_REPORT} width={'350px'} offset={[150, 8]}>
                <div to={'/policy'} className={cx('header-item')}>
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <div className={cx('item-title')}>Đơn xử lý</div>
                  <div className={cx('total-notify')}>
                    {totalNotify() > 0 ? totalNotify() : null}
                  </div>
                </div>
              </MyMenu>
              <Link to={'/policy'} className={cx('header-item')}>
                <FontAwesomeIcon icon={faClipboardList} />
                <div className={cx('item-title')}>Đơn hàng</div>
              </Link>
              <Link to={'/policy'} className={cx('header-item')}>
                <FontAwesomeIcon icon={faShieldHalved} />
                <div className={cx('item-title')}>Điều khoản và Chính sách</div>
              </Link>
              <Link to={'/support'} className={cx('header-item')}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <div className={cx('item-title')}>Đăng xuất</div>
              </Link>
            </>
          ) : (
            <>
              <Link to={'/policy'} className={cx('header-item')}>
                <FontAwesomeIcon icon={faShieldHalved} />
                <div className={cx('item-title')}>Điều khoản và Chính sách</div>
              </Link>
              <Link to={'/support'} className={cx('header-item')}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <div className={cx('item-title')}>Đăng nhập</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
