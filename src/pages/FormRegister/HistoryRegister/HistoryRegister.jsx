import styles from './HistoryRegister.module.scss';
import MyInput from '~/components/MyInput/MyInput';
import {
  BodyTable,
  HeaderTable,
  HeaderTableHistory,
} from '../MyTableFormRegister/MyTableFormRegister';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';
import useDebounce from '~/hook/useDebounce';
import formRegisterAPI from '~/api/formRegister';
import HistoryButton from '~/components/HistoryButton/HistoryButton';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const status = ['Tất cả', 'Đã duyệt', 'Từ chối'];

function HistoryRegister() {
  const [searchId, setSearchId] = useState('');
  const [tab, setTab] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [listRegister, setListRegister] = useState([]);
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
      const res = await formRegisterAPI.searchNoPageHistory({
        idForm: debouncedShipperId.toUpperCase(),
      });
      setTotalItems(res);

      const result = await formRegisterAPI.searchHistory({
        page: page,
        limit: 10,
        idForm: debouncedShipperId.toUpperCase(),
      });

      setSearchResult([...result]);
      if (debouncedShipperId === '') {
        setSearchResult([]);
      }
    };

    fetchApi();
  }, [debouncedShipperId, page, listRegister]);

  useEffect(() => {
    const getFormRegister = async () => {
      try {
        const total = await formRegisterAPI.getByNoPageHistory({
          status: tab,
        });
        setTotalItems(total);
        const res = await formRegisterAPI.getByPageHistory({
          limit: 10,
          page: page,
          status: tab,
        });
        setListRegister([...res]);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchId === '') getFormRegister();
  }, [tab, page]);

  const changeTab = (tab) => {
    setPage(1);
    setTab(tab);
  };

  return (
    <div className={cx('wrapper')}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ fontSize: '150%', cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <h1 style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 15 }}>
          Lịch sử xử lý đơn đăng ký của tài xế
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

      {/* Search result */}
      {searchId !== '' ? (
        searchResult.length > 0 ? (
          <Table striped className={cx('table-order')}>
            <HeaderTableHistory />
            <tbody>
              {searchResult.map((e, i) => (
                <BodyTable item={e} key={i} />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Không có đơn đăng ký nào phù hợp</div>
        )
      ) : (
        <>
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
                  <HeaderTableHistory />
                  <tbody>
                    {listRegister.map((e, i) =>
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

export default HistoryRegister;
