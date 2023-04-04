import styles from './ChangePass.module.scss';
import { AlertContext } from '~/context/AlertContext';
import loginAPI from '~/api/userAPI';

import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ChangePass() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const ctx = useContext(AlertContext);
  const useMessage = ctx.Message();

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');
  const [invalid, setInvalid] = useState([false, false, false]);

  const checkOldPass = async () => {
    const res = await loginAPI.login({ username: user.username, password: oldPass });
    if (res === '000') return false;
    else return true;
  };
  const checkNewPass = () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regex.test(newPass);
  };
  const checkRePass = () => {
    return newPass === reNewPass;
  };
  const handleChange = async () => {
    if (!(await checkOldPass()) || !checkNewPass() || !checkRePass()) {
      setInvalid([!(await checkOldPass()), !checkNewPass(), !checkRePass()]);
    } else {
      await loginAPI.changePass({ id: user._id, password: newPass });
      useMessage?.success('Đổi mật khẩu thành công!', true, 1500);
      navigate(-1);
    }
  };
  return (
    <div>
      <FormGroup className={cx('inline')}>
        <Label className={cx('label')}>Mật khẩu cũ</Label>
        <div className={cx('w-100')}>
          <Input
            className={cx('input')}
            type="password"
            onChange={(e) => setOldPass(e.target.value)}
            value={oldPass}
            invalid={invalid[0]}
          />
          <FormFeedback>Mật khẩu cũ không đúng</FormFeedback>
        </div>
      </FormGroup>

      <FormGroup className={cx('inline')}>
        <Label className={cx('label')}>Mật khẩu mới</Label>
        <div className={cx('w-100')}>
          <Input
            className={cx('input')}
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
            value={newPass}
            invalid={invalid[1]}
          />
          <FormFeedback>Mật khẩu mới cần đủ 8 ký tự gồm chữ hoa, chữ thường và số</FormFeedback>
        </div>
      </FormGroup>

      <FormGroup className={cx('inline')}>
        <Label className={cx('label')}>Nhập lại mật khẩu mới</Label>
        <div className={cx('w-100')}>
          <Input
            className={cx('input')}
            type="password"
            onChange={(e) => setReNewPass(e.target.value)}
            value={reNewPass}
            invalid={invalid[2]}
          />
          <FormFeedback>Nhập lại mật khẩu không trùng khớp với mật khẩu mới</FormFeedback>
        </div>
      </FormGroup>

      <Button className={cx('button')} color="primary" block onClick={handleChange}>
        <h4>Xác nhận</h4>
      </Button>
    </div>
  );
}

export default ChangePass;
