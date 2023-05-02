import styles from './HistoryVehicle.module.scss';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from '../MyTableFormVehicle/MyTableFormVehicle';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';
import formVehicleAPI from '~/api/formVehicle';
import useDebounce from '~/hook/useDebounce';
import HistoryButton from '~/components/HistoryButton/HistoryButton';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const status = ['Tất cả', 'Đã duyệt', 'Từ chối'];

function HistoryVehicle() {
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
      const res = await formVehicleAPI.searchNoPageHistory({
        id_truck: debouncedShipperId.toUpperCase(),
      });
      setTotalItems(res);

      const result = await formVehicleAPI.searchHistory({
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
        const total = await formVehicleAPI.getByNoPageHistory({
          status: tab,
        });
        setTotalItems(total);
        const res = await formVehicleAPI.getByPageHistory({
          limit: 10,
          page: page,
          status: tab,
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ fontSize: '150%', cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <h1 style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 15 }}>
          Lịch sử xử lý đơn yêu cầu thêm phương tiện
        </h1>
      </div>
      <div
        className={cx('search-place')}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu mã đơn</div>
          <MyInput data={setSearchId} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
        </div>
      </div>
      {searchId !== '' ? (
        searchResult.length > 0 ? (
          <Table striped className={cx('table-order')}>
            <HeaderTable history={true} />
            <tbody>
              {searchResult.map((e, i) => (
                <BodyTable item={e} key={i} history={true} />
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
                  <HeaderTable history={true} />
                  <tbody>
                    {listVehicle.map((e, i) => (
                      <BodyTable item={e} key={i} history={true} />
                    ))}
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

export default HistoryVehicle;
