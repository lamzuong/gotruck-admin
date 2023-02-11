import styles from './MyTab.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MyTab = ({ tab, nameTab1, nameTab2, onClick1 = () => {}, onClick2 = () => {} }) => {
  return (
    <div className={cx('tab')}>
      <div className={tab === nameTab1 ? cx('tab-choose') : cx('tab-nochoose')} onClick={onClick1}>
        VNĐ
      </div>
      <div className={tab === nameTab2 ? cx('tab-choose') : cx('tab-nochoose')} onClick={onClick2}>
        %
      </div>
    </div>
  );
};

export { MyTab };
