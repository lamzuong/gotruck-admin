import styles from './MyButton.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MyButton({ action, title, className, classNameText }) {
  return (
    <div className={cx('wrapper')}>
      <button className={className || cx('my-button')} onClick={action}>
        <div className={classNameText || cx('txt-button')}>{title}</div>
      </button>
    </div>
  );
}

export default MyButton;
