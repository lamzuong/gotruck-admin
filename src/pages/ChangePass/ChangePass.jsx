import styles from './ChangePass.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import { Button, Input, Label } from 'reactstrap';

const cx = classNames.bind(styles);

function ChangePass() {
  return (
    <div>
      <div className={cx('inline')}>
        <Label className={cx('label')}>Mật khẩu cũ</Label>
        <Input className={cx('input')} type="password" />
      </div>

      <div className={cx('inline')}>
        <Label className={cx('label')}>Mật khẩu mới</Label>
        <Input className={cx('input')} type="password" />
      </div>

      <div className={cx('inline')}>
        <Label className={cx('label')}>Nhập lại mật khẩu mới</Label>
        <Input className={cx('input')} type="password" />
      </div>

      <Button className={cx('button')} color="primary" block>
        <h4>Xác nhận</h4>
      </Button>
    </div>
  );
}

export default ChangePass;
