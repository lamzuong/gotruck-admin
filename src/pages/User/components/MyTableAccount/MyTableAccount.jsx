import styles from './MyTableAccount.module.scss';
import { noAvatar } from '~/global/imagesLink';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { convertMoney } from '~/global/functionGlobal';

const cx = classNames.bind(styles);

const titleCustomer = ['Ảnh', 'ID', 'Họ tên', 'Số điện thoại', 'Tình trạng', 'Hành động'];
const HeaderTableCustomer = () => (
  <thead>
    <tr>
      {titleCustomer.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTableCustomer = ({
  user,
  show = false,
  setShow = () => {},
  setText = () => {},
  setUser = () => {},
}) => {
  const [showConfirm, setShowConfirm] = useState(show);

  const toggle = (block) => {
    setShowConfirm(!showConfirm);
    setShow(!showConfirm);
    setText(
      block
        ? 'Bạn có chắc muốn khóa tài khoản này không ?'
        : 'Bạn muốn mở khóa tài khoản này đúng không ?',
    );
    setUser(user);
  };
  useEffect(() => {
    setShowConfirm(show);
    setShow(show);
  }, [show]);

  const navigate = useNavigate();
  const avatar = user.avatar ? user.avatar : noAvatar;

  return (
    <tr>
      <td>
        <img src={avatar} className={cx('avatar')} />
      </td>
      <td>{user.id_cus}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.block ? 'Đã khóa' : 'Đang hoạt động'}</td>
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
        {user.block ? (
          <Button color="success" className={cx('button-block')} onClick={() => toggle(false)}>
            <h4>Mở khóa</h4>
          </Button>
        ) : (
          <Button color="danger" className={cx('button-block')} onClick={() => toggle(true)}>
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
  'Hoạt động lần cuối',
  'Số dư GoTruck',
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
const BodyTableShipper = ({
  user,
  handleInputMoney,
  show = false,
  setShow = () => {},
  setText = () => {},
  setUser = () => {},
}) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(show);

  const toggle = (block) => {
    setShowConfirm(!showConfirm);
    setShow(!showConfirm);
    setText(
      block
        ? 'Bạn có chắc muốn khóa tài khoản này không ?'
        : 'Bạn muốn mở khóa tài khoản này đúng không ?',
    );
    setUser(user);
  };
  useEffect(() => {
    setShowConfirm(show);
    setShow(show);
  }, [show]);

  return (
    <tr>
      <td>
        <img src={user.avatar} className={cx('avatar')} />
      </td>
      <td>{user.id_shipper}</td>
      <td>{user.name}</td>
      <td>{user.lastTime}</td>
      <td>{convertMoney(user.balance, ' đ')}</td>
      <td>{user.block ? 'Đã khóa' : 'Đang hoạt động'}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/shipper/${user.id_shipper}`, { state: user });
          }}
          className={cx('button-detail')}
        >
          <h4>Xem</h4>
        </Button>
        {user.block ? (
          <Button color="success" className={cx('button-block')} onClick={() => toggle(false)}>
            <h4>Mở khóa</h4>
          </Button>
        ) : (
          <>
            <Button color="danger" className={cx('button-block')} onClick={() => toggle(true)}>
              <h4>Khóa tài khoản</h4>
            </Button>
            <Button
              color="primary"
              onClick={() => handleInputMoney(user)}
              className={cx('button-pay')}
            >
              <h4>Nạp tiền</h4>
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};
export { HeaderTableShipper, BodyTableShipper };
