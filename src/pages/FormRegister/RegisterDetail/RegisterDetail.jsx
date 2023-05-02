import styles from './RegisterDetail.module.scss';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Input, Modal } from 'reactstrap';
import { formatDateFull } from '~/global/formatDateCustom';
import formRegisterAPI from '~/api/formRegister';
import { useSelector } from 'react-redux';
import { faArrowLeftLong, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import customStyles from '~/pages/Order/OrderDetail/stylesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';

const cx = classNames.bind(styles);

function RegisterDetail() {
  const location = useLocation();
  const item = location.state;

  const [inputReason, setInputReason] = useState('');
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageChoose, setImageChoose] = useState('');

  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAccept = async () => {
    await formRegisterAPI.put({ data: item, id_handler: user._id, type: 'accept' });
    navigate('/form-register');
  };

  const handleDenied = async () => {
    const dataSend = item;
    dataSend.reason_cancel = inputReason;
    await formRegisterAPI.put({ data: dataSend, id_handler: user._id, type: 'denied' });
    setModal(false);
    navigate('/form-register');
  };

  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Nhập lý do từ chối</div>
          <Input
            onChange={(e) => setInputReason(e.target.value)}
            value={inputReason}
            bgsize="lg"
            className={cx('input')}
          />
          <Button
            block
            color="primary"
            className={cx('button')}
            size="lg"
            onClick={() => handleDenied()}
          >
            <h4>Xác nhận</h4>
          </Button>
        </div>
      </Modal>
      <ReactModal isOpen={modalIsOpen} toggle={closeModal} style={customStyles}>
        <div className={cx('cover-img')}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={'white'}
            size={'2x'}
            className={cx('icon-close')}
            onClick={closeModal}
          />
          <img src={imageChoose} className={cx('show-img')} />
        </div>
      </ReactModal>
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin cá nhân</h1>
          <div>
            <label className={cx('label-short')}>Mã đơn</label>
            <label className={cx('content')}>{item.id_form}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Email</label>
            <label className={cx('content')}>{item.email}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          <div>
            <label className={cx('label-short')}>CMND/CCCD</label>
            <label className={cx('content')}>{item.cmnd}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Thời gian gửi</label>
            <label className={cx('content')}>{formatDateFull(item.createdAt)}</label>
          </div>
          {item.status !== 'Chưa duyệt' && (
            <>
              <h1 style={{ marginBottom: 20 }}>Thông tin xử lý</h1>
              <div>
                <label className={cx('label-short')}>Người xử lý</label>
                <label className={cx('content')}>{item.id_handler.fullname}</label>
              </div>
              <div>
                <label className={cx('label-short')}>Trạng thái</label>
                <label className={cx('content')}>{item.status}</label>
              </div>
              {item.approval_date && (
                <div>
                  <label className={cx('label-short')}>Thời gian xử lý</label>
                  <label className={cx('content')}>{formatDateFull(item.approval_date)}</label>
                </div>
              )}
            </>
          )}
          {item.status === 'Từ chối' && (
            <div>
              <label className={cx('label-short')}>Lý do từ chối</label>
              <label className={cx('content')}>{item.reason_cancel}</label>
            </div>
          )}
        </div>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin phương tiện</h1>
          <div>
            <label className={cx('label-short')}>Tên xe</label>
            <label className={cx('content')}>{item.name_truck}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Trọng tải</label>
            <label className={cx('content')}>Xe {item.type_truck.name} tấn</label>
          </div>
          <div>
            <label className={cx('label-short')}>Số xe</label>
            <label className={cx('content')}>{item.license_plate}</label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-long')}>Hình ảnh khuôn mặt</label>
            <label className={cx('view-image')}>
              <img
                src={item.avatar}
                className={cx('image-paper')}
                alt="avatar"
                onClick={() => {
                  openModal();
                  setImageChoose(item.avatar);
                }}
              />
            </label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-long')}>Hình ảnh giấy tờ</label>
            <label className={cx('view-image')}>
              {item.list_vehicle_registration.map((e, i) => (
                <img
                  src={e}
                  key={i}
                  className={cx('image-paper')}
                  alt={e}
                  onClick={() => {
                    openModal();
                    setImageChoose(e);
                  }}
                />
              ))}
            </label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-long')}>Hình ảnh xe</label>
            <label className={cx('view-image')}>
              {item.list_image_info.map((e, i) => (
                <img
                  src={e}
                  key={i}
                  className={cx('image-paper')}
                  alt={e}
                  onClick={() => {
                    openModal();
                    setImageChoose(e);
                  }}
                />
              ))}
            </label>
          </div>
          {/* {item.status === 'Từ chối' ? (
            <div>
              <label className={cx('label-short')}>Lý do từ chối</label>
              <label className={cx('content')}>{item.reason}</label>
            </div>
          ) : null} */}
          {item.status === 'Chưa duyệt' ? (
            <div className={cx('wrapper-button')}>
              <Button
                className={cx('button-unblock')}
                color="success"
                onClick={() => handleAccept()}
              >
                Chấp thuận và cấp tài khoản
              </Button>
              <Button className={cx('button-block')} color="danger" onClick={toggle}>
                Từ chối đơn
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RegisterDetail;
