import styles from './Notification.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import ReactSelect from 'react-select';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';
import { useNavigate } from 'react-router-dom';
import storage from '~/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import notifyAPI from '~/api/notify';
const cx = classNames.bind(styles);

function Notification() {
  const navigate = useNavigate();
  const options = [
    { value: 'Tất cả người dùng', label: 'Tất cả người dùng' },
    { value: 'Tất cả khách hàng', label: 'Tất cả khách hàng' },
    { value: 'Tất cả tài xế', label: 'Tất cả tài xế' },
    { value: 'Tài xế cụ thể', label: 'Tài xế cụ thể' },
    { value: 'Khách hàng cụ thể', label: 'Khách hàng cụ thể' },
  ];
  const optionNotify = [
    { value: 'Normal', label: 'Bình thường' },
    { value: 'Warning', label: 'Cảnh báo' },
    { value: 'Order', label: 'Đơn hàng' },
    // { value: 'Discount', label: 'Khuyến mãi' },
  ];
  const [valueOptionTypeReceiver, setValueOptionTypeReceiver] = useState(options[0]);
  const [valueOptionTypeNotify, setValueOptionTypeNotify] = useState(optionNotify[0]);
  const [imageChoose, setImageChoose] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [userReceive, setUserReceive] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setListImage([...listImage, ...imageChoose]);
  }, [imageChoose]);

  const handleRemove = (index) => {
    let listTemp = [...listImage];
    listTemp.splice(index, 1);
    setListImage(listTemp);
  };

  const uploadImage = async (imageFileList) => {
    const imagesUrlArray = [];
    for (let i = 0; i < imageFileList.length; i++) {
      const storageRef = ref(storage, uuid());
      const uploadTask = await uploadBytesResumable(storageRef, imageFileList[i]);
      const imageUrl = await getDownloadURL(storageRef);
      imagesUrlArray.push(imageUrl);
    }
    return imagesUrlArray;
  };

  const handleNotify = async () => {
    if (
      valueOptionTypeReceiver.value === 'Tài xế cụ thể' ||
      valueOptionTypeReceiver.value === 'Khách hàng cụ thể'
    ) {
      if (userReceive.trim() === '') {
        alert('Vui lòng nhập mã người dùng');
        return;
      }
    }
    if (title.trim() === '') {
      alert('Vui lòng nhập tiêu đề');
      return;
    }
    if (content.trim() === '') {
      alert('Vui lòng nhập nội dung');
      return;
    }

    const listURLImage = await uploadImage(listImage);

    let typeReceiver = '';
    if (valueOptionTypeReceiver.value == 'Tất cả người dùng') {
      typeReceiver = 'All';
    } else if (valueOptionTypeReceiver.value == 'Tất cả khách hàng') {
      typeReceiver = 'AllCustomer';
    } else if (valueOptionTypeReceiver.value == 'Tất cả tài xế') {
      typeReceiver = 'AllShipper';
    } else if (
      valueOptionTypeReceiver.value == 'Tài xế cụ thể' ||
      valueOptionTypeReceiver.value == 'Khách hàng cụ thể'
    ) {
      typeReceiver = 'Specific';
    }
    const dataSend = {
      title: title,
      content: content,
      image: listURLImage,
      type_notify: valueOptionTypeNotify.value,
      type_send: typeReceiver,
      id_handler: user._id,
    };
    if (valueOptionTypeReceiver.value === 'Tài xế cụ thể') {
      dataSend.id_receiver = userReceive;
      dataSend.userModel = 'Shipper';
    } else if (valueOptionTypeReceiver.value === 'Khách hàng cụ thể') {
      dataSend.id_receiver = userReceive;
      dataSend.userModel = 'Customer';
    }
    const res = await notifyAPI.post(dataSend);
    if (res.isNotFound) {
      alert(res.data + '');
      return;
    }
    alert('Gửi thông báo thành công');
    setUserReceive('');
    setTitle('');
    setContent('');
    setListImage([]);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inline-between')}>
        <div className={cx('title-header')}>Thông báo</div>
        <div className={cx('title-link')} onClick={() => navigate('/notification/history')}>
          Xem lịch sử thông báo &#62;&#62;
        </div>
      </div>
      <Form>
        <FormGroup>
          <Label>Gửi tới</Label>
          <ReactSelect
            defaultValue={options[0]}
            options={options}
            onChange={setValueOptionTypeReceiver}
          />
        </FormGroup>
        {valueOptionTypeReceiver.value === 'Tài xế cụ thể' ||
        valueOptionTypeReceiver.value === 'Khách hàng cụ thể' ? (
          <FormGroup>
            <Label>Mã người dùng</Label>
            <Input
              className={cx('input')}
              value={userReceive}
              onChange={(e) => setUserReceive(e.target.value)}
            />
          </FormGroup>
        ) : null}
        <FormGroup>
          <Label>Loại thông báo</Label>
          <ReactSelect
            defaultValue={optionNotify[0]}
            options={optionNotify}
            onChange={setValueOptionTypeNotify}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tiêu đề</Label>
          <Input className={cx('input')} value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Nội dung</Label>
          <Input
            type="textarea"
            className={cx('area')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
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
        <Button block color="primary" className={cx('button')} onClick={() => handleNotify()}>
          <h3>Gửi thông báo</h3>
        </Button>
      </Form>
    </div>
  );
}

export default Notification;
