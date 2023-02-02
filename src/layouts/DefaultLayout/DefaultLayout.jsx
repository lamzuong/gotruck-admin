import Header from '../components/Header/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer/Footer';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div>
        <Header />
        <div className={cx('container')}>
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
