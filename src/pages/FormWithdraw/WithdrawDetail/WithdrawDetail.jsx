import styles from './WithdrawDetail.module.scss';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Modal } from 'reactstrap';
import { convertMoney } from '~/global/functionGlobal';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { formatDateFull } from '~/global/formatDateCustom';
import { useSelector } from 'react-redux';
import storage from '~/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import uuid from 'react-uuid';
import formWithDrawAPI from '~/api/formWithDraw';
import ReactModal from 'react-modal';
import customStyles from '~/pages/Order/OrderDetail/stylesModal';

const cx = classNames.bind(styles);

function WithdrawDetail() {
  const location = useLocation();
  const item = location.state;

  const [imagePay, setImagePay] = useState(null);
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageChoose, setImageChoose] = useState('');
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, uuid());
    await uploadBytesResumable(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const handleConfirm = async () => {
    if (!imagePay) {
      alert('Chưa có ảnh minh chứng nạp tiền');
      return;
    }
    let image_proof = await uploadImage(imagePay[0]);
    const dataSend = item;
    dataSend.status = 'Đã xử lý';
    dataSend.id_handler = user._id;
    dataSend.image_proof = image_proof;
    await formWithDrawAPI.put(dataSend);
    toggle();
    navigate('/form-withdraw');
  };

  return (
    <div className={cx('wrapper')}>
      <ReactModal isOpen={modalIsOpen} toggle={closeModal} style={customStyles}>
        <div className={cx('cover-img')}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={'black'}
            size={'2x'}
            className={cx('icon-close')}
            onClick={closeModal}
          />
          <img src={imageChoose} className={cx('show-img')} />
        </div>
      </ReactModal>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Ảnh minh chứng nạp tiền (1 ảnh):</div>
          {imagePay === null ? (
            <MyButtonAdd data={setImagePay} single={true} />
          ) : (
            <div>
              <img
                src={imagePay !== null && window.URL.createObjectURL(imagePay[0])}
                className={cx('img')}
                alt="proof"
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={cx('icon-del')}
                onClick={() => setImagePay(null)}
              />
            </div>
          )}
          <input type={'file'} />
          <Button
            block
            color="primary"
            className={cx('button')}
            size="lg"
            onClick={() => handleConfirm()}
          >
            <h4>Xác nhận</h4>
          </Button>
        </div>
      </Modal>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <img
            src={item.id_shipper.avatar}
            className={cx('avatar')}
            alt="avatar"
            onClick={() => {
              openModal();
              setImageChoose(item.id_shipper.avatar);
            }}
          />
        </div>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin cá nhân</h1>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id_transaction_history}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Mã người gửi</label>
            <label className={cx('content')}>{item.id_shipper.id_shipper}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Tên người gửi</label>
            <label className={cx('content')}>{item.id_shipper.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Tên ngân hàng</label>
            <label className={cx('content')}>{item.id_bank.name_full}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Tên chủ tài khoản</label>
            <label className={cx('content')}>{item.account_name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Số tài khoản</label>
            <label className={cx('content')}>{item.account_number}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Số tiền cần rút</label>
            <label className={cx('content')}>{convertMoney(item.money, 'đ')}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Thời gian gửi</label>
            <label className={cx('content')}>{formatDateFull(item.createdAt)}</label>
          </div>
          {item.status === 'Đã xử lý' && (
            <div>
              <label className={cx('label-short')}>Người xử lý</label>
              <label className={cx('content')}>{item.id_handler.fullname}</label>
            </div>
          )}
          {item.status === 'Đã xử lý' && item.approval_date && (
            <div>
              <label className={cx('label-short')}>Thời gian xử lý</label>
              <label className={cx('content')}>{formatDateFull(item.approval_date)}</label>
            </div>
          )}
          {item.status === 'Đã xử lý' && item.image_proof && (
            <div>
              <label className={cx('label-short')}>Hình ảnh nạp tiền</label>
              <label className={cx('content')}>
                <img src={item.image_proof} className={cx('img')} alt="image_proof" />
              </label>
            </div>
          )}
          {item.status === 'Đang xử lý' ? (
            <div className={cx('wrapper-button')}>
              <Button className={cx('button-unblock')} color="success" onClick={toggle}>
                Xác nhận xử lý xong
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WithdrawDetail;
