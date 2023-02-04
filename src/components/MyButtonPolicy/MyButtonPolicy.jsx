import styles from './MyButtonPolicy.module.scss';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MyButtonPolicy({ icon, title, to }) {
  return (
    <div className={cx('wrapper')}>
      <Link to={to}>
        <div className={cx('icon')}>{icon}</div>
        <div className={cx('title')}>{title}</div>
      </Link>
    </div>
  );
}

export default MyButtonPolicy;
