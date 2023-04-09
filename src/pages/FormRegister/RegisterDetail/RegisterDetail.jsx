import styles from './RegisterDetail.module.scss';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Input, Modal } from 'reactstrap';
import { formatDateFull } from '~/global/formatDateCustom';
import formAPI from '~/api/form';

const cx = classNames.bind(styles);

function RegisterDetail() {
  const location = useLocation();
  const item = location.state;

  const [inputReason, setInputReason] = useState('');
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const handleAccept = async () => {
    const dataSend = item;
    dataSend.status = 'Đã duyệt';
    await formAPI.putFormRegister({ data: item, type: 'accept' });
    navigate('/form-register');
  };

  const handleDenied = async () => {
    const dataSend = item;
    dataSend.status = 'Từ chối';
    dataSend.reason_cancel = inputReason;
    await formAPI.putFormRegister({ data: item, type: 'denied' });
    setModal(false);
    navigate('/form-register');
  };
  return (
    <div className={cx('wrapper')}>
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
      <div className={cx('display-flex')}>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin cá nhân</h1>
          <div>
            <label className={cx('label-short')}>Mã tài xế</label>
            <label className={cx('content')}>{item.id_shipper}</label>
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
        </div>
        <div className={cx('column')}>
          <h1 style={{ marginBottom: 20 }}>Thông tin phương tiện</h1>
          <div>
            <label className={cx('label-short')}>Tên xe</label>
            <label className={cx('content')}>{item.typeTruck.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Trọng tải</label>
            <label className={cx('content')}>Xe {item.typeTruck.type_truck.name} tấn</label>
          </div>
          <div>
            <label className={cx('label-short')}>Số xe</label>
            <label className={cx('content')}>{item.typeTruck.license_plate}</label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-long')}>Hình ảnh khuôn mặt</label>
            <label className={cx('view-image')}>
              <img src={item.avatar} className={cx('image-paper')} alt="avatar" />
            </label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-long')}>Hình ảnh giấy tờ</label>
            <label className={cx('view-image')}>
              {item.typeTruck.list_vehicle_registration.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} alt={e} />
              ))}
            </label>
          </div>
          <div className={cx('display-flex')}>
            <label className={cx('label-long')}>Hình ảnh xe</label>
            <label className={cx('view-image')}>
              {item.typeTruck.list_image_info.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} alt={e} />
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
