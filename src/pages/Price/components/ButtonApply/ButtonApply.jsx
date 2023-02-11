import styles from './ButtonApply.module.scss';

import classNames from 'classnames/bind';
import { Button } from 'reactstrap';

const cx = classNames.bind(styles);

const ButtonApply = ({ onClick = () => {} }) => {
  return (
    <div className={cx('wrapper-apply')}>
      <Button className={cx('button-apply')} onClick={onClick}>
        <div className={cx('txt-apply')}>ÁP DỤNG</div>
      </Button>
    </div>
  );
};

export default ButtonApply;
