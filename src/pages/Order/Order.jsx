import styles from './Order.module.scss';
import { HeaderTable, BodyTable } from '~/components/MyTableOrder/MyTableOrder';
import { orders } from './data';
import { toFindDuplicates } from '~/global/functionGlobal';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import MyInput from '~/components/MyInput/MyInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hook/useDebounce';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Order() {
  const status = ['Tất cả', 'Đã giao', 'Đang giao', 'Đang lấy hàng', 'Đã hủy'];

  const location = useLocation();
  const item = location.state;
  // console.log(item);

  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchUserId, setSearchUserId] = useState(() => {
    return item !== null ? item.id : '';
  });
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');

  const debouncedOrderId = useDebounce(searchOrderId, 500);
  const debouncedUserId = useDebounce(searchUserId, 500);
  useEffect(() => {
    if (!debouncedOrderId.trim() && !debouncedUserId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      var list = [];
      orders.forEach((e) => {
        if (e.id.toLowerCase().includes(debouncedOrderId.toLowerCase())) {
          list.push(e);
        }
        if (e.idUser.toLowerCase().includes(debouncedUserId.toLowerCase())) {
          list.push(e);
        }
      });
      list = toFindDuplicates(list);
      setSearchResult(list);
      if (debouncedOrderId === '' && debouncedUserId === '') setSearchResult([]);
    };

    fetchApi();
  }, [debouncedOrderId, debouncedUserId]);

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
            data={setSearchUserId}
            iconLeft={<FontAwesomeIcon icon={faSearch} />}
            initValue={searchUserId}
          />
        </div>
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
