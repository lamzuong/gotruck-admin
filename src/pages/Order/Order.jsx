import styles from './Order.module.scss';
import { HeaderTable, BodyTable } from '~/pages/Order/MyTableOrder/MyTableOrder';
// import { orders } from './data';
import { toFindDuplicates } from '~/global/functionGlobal';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import MyInput from '~/components/MyInput/MyInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hook/useDebounce';
import { useLocation } from 'react-router-dom';
import orderAPI from '~/api/orderAPI';
import MyPagination from '~/components/MyPagination/MyPagination';

const cx = classNames.bind(styles);

function Order() {
  const status = ['Tất cả', 'Đã giao', 'Đang giao', 'Đang lấy hàng', 'Đã hủy'];

  const location = useLocation();
  const item = location.state;

  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchCustomerId, setSearchCustomerId] = useState(() => {
    return item !== null ? item.id : '';
  });
  const [searchShipperId, setSearchShipperId] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');
  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const changeTab = (tab) => {
    setCurrentPage(1);
    setTab(tab);
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const total = await orderAPI.getByNoPage({
          status: tab,
        });
        setTotalItems(total);
        const res = await orderAPI.getByPage({
          limit: 10,
          page: currentPage,
          status: tab,
        });
        setOrders(res);
      } catch (error) {
        console.log('Failed to getOrders', error);
      }
    };
    if (searchCustomerId === '' && searchOrderId === '' && searchShipperId === '') getOrders();
  }, [tab, currentPage]);

  const debouncedOrderId = useDebounce(searchOrderId, 200);
  const debouncedCustomerId = useDebounce(searchCustomerId, 200);
  const debouncedShipperId = useDebounce(searchShipperId, 200);
  useEffect(() => {
    if (!debouncedOrderId.trim() && !debouncedCustomerId.trim() && !debouncedShipperId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const res = await orderAPI.searchNoPage({
        idCustomer: debouncedCustomerId,
        idShipper: debouncedShipperId,
        idOrder: debouncedOrderId,
      });
      setTotalItems(res);

      const result = await orderAPI.search({
        page: currentPage,
        limit: 10,
        idCustomer: debouncedCustomerId,
        idShipper: debouncedShipperId,
        idOrder: debouncedOrderId,
      });
      console.log(result);
      setSearchResult(result);
      if (debouncedOrderId === '' && debouncedCustomerId === '' && debouncedShipperId === '') {
        setSearchResult([]);
      }
    };

    fetchApi();
  }, [debouncedOrderId, debouncedCustomerId, debouncedShipperId, currentPage]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-place')}>
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu mã đơn hàng</div>
          <MyInput data={setSearchOrderId} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
        </div>
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu theo mã khách hàng</div>
          <MyInput
            data={setSearchCustomerId}
            iconLeft={<FontAwesomeIcon icon={faSearch} />}
            initValue={searchCustomerId}
          />
        </div>
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu theo mã tài xế</div>
          <MyInput
            data={setSearchShipperId}
            iconLeft={<FontAwesomeIcon icon={faSearch} />}
            initValue={searchShipperId}
          />
        </div>
      </div>

      {/* Search result */}
      {searchCustomerId !== '' || searchOrderId !== '' || searchShipperId !== '' ? (
        searchResult.length > 0 ? (
          <Table striped className={cx('table-order')}>
            <HeaderTable />
            <tbody>
              {searchResult.map((e, i) => (
                <BodyTable order={e} key={i} />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Không có đơn hàng nào phù hợp</div>
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
                  <HeaderTable />
                  <tbody>
                    {orders.map((e, i) => (
                      <BodyTable order={e} key={i} />
                    ))}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </>
      )}

      <MyPagination page={currentPage} totalItems={totalItems.length} setPage={setCurrentPage} />
    </div>
  );
}

export default Order;
