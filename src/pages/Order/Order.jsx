import styles from './Order.module.scss';
import { HeaderTable, BodyTable } from '~/components/MyTableOrder/MyTableOrder';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import MyInput from '~/components/MyInput/MyInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hook/useDebounce';

const cx = classNames.bind(styles);

function Order() {
  const orders = [
    {
      id: 'GT20220001',
      shipper: {
        id: 'TX220001',
        name: 'Nguyễn Văn Tài',
        numberTruck: '53-F2.45612',
      },
      peopleSend: {
        name: 'Lê Ngọc Bình',
        phone: '0794561231',
        address: '12 Tân hòa đông, P. Bình Trị Đông, Q. Bình Tân, TP. Hồ Chí Minh',
      },
      peopleReceive: {
        name: 'Trần Trọng Nghĩa',
        phone: '0909123562',
        address: '445/51 Ngô Thời Nhiệm, Long Thành, Đồng Nai',
      },
      status: 'Đã giao',
      priceTransport: 250000,
      imgReceiveGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang2_wsnibh.jpg',
      ],
      imgShippedGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang_ldpzlr.jpg',
      ],
    },
    {
      id: 'GT20220002',
      shipper: {
        id: 'TX220001',
        name: 'Nguyễn Văn Tài',
        numberTruck: '53-F2.45612',
      },
      peopleSend: {
        name: 'Lê Ngọc Bình',
        phone: '0794561231',
        address: '12 Tân hòa đông, P. Bình Trị Đông, Q. Bình Tân, TP. Hồ Chí Minh',
      },
      peopleReceive: {
        name: 'Trần Trọng Nghĩa',
        phone: '0909123562',
        address: '445/51 Ngô Thời Nhiệm, Long Thành, Đồng Nai',
      },
      status: 'Đang giao',
      priceTransport: 250000,
      imgReceiveGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang2_wsnibh.jpg',
      ],
      imgShippedGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang_ldpzlr.jpg',
      ],
    },
  ];
  const status = ['Tất cả', 'Đã giao', 'Đang giao', 'Đang lấy hàng', 'Đã hủy'];

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');

  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      // setLoading(true);
      // const result = await searchServices.search(debouncedValue);
      // setSearchResult(result);
      // setLoading(false);
      var list = [];
      orders.forEach((e) => {
        if (e.id.toLowerCase().includes(debouncedValue.toLowerCase())) {
          list.push(e);
        }
      });
      setSearchResult(list);
      if (debouncedValue === '') setSearchResult([]);
    };

    fetchApi();
  }, [debouncedValue]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu mã đơn hàng</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>
      {/* Search result */}
      {searchResult.length > 0 ? (
        <Table striped className={cx('table-order')}>
          <HeaderTable />
          <tbody>
            {searchResult.map((e, i) => (
              <BodyTable order={e} key={i} />
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
                  <HeaderTable />
                  <tbody>
                    {orders.map((e, i) =>
                      status === 'Tất cả' || status === e.status ? (
                        <BodyTable order={e} key={i} />
                      ) : null,
                    )}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </>
      )}
    </div>
  );
}

export default Order;
