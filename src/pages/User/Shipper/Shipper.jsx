import styles from './Shipper.module.scss';
import {
  BodyTableShipper,
  HeaderTableShipper,
} from '~/pages/User/components/MyTableAccount/MyTableAccount';
import shipperAPI from '~/api/shipperAPI';
import MyInput from '~/components/MyInput/MyInput';
import MyPagination from '~/components/MyPagination/MyPagination';

import classNames from 'classnames/bind';
import { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import useDebounce from '~/hook/useDebounce';
import MyConfirm from '~/components/MyConfirm/MyConfirm';
import { useSelector } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import customStyles from '~/pages/Order/OrderDetail/stylesModal';
import ReactModal from 'react-modal';
import notifyAPI from '~/api/notify';
import { socketClient } from '~/api/socket';

const cx = classNames.bind(styles);

function Customer() {
  const [userInputMoney, setUserInputMoney] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleInputMoney = (user) => {
    setUserInputMoney(user);
    toggle();
  };

  const status = ['Tất cả', 'Đang hoạt động', 'Đã khóa'];

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');
  const [rerender, setRerender] = useState(false);

  const [shippers, setShippers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [txtConfirm, setTxtConfirm] = useState(false);
  const [userConfirm, setUserConfirm] = useState(null);
  const [money, setMoney] = useState('');
  const user = useSelector((state) => state.auth.user);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageChoose, setImageChoose] = useState('');
  const closeModal = () => setIsOpen(false);

  const handleRecharge = async () => {
    if (+money <= 100000) {
      alert('Số tiền phải lớn hơn 100,000 vnđ');
    } else {
      const shipperSend = userInputMoney;
      shipperSend.balance = Number(shipperSend.balance) + Number(money);
      const dataSend = {
        shipperSend: shipperSend,
        id_handler: user._id,
      };
      await shipperAPI.recharge(shipperSend.id_shipper, dataSend);

      setModal(false);
      const res = await shipperAPI.getShipperById(shipperSend.id_shipper);
      setRerender(!rerender);
    }
  };

  useEffect(() => {
    const getShipper = async () => {
      try {
        const total = await shipperAPI.getByNoPage({
          status: tab,
        });
        setTotalItems(total);
        const res = await shipperAPI.getByPage({
          limit: 10,
          page: page,
          status: tab,
        });
        setShippers(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchValue === '') getShipper();
  }, [tab, page, rerender]);

  const debouncedShipperId = useDebounce(searchValue, 200);

  useEffect(() => {
    if (!debouncedShipperId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const res = await shipperAPI.searchNoPage({
        idShipper: debouncedShipperId.toUpperCase(),
      });
      setTotalItems(res);

      const result = await shipperAPI.search({
        page: page,
        limit: 10,
        idShipper: debouncedShipperId.toUpperCase(),
      });

      setSearchResult(result);
      if (debouncedShipperId === '') {
        setSearchResult([]);
      }
    };

    fetchApi();
  }, [debouncedShipperId, page, shippers]);

  const changeTab = (tab) => {
    setPage(1);
    setTab(tab);
  };

  const handleBlock = async () => {
    await shipperAPI.block(userConfirm.id_shipper);
    const dataSend = {
      title: userConfirm.block ? 'Thông báo mở khóa tài khoản' : 'Thông báo khóa tài khoản',
      content: userConfirm.block
        ? 'Tài khoản của bạn đã được mở khóa'
        : 'Tài khoản của bạn đã bị khóa',
      image: [],
      type_notify: 'Warning',
      type_send: 'Specific',
      id_handler: user._id,
      id_receiver: userConfirm.id_shipper,
      userModel: 'Shipper',
    };
    await notifyAPI.post(dataSend);
    socketClient.emit('block_account', { id_receive: userConfirm._id });
    setShowConfirm(false);
    setRerender(!rerender);
  };

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
      <MyConfirm
        setShow={setShowConfirm}
        show={showConfirm}
        title={txtConfirm}
        action={handleBlock}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Mã tài xế:</div>
            <div>{userInputMoney.id_shipper}</div>
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
            <h4>Nạp tiền</h4>
          </Button>
        </div>
      </Modal>
      {/*  */}
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu ID</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>
      {/* Search result */}
      {searchValue !== '' ? (
        searchResult.length > 0 ? (
          <Table striped className={cx('table-order')}>
            <HeaderTableShipper />
            <tbody>
              {searchResult.map((e, i) => (
                <BodyTableShipper
                  user={e}
                  handleInputMoney={handleInputMoney}
                  key={i}
                  show={showConfirm}
                  setShow={setShowConfirm}
                  setText={setTxtConfirm}
                  setUser={setUserConfirm}
                  setImageChoose={setImageChoose}
                  showAvatar={modalIsOpen}
                  setShowAvatar={setIsOpen}
                />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Không có tài xế nào phù hợp</div>
        )
      ) : (
        <>
          {/* Tab order */}
          <Nav tabs>
            {status.map((e, i) => (
              <NavItem key={i} className={cx('tabs')}>
                <NavLink className={tab === e ? 'active' : ''} onClick={() => changeTab(e)}>
                  <div className={tab === e ? cx('choose-tab') : cx('no-choose-tab')}>{e}</div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={tab}>
            {status.map((status, i) => (
              <TabPane tabId={status} key={i}>
                <Table striped className={cx('table-order')}>
                  <HeaderTableShipper />
                  <tbody>
                    {shippers.map((e, i) => (
                      <BodyTableShipper
                        user={e}
                        handleInputMoney={handleInputMoney}
                        key={i}
                        show={showConfirm}
                        setShow={setShowConfirm}
                        setText={setTxtConfirm}
                        setUser={setUserConfirm}
                        setImageChoose={setImageChoose}
                        showAvatar={modalIsOpen}
                        setShowAvatar={setIsOpen}
                      />
                    ))}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </>
      )}
      {/* Page */}
      <MyPagination setPage={setPage} page={page} totalItems={totalItems.length} />
    </div>
  );
}

export default Customer;
