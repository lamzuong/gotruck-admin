import Header from '../components/Header/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer/Footer';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar/Sidebar';
import Header2 from '../components/Header2/Header2';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <ToastContainer />
      <div className={cx('container')}>
        <aside className={cx('left-wrapper')}>
          <Sidebar />
        </aside>
        <div className={cx('right-wrapper')}>
          <Header2 />
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
