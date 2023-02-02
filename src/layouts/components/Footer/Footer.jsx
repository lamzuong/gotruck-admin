import styles from './Footer.module.scss';
import logo from '~/assets/images/logo-name-green.png';
import certificate1 from '~/assets/images/bo-cong-thuong.png';
import certificate2 from '~/assets/images/bo-cong-thuong-2.png';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('part-footer')}>
          <img src={logo} className={cx('logo')} />
          <div className={cx('header')}>Forward together</div>
          <div className={cx('header')}>Công ty TNHH GoTruck</div>
          <div className={cx('body')}>
            Địa chỉ: Tòa nhà Mapletree Business Centre, 1060 Nguyễn Văn Linh, Phường Tân Phong, Quận
            7, Thành phố Hồ Chí Minh, Việt Nam.
          </div>
          <div className={cx('body')}>Mã số doanh nghiệp: 0312650437</div>
        </div>
        <div className={cx('part-footer')}>
          <div className={cx('header')}>Thông tin liên hệ</div>
          <div className={cx('body')}>Hotline: 1900 152 511</div>
          <div className={cx('body')}>Email liên hệ: gotruck@gmail.com</div>
          <div className={cx('header')}>Follow us and keep updated</div>
          <div className={cx('body')}>
            <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
            <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
            <FontAwesomeIcon icon={faTwitter} className={cx('icon')} />
          </div>
          <div> </div>
          <img src={certificate1} className={cx('logo-certificate')} />
          <img src={certificate2} className={cx('logo-certificate')} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
