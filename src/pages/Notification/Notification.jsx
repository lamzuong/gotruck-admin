import styles from './Notification.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import ReactSelect from 'react-select';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';

const cx = classNames.bind(styles);

function Notification() {
  const options = [
    { value: 'Tất cả người dùng', label: 'Tất cả người dùng' },
    { value: 'Tất cả khách hàng', label: 'Tất cả khách hàng' },
    { value: 'Tất cả tài xế', label: 'Tất cả tài xế' },
    { value: 'Người dùng cụ thể', label: 'Người dùng cụ thể' },
  ];
  const [valueOption, setValueOption] = useState(options[0]);
  const [imageChoose, setImageChoose] = useState([]);
  const [listImage, setListImage] = useState([]);

  useEffect(() => {
    setListImage([...listImage, ...imageChoose]);
  }, [imageChoose]);

  const handleRemove = (index) => {
    let listTemp = [...listImage];
    listTemp.splice(index, 1);
    setListImage(listTemp);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title-header')}>Thông báo</div>
      <Form>
        <FormGroup>
          <Label>Gửi tới</Label>
          <ReactSelect defaultValue={options[0]} options={options} onChange={setValueOption} />
        </FormGroup>
        {valueOption.value === 'Người dùng cụ thể' && (
          <FormGroup>
            <Label>Mã người dùng</Label>
            <Input className={cx('input')} />
          </FormGroup>
        )}
        <FormGroup>
          <Label>Tiêu đề</Label>
          <Input className={cx('input')} />
        </FormGroup>
        <FormGroup>
          <Label>Nội dung</Label>
          <Input type="textarea" className={cx('area')} />
        </FormGroup>
        <FormGroup>
          <Label>Hình ảnh</Label>
          <div className={cx('view-images')}>
            {Array.from(listImage).map((e, i) => (
              <div style={{ display: 'flex' }} key={i}>
                <img src={URL.createObjectURL(e)} alt="" className={cx('image')} />
                <img
                  src={require('~/assets/images/close.png')}
                  className={cx('icon-remove')}
                  onClick={() => handleRemove(i)}
                />
              </div>
            ))}
            <MyButtonAdd data={setImageChoose} />
          </div>
        </FormGroup>
        <Button block color="primary" className={cx('button')}>
          <h3>Gửi thông báo</h3>
        </Button>
      </Form>
    </div>
  );
}

export default Notification;
