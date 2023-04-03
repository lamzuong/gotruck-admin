import styles from './Login.module.scss';
import React, { useState } from 'react';

import classNames from 'classnames/bind';
import MyInput from '~/components/MyInput/MyInput';
import MyButton from '~/components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import loginAPI from '~/api/userAPI';
import { logInSuccess } from '~/app/authSlide';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(false);

  const handleLogin = async () => {
    const res = await loginAPI.login({
      username,
      password,
    });
    if (res === '000') {
      setFailed(true);
      return;
    } else {
      dispatch(logInSuccess(res));
      setFailed(false);
      navigate('/earning');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <img src={require('~/assets/images/background_signin.png')} className={cx('background')} />
      <div className={cx('wrapper-login')}>
        <label className={cx('label-signin')}>
          <img src={require('~/assets/images/logo-name-green.png')} />
        </label>
        <MyInput placeholder={'Tài khoản'} data={setUsername} initValue={username} />
        <MyInput type="password" placeholder={'Mật khẩu'} data={setPassword} initValue={password} />
        {failed && <div className={cx('error-mess')}>Tài khoản hoặc mật khẩu không đúng !!</div>}
        <MyButton
          title={'ĐĂNG NHẬP'}
          className={cx('button')}
          classNameText={cx('txt-button')}
          action={handleLogin}
        />
      </div>
    </div>
  );
}

export default Login;
