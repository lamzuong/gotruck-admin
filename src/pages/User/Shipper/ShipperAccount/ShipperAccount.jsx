import styles from './ShipperAccount.module.scss';
import { convertMoney } from '~/global/functionGlobal';
import { formatDateFull } from '~/global/formatDateCustom';
import shipperAPI from '~/api/shipperAPI';
import customStyles from '~/pages/Order/OrderDetail/stylesModal';
import MyConfirm from '~/components/MyConfirm/MyConfirm';
import {
  BodyTableVehicle,
  HeaderTableVehicle,
} from '../../components/MyTableVehicle/MyTableVehicle';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Table } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import ReactModal from 'react-modal';
import notifyAPI from '~/api/notify';
import { socketClient } from '~/api/socket';

const cx = classNames.bind(styles);

function ShipperAccount() {
  const location = useLocation();

  const [item, setItem] = useState(location.state);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [showConfirm, setShowConfirm] = useState(false);
  const [txtConfirm, setTxtConfirm] = useState(false);
  const [money, setMoney] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageChoose, setImageChoose] = useState('');
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBlock = async () => {
    await shipperAPI.block(item.id_shipper);
    const dataSend = {
      title: item.block ? 'Thông báo mở khóa tài khoản' : 'Thông báo khóa tài khoản',
      content: item.block ? 'Tài khoản của bạn đã được mở khóa' : 'Tài khoản của bạn đã bị khóa',
      image: [],
      type_notify: 'Warning',
      type_send: 'Specific',
      id_handler: user._id,
      id_receiver: item.id_shipper,
      userModel: 'Shipper',
    };
    await notifyAPI.post(dataSend);
    socketClient.emit('block_account', { id_receive: item._id });

    setShowConfirm(false);
    const res = await shipperAPI.getShipperById(item.id_shipper);
    setItem(res);
  };

  const toggleConfirm = (block) => {
    setShowConfirm(!showConfirm);
    setTxtConfirm(
      block
        ? 'Bạn có chắc muốn khóa tài khoản này không ?'
        : 'Bạn muốn mở khóa tài khoản này đúng không ?',
    );
  };

  useEffect(() => {
    const getAllTruck = async () => {
      const res = await shipperAPI.getShipperById(item.id_shipper);
      if (!res.notFound) {
        setItem(res);
      }
    };
    getAllTruck();
  }, []);

  const handleRecharge = async () => {
    if (money <= 100000) {
      alert('Số tiền phải lớn hơn 100,000 vnđ');
    } else {
      const shipperSend = item;
      shipperSend.balance = Number(shipperSend.balance) + Number(money);
      const dataSend = {
        shipperSend: shipperSend,
        id_handler: user._id,
      };
      await shipperAPI.recharge(shipperSend.id_shipper, dataSend);
      setModal(false);
      const res = await shipperAPI.getShipperById(item.id_shipper);
      setItem(res);
    }
  };

  const renderStar = (star) => {
    let countStar = [];
    for (let index = 0; index < star; index++) {
      countStar.push(
        <label className={cx('content')}>
          <FontAwesomeIcon icon={faStar} color="yellow" />
        </label>,
      );
    }
    return countStar;
  };
  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      />
      <MyConfirm
        setShow={setShowConfirm}
        show={showConfirm}
        title={txtConfirm}
        action={handleBlock}
      />
      {/* Đoạn mở ảnh */}
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
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Mã tài xế:</div>
            <div>{item.id_shipper}</div>
          </div>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Số tiền nạp:</div>
            <CurrencyInput
              placeholder="0"
              maxLength={10}
              onValueChange={(value) => setMoney(value)}
              value={money}
              className={cx('input')}
            />
            <div style={{ marginLeft: 10 }}>VNĐ</div>
          </div>
          <Button
            className={cx('button-unblock')}
            style={{ marginLeft: 140, marginTop: 10 }}
            color="success"
            onClick={() => handleRecharge()}
          >
            Nạp tiền
          </Button>
        </div>
      </Modal>
      <div className={cx('display-flex')}>
        <img
          src={item.avatar}
          className={cx('avatar')}
          onClick={() => {
            openModal();
            setImageChoose(item.avatar);
          }}
        />
        <div className={cx('column')}>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Mã tài xế</label>
            <label className={cx('content')}>{item.id_shipper}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>CMND/CCCD</label>
            <label className={cx('content')}>{item.cmnd}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Email</label>
            <label className={cx('content')}>{item.email}</label>
          </div>
          <div className={cx('inline')}>
            <label className={cx('label-short')}>Địa chỉ</label>
            <label className={cx('content')} style={{ marginBottom: 20 }}>
              {item.address}
            </label>
          </div>
          {/* <div className={cx('inline')}>
            <label className={cx('label-medium')}>Hình ảnh giấy tờ</label>
            <label className={cx('view-image')} style={{ marginBottom: 20 }}>
              {item.imagePapers?.map((e, i) => (
                <img src={e} key={i} className={cx('image-paper')} />
              ))}
            </label>
          </div> */}
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-long')}>Đánh giá trung bình</label>
            {/* <label className={cx('content')}>{item.rateShipper}</label> */}
            {item.rateShipper ? renderStar(item.rateShipper) : 'Chưa có đánh giá'}
          </div>
          <div>
            <label className={cx('label-long')}>Số đơn hoàn thành</label>
            <label className={cx('content')}>{item.countCompleted || 0}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Số đơn hủy</label>
            <label className={cx('content')}>{item.countCancel || 0}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Số dư ví GoTruck</label>
            <label className={cx('content')}>{convertMoney(item.balance, 'VNĐ')}</label>
          </div>

          <div>
            <label className={cx('label-long')}>Ngày bắt đầu hoạt động</label>
            <label className={cx('content')}>{formatDateFull(item.createdAt)}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Lần cuối cùng hoạt động</label>
            <label className={cx('content')}>
              {item.last_active_date
                ? formatDateFull(item.last_active_date)
                : formatDateFull(item.updatedAt)}
            </label>
          </div>

          <div className={cx('view-button')}>
            {item.block ? (
              <Button
                className={cx('button-unblock')}
                color="success"
                onClick={() => toggleConfirm(false)}
              >
                Mở khóa tài khoản
              </Button>
            ) : (
              <>
                <Button className={cx('button-unblock')} color="success" onClick={toggle}>
                  Nạp tiền
                </Button>
                <Button
                  className={cx('button-block')}
                  color="danger"
                  onClick={() => toggleConfirm(true)}
                >
                  Khóa tài khoản
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className={cx('label-nor')}>Danh sách phương tiện của shipper</label>
        <Table striped>
          <HeaderTableVehicle />
          <tbody>
            {item.infoAllTruck?.map((e, i) => (
              <BodyTableVehicle
                item={e}
                key={i}
                setImageChoose={setImageChoose}
                openModal={openModal}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ShipperAccount;
