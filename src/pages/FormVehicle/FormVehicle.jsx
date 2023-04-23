import styles from './FormVehicle.module.scss';
import data from './data';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from './MyTableFormVehicle/MyTableFormVehicle';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';
import formVehicleAPI from '~/api/formVehicle';
import useDebounce from '~/hook/useDebounce';
import HistoryButton from '~/components/HistoryButton/HistoryButton';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const status = ['Tất cả'];

function FormVehicle() {
  const [searchId, setSearchId] = useState('');
  const [tab, setTab] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [listVehicle, setListVehicle] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [totalItems, setTotalItems] = useState(1);
  const navigate = useNavigate();

  const debouncedShipperId = useDebounce(searchId, 200);
  useEffect(() => {
    if (!debouncedShipperId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const res = await formVehicleAPI.searchNoPage({
        id_truck: debouncedShipperId.toUpperCase(),
      });
      setTotalItems(res);

      const result = await formVehicleAPI.search({
        page: page,
        limit: 10,
        id_truck: debouncedShipperId.toUpperCase(),
      });
      setSearchResult([...result]);
      if (debouncedShipperId === '') {
        setSearchResult([]);
      }
    };

    fetchApi();
  }, [debouncedShipperId, page, listVehicle]);

  useEffect(() => {
    const getFormVehicle = async () => {
      try {
        const total = await formVehicleAPI.getByNoPage();
        setTotalItems(total);
        const res = await formVehicleAPI.getByPage({
          limit: 10,
          page: page,
        });
        setListVehicle([...res]);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchId === '') getFormVehicle();
  }, [tab, page]);

  return (
    <div className={cx('wrapper')}>
      <div
        className={cx('search-place')}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu mã đơn</div>
          <MyInput data={setSearchId} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
        </div>
        <div style={{ marginTop: 20 }}>
          <HistoryButton
            title={'Xem lịch sử xử lý'}
            action={() => {
              navigate(`/form-vehicle/history`);
            }}
          />
        </div>
      </div>
      {searchId !== '' ? (
        searchResult.length > 0 ? (
          <Table striped className={cx('table-order')}>
            <HeaderTable />
            <tbody>
              {searchResult.map((e, i) => (
                <BodyTable item={e} key={i} />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Không có đơn yêu cầu thêm phương tiện nào phù hợp</div>
        )
      ) : (
        <>
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
                    {listVehicle.map((e, i) =>
                      status === 'Tất cả' || status === e.status ? (
                        <BodyTable item={e} key={i} />
                      ) : null,
                    )}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </>
      )}

      <MyPagination setPage={setPage} page={page} totalItems={totalItems.length} />
    </div>
  );
}

export default FormVehicle;
