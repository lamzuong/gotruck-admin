import styles from './CustomerAccount.module.scss';
import { noAvatar } from '~/global/imagesLink';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import MyConfirm from '~/components/MyConfirm/MyConfirm';
import { useEffect, useState } from 'react';
import customerAPI from '~/api/customerAPI';
import { formatDateFull } from '~/global/formatDateCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import customStyles from '~/pages/Order/OrderDetail/stylesModal';
import notifyAPI from '~/api/notify';
import { useSelector } from 'react-redux';
import { socketClient } from '~/api/socket';

const cx = classNames.bind(styles);

function CustomerAccount() {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();
  const navigate = useNavigate();

  const [item, setItem] = useState(location.state);
  const [showConfirm, setShowConfirm] = useState(false);
  const [txtConfirm, setTxtConfirm] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageChoose, setImageChoose] = useState('');
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBlock = async () => {
    await customerAPI.block(item.id_cus);
    const dataSend = {
      title: item.block ? 'Thông báo mở khóa tài khoản' : 'Thông báo khóa tài khoản',
      content: item.block ? 'Tài khoản của bạn đã được mở khóa' : 'Tài khoản của bạn đã bị khóa',
      image: [],
      type_notify: 'Warning',
      type_send: 'Specific',
      id_handler: user._id,
      id_receiver: item.id_cus,
      userModel: 'Customer',
    };
    await notifyAPI.post(dataSend);
    socketClient.emit('block_account', { id_receive: item._id });

    setShowConfirm(false);
    const res = await customerAPI.getCusById(item.id_cus);
    setItem(res);
  };
  const toggle = (block) => {
    setShowConfirm(!showConfirm);
    setTxtConfirm(
      block
        ? 'Bạn có chắc muốn khóa tài khoản này không ?'
        : 'Bạn muốn mở khóa tài khoản này đúng không ?',
    );
  };

  useEffect(() => {
    const getInfoCus = async () => {
      const res = await customerAPI.getCusById(item.id_cus);
      setItem(res);
    };
    getInfoCus();
  }, []);

  return (
    <div className={cx('wrapper')}>
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
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        style={{ fontSize: '150%', cursor: 'pointer', marginBottom: 10 }}
        onClick={() => navigate(-1)}
      />
      <MyConfirm
        setShow={setShowConfirm}
        show={showConfirm}
        title={txtConfirm}
        action={handleBlock}
      />
      <div className={cx('display-flex')}>
        <img
          src={item.avatar || noAvatar}
          className={cx('avatar')}
          onClick={() => {
            openModal();
            setImageChoose(item.avatar);
          }}
        />
        <div className={cx('column')}>
          <div>
            <label className={cx('label-short')}>Mã khách hàng</label>
            <label className={cx('content')}>{item.id_cus}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Họ tên</label>
            <label className={cx('content')}>{item.name}</label>
          </div>
          <div>
            <label className={cx('label-short')}>Điện thoại</label>
            <label className={cx('content')}>{item.phone}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Ngày bắt đầu hoạt động</label>
            <label className={cx('content')}>{formatDateFull(item.createdAt)}</label>
          </div>
          <div>
            <label className={cx('label-long')}>Hoạt động lần cuối</label>
            <label className={cx('content')}>
              {item.last_active_date
                ? formatDateFull(item.last_active_date)
                : formatDateFull(item.updatedAt)}
            </label>
          </div>
        </div>
        <div className={cx('column')}>
          <div>
            <label className={cx('label-long')}>Số đơn hoàn thành</label>
            <label className={cx('content')}>{item.countCompleted}</label>
          </div>
          {/* <div>
            <label className={cx('label-long')}>Số đơn không hoàn thành</label>
            <label className={cx('content')}>{item.boomOrder}</label>
          </div> */}
          <div>
            <label className={cx('label-long')}>Số đơn hủy</label>
            <label className={cx('content')}>{item.countCancel}</label>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 180 }}>
        <label className={cx('label-long')}>
          {item.block ? (
            <Button className={cx('button-unblock')} color="success" onClick={() => toggle(false)}>
              Mở khóa tài khoản
            </Button>
          ) : (
            <Button className={cx('button-block')} color="danger" onClick={() => toggle(true)}>
              Khóa tài khoản
            </Button>
          )}
        </label>
        {/* <label className={cx('content')}>
          <Button
            className={cx('button-custom')}
            color="success"
            onClick={() => {
              navigate(`/order/shipper/${item.id}`, { state: item });
            }}
          >
            Xem danh sách đơn hàng
          </Button>
        </label> */}
      </div>
    </div>
  );
}

export default CustomerAccount;
