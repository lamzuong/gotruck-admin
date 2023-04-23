import styles from './MyButtonAdd.module.scss';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MyButtonAdd({ data, single }) {
  return (
    <div className={cx('wrapper')}>
      <label htmlFor="file-upload" className={cx('custom-file-input')}>
        <FontAwesomeIcon icon={faCirclePlus} color={'#04af46'} />
        <div className={cx('txtAdd')}>Thêm ảnh</div>
      </label>
      <input
        type="file"
        id="file-upload"
        multiple={single ? false : true}
        onChange={(e) => {
          data(e.target.files);
        }}
        accept=".png, .jpeg, .jpg"
      />
    </div>
  );
}

export default MyButtonAdd;
