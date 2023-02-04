import MyButtonPolicy from '~/components/MyButtonPolicy/MyButtonPolicy';
import styles from './Policy.module.scss';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faTruck, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Policy() {
  return (
    <div className={cx('wrapper')}>
      <MyButtonPolicy
        icon={<FontAwesomeIcon icon={faUser} size={'2x'} color={'#04af46'} />}
        title={'Điều khoản cho khách hàng'}
        to={'/'}
      />
      <MyButtonPolicy
        icon={<FontAwesomeIcon icon={faTruck} size={'2x'} color={'#04af46'} />}
        title={'Điều khoản cho shipper'}
        to={'/'}
      />
      <MyButtonPolicy
        icon={<FontAwesomeIcon icon={faUserShield} size={'2x'} color={'#04af46'} />}
        title={'Chính sách bảo mật'}
        to={'/'}
      />
      <MyButtonPolicy
        icon={<FontAwesomeIcon icon={faArrowsRotate} size={'2x'} color={'#04af46'} />}
        title={'Quy chế hoạt động của GoTruck'}
        to={'/'}
      />
    </div>
  );
}

export default Policy;
