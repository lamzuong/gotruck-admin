import styles from './Header.module.scss';
import MyMenu from '~/components/MyMenu/MyMenu';
import logo from '~/assets/images/logo-name-green.png';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  faCircleExclamation,
  faClipboardList,
  faRightFromBracket,
  faSackDollar,
  faShieldHalved,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { logOut } from '~/app/authSlide';

const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();

  const MENU_ITEMS_ACCOUNT = [
    { title: 'Khách hàng', to: '/customer' },
    { title: 'Tài xế', to: '/shipper' },
  ];
  const MENU_ITEMS_PRICE = [
    {
      title: 'Giá vận chuyển',
      to: '/price',
    },
    {
      title: 'Khuyến mãi',
      to: '/discount',
    },

    {
      title: 'Lịch sử thay đổi',
      to: '/history-change',
    },
  ];
  const MENU_ITEMS_REPORT = [
    {
      title: 'Đơn Góp ý và Khiếu nại',
      to: '/form-support',
      numberNotify: 4,
    },
    {
      title: 'Đơn đăng ký của tài xế',
      to: '/form-register',
      numberNotify: 2,
    },
    {
      title: 'Đơn yêu cầu thay đổi thông tin xe',
      to: '/form-vehicle',
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
        <Link to={'/home'}>
          <img src={logo} alt="GoTruck" className={cx('logo')} />
        </Link>
        <div className={cx('list-header-items')}>
          <MyMenu items={MENU_ITEMS_ACCOUNT} offset={[20, 8]}>
            <div className={cx('header-item')}>
              <FontAwesomeIcon icon={faUserShield} />
              <div className={cx('item-title')}>Tài khoản</div>
            </div>
          </MyMenu>
          <MyMenu items={MENU_ITEMS_PRICE}>
            <div className={cx('header-item')}>
              <FontAwesomeIcon icon={faSackDollar} />
              <div className={cx('item-title')}>Giá cả</div>
            </div>
          </MyMenu>
          <MyMenu items={MENU_ITEMS_REPORT} width={'350px'} offset={[150, 8]}>
            <div className={cx('header-item')}>
              <FontAwesomeIcon icon={faCircleExclamation} />
              <div className={cx('item-title')}>Đơn xử lý</div>
              <div className={cx('total-notify')}>{totalNotify() > 0 ? totalNotify() : null}</div>
            </div>
          </MyMenu>
          <Link to={'/order'} className={cx('header-item')}>
            <FontAwesomeIcon icon={faClipboardList} />
            <div className={cx('item-title')}>Đơn hàng</div>
          </Link>
          <Link to={'/policy'} className={cx('header-item')}>
            <FontAwesomeIcon icon={faShieldHalved} />
            <div className={cx('item-title')}>Điều khoản và Chính sách</div>
          </Link>
          <Link
            to={'/'}
            className={cx('header-item')}
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <div className={cx('item-title')}>Đăng xuất</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
