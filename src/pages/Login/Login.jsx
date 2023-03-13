import styles from './Login.module.scss';
import React from 'react';

import classNames from 'classnames/bind';
import MyInput from '~/components/MyInput/MyInput';
import MyButton from '~/components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  return (
    <div className={cx('wrapper')}>
      <img src={require('~/assets/images/background_signin.png')} className={cx('background')} />
      <div className={cx('wrapper-login')}>
        <label className={cx('label-signin')}>
          <img src={require('~/assets/images/logo-name-green.png')} />
        </label>
        <MyInput placeholder={'Tài khoản'} />
        <MyInput placeholder={'Mật khẩu'} />
        <MyButton
          title={'ĐĂNG NHẬP'}
          className={cx('button')}
          classNameText={cx('txt-button')}
          action={() => navigate('/earning')}
        />
      </div>
    </div>
  );
}

export default Login;
