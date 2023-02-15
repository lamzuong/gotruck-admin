import styles from './MyTableAccount.module.scss';
import { noAvatar } from '~/global/imagesLink';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const titleCustomer = ['Ảnh', 'ID', 'Họ tên', 'Số điện thoại', 'Tình trạng'];
const HeaderTableCustomer = () => (
  <thead>
    <tr>
      {titleCustomer.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTableCustomer = ({ user }) => {
  const navigate = useNavigate();
  const avatar = user.avatar ? user.avatar : noAvatar;
  return (
    <tr>
      <td>
        <img src={avatar} className={cx('avatar')} />
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.status}</td>
      <td className={cx('align-left')}>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/customer/${user.id}`, { state: user });
          }}
          className={cx('button-detail')}
        >
          <h4>Xem</h4>
        </Button>
        {user.status === 'Đã khóa' ? (
          <Button color="success" className={cx('button-block')}>
            <h4>Mở khóa</h4>
          </Button>
        ) : (
          <Button color="danger" className={cx('button-block')}>
            <h4>Khóa tài khoản</h4>
          </Button>
        )}
      </td>
    </tr>
  );
};
export { HeaderTableCustomer, BodyTableCustomer };

const titleShipper = [
  'Ảnh',
  'ID',
  'Họ tên',
  'Số điện thoại',
  'Hoạt động lần cuối',
  'Tình trạng',
  'Hành động',
];
const HeaderTableShipper = () => (
  <thead>
    <tr>
      {titleShipper.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTableShipper = ({ user }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>
        <img src={user.avatar} className={cx('avatar')} />
      </td>
      <td>{user.id}</td>
      <td>{user.phone}</td>
      <td>{user.name}</td>
      <td>{user.lastTime}</td>
      <td>{user.status}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/shipper/${user.id}`, { state: user });
          }}
          className={cx('button-detail')}
        >
          <h4>Xem</h4>
        </Button>
        {user.status === 'Đã khóa' ? (
          <Button color="success" className={cx('button-block')}>
            <h4>Mở khóa</h4>
          </Button>
        ) : (
          <Button color="danger" className={cx('button-block')}>
            <h4>Khóa tài khoản</h4>
          </Button>
        )}
      </td>
    </tr>
  );
};
export { HeaderTableShipper, BodyTableShipper };
