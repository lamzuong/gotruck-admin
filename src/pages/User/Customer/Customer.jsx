import styles from './Customer.module.scss';
import {
  BodyTableCustomer,
  HeaderTableCustomer,
} from '~/pages/User/components/MyTableAccount/MyTableAccount';
import MyInput from '~/components/MyInput/MyInput';

import classNames from 'classnames/bind';
import { useState } from 'react';
import {
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
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Customer() {
  const accounts = [
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'KH2023001',
      phone: '0794891252',
      name: 'Nguyễn Văn A',
      firstTime: '24/02/2022 8.30 P.M',
      finishOrder: 45,
      boomOrder: 5,
      cancelOrder: 23,
      status: 'Đã khóa',
    },
    {
      avatar: null,
      id: 'KH2022001',
      phone: '0794891252',
      name: 'Nguyễn Văn A',
      firstTime: '24/02/2022 8.30 P.M',
      finishOrder: 45,
      boomOrder: 0,
      cancelOrder: 23,
      status: 'Đang hoạt động',
    },
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'KH2022001',
      phone: '0794891252',
      name: 'Nguyễn Văn A',
      firstTime: '24/02/2022 8.30 P.M',
      finishOrder: 45,
      boomOrder: 0,
      cancelOrder: 23,
      status: 'Đang hoạt động',
    },
  ];
  const status = ['Tất cả', 'Đang hoạt động', 'Đã khóa'];

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu ID</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>
      {/* Search result */}
      {searchResult.length > 0 ? (
        <Table striped className={cx('table-order')}>
          <HeaderTableCustomer />
          <tbody>
            {searchResult.map((e, i) => (
              <BodyTableCustomer order={e} key={i} />
            ))}
          </tbody>
        </Table>
      ) : (
        <>
          {/* Tab order */}
          <Nav tabs>
            {status.map((e, i) => (
              <NavItem key={i} className={cx('tabs')}>
                <NavLink className={tab == e ? 'active' : ''} onClick={() => setTab(e)}>
                  <div className={tab == e ? cx('choose-tab') : cx('no-choose-tab')}>{e}</div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={tab}>
            {status.map((status, i) => (
              <TabPane tabId={status} key={i}>
                <Table striped className={cx('table-order')}>
                  <HeaderTableCustomer />
                  <tbody>
                    {accounts.map((e, i) =>
                      status == 'Tất cả' || status == e.status ? (
                        <BodyTableCustomer user={e} key={i} />
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
