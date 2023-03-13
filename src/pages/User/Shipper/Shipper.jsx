import styles from './Shipper.module.scss';
import {
  BodyTableShipper,
  HeaderTableShipper,
} from '~/pages/User/components/MyTableAccount/MyTableAccount';
import MyInput from '~/components/MyInput/MyInput';

import classNames from 'classnames/bind';
import { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  TabContent,
  Table,
  TabPane,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Customer() {
  const [userInputMoney, setUserInputMoney] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleInputMoney = (user) => {
    setUserInputMoney(user);
    toggle();
  };

  const [radiusShow, setRadiusShow] = useState(5);
  const [valueRadius, setValueRadius] = useState(5);
  const [showEditRadius, setShowEditRadius] = useState(false);
  const handleRadiusChange = (event) => {
    const limit = 2;
    setValueRadius(event.target.value.slice(0, limit));
  };
  const handleEditRadius = () => {
    setShowEditRadius(false);
    setRadiusShow(valueRadius);
    // call API
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

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Mã tài xế:</div>
            <div>{userInputMoney.id}</div>
          </div>
          <div className={cx('inline-center')}>
            <div className={cx('title')}>Số tiền nạp:</div>
            <Input type="number" className={cx('input')} />
            <div style={{ marginLeft: 10 }}>VNĐ</div>
          </div>
        </div>
      </Modal>
      {/* Bán kính nhận đơn */}
      <div className={cx('wrapper-radius')}>
        <div className={cx('radius-view')}>
          <div className={cx('title-header')}>Bán kính nhận đơn:</div>
          <span className={cx('txt-value')}>{radiusShow} km</span>
          {!showEditRadius && (
            <span className={cx('button-edit')} onClick={() => setShowEditRadius(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          )}
        </div>
        {showEditRadius && (
          <div className={cx('wrapper-input')}>
            <div className={cx('inline-center')}>
              <Input
                bsSize="lg"
                type="number"
                max={2}
                value={valueRadius}
                onChange={handleRadiusChange}
              />
              <div style={{ margin: 10 }}>km</div>
            </div>
            <div className={cx('wrapper-button')}>
              <Button color="primary" size="lg" className={cx('button')} onClick={handleEditRadius}>
                OK
              </Button>
              <Button
                color="danger"
                size="lg"
                className={cx('button')}
                onClick={() => setShowEditRadius(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>
      <hr />
      {/*  */}
      <div className={cx('title-header')}>Tài khoản</div>
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu ID</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>
      {/* Search result */}
      {searchResult.length > 0 ? (
        <Table striped className={cx('table-order')}>
          <HeaderTableShipper />
          <tbody>
            {searchResult.map((e, i) => (
              <BodyTableShipper user={e} key={i} />
            ))}
          </tbody>
        </Table>
      ) : (
        <>
          {/* Tab order */}
          <Nav tabs>
            {status.map((e, i) => (
              <NavItem key={i} className={cx('tabs')}>
                <NavLink className={tab === e ? 'active' : ''} onClick={() => setTab(e)}>
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
                    {accounts.map((e, i) =>
                      status === 'Tất cả' || status === e.status ? (
                        <BodyTableShipper user={e} handleInputMoney={handleInputMoney} key={i} />
                      ) : null,
                    )}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </>
      )}
      {/* Page */}
      <div className={cx('inline-around')}>
        <div style={{ width: 150 }} />
        <div className={cx('wrapper-pagination')}>
          <Pagination size="lg">
            <PaginationItem>
              <PaginationLink
                previous
                // onClick={() => pageTruck > 1 && setPageTruck(pageTruck - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                // onClick={() =>
                //   pageTruck < Math.ceil(listTrucks.length / 10) && setPageTruck(pageTruck + 1)
                // }
              />
            </PaginationItem>
          </Pagination>
        </div>
        <div style={{ color: 'grey' }}>
          Tổng số trang: {1} trên {10}
        </div>
      </div>
    </div>
  );
}

export default Customer;
