import Header from '../components/Header/Header';
import styles from './OnlyHeaderLayout.module.scss';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function OnlyHeaderLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div>
        <Header />
        <div className={cx('container')}>
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </div>
  );
}

OnlyHeaderLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OnlyHeaderLayout;
