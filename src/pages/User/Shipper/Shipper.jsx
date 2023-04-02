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
import { Input, Modal, Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import useDebounce from '~/hook/useDebounce';
import MyConfirm from '~/components/MyConfirm/MyConfirm';

const cx = classNames.bind(styles);

function Customer() {
  const [userInputMoney, setUserInputMoney] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleInputMoney = (user) => {
    setUserInputMoney(user);
    toggle();
  };

  const accounts = [
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'TX2022001',
      phone: '0794891252',
      name: 'Nguyễn Văn A',
      identityNumber: '0797412015322',
      firstTime: '24/02/2022 8.30 P.M',
      lastTime: '24/02/2023 9.30 P.M',
      finishOrder: 45,
      cancelOrder: 23,
      star: 4,
      status: 'Đã khóa',
      imagePapers: [
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      ],
      vehicle: [
        {
          id: 1,
          name: 'Huyndai',
          numberTruck: '56F-45123',
          imagePapers: [
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
          ],
          default: true,
        },
        {
          id: 2,
          name: 'Toyota',
          numberTruck: '56F-46153',
          imagePapers: [
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
          ],
          default: false,
        },
      ],
    },
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'TX2022002',
      phone: '0794891252',
      name: 'Nguyễn Văn B',
      identityNumber: '0797412015322',
      firstTime: '24/02/2022 8.30 P.M',
      lastTime: '24/02/2023 9.30 P.M',
      finishOrder: 45,
      cancelOrder: 23,
      star: 4.3,
      status: 'Đang hoạt động',
      imagePapers: [
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      ],
      vehicle: [],
    },
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'TX2022003',
      phone: '0794891252',
      name: 'Nguyễn Văn C',
      identityNumber: '0797412015322',
      firstTime: '24/02/2022 8.30 P.M',
      lastTime: '24/02/2023 9.30 P.M',
      finishOrder: 45,
      cancelOrder: 23,
      star: 4.5,
      status: 'Đang hoạt động',
      imagePapers: [
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      ],
      vehicle: [],
    },
  ];
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
        idShipper: debouncedShipperId,
      });
      setTotalItems(res);

      const result = await shipperAPI.search({
        page: page,
        limit: 10,
        idShipper: debouncedShipperId,
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
    setShowConfirm(false);
    setRerender(!rerender);
  };

  return (
    <div className={cx('wrapper')}>
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
            <Input type="number" className={cx('input')} />
            <div style={{ marginLeft: 10 }}>VNĐ</div>
          </div>
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
