import styles from './HistorySupport.module.scss';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from '~/pages/FormSupport/MyTableFormSupport/MyTableFormSupport';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FormFeedback, Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';
import formFeedbackAPI from '~/api/formFeedback';
import useDebounce from '~/hook/useDebounce';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HistoryButton from '~/components/HistoryButton/HistoryButton';

const cx = classNames.bind(styles);
const status = ['Tất cả'];

function HistorySupport() {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [listFeedBack, setListFeedBack] = useState([]);
  const debouncedShipperId = useDebounce(searchId, 200);
  const navigate = useNavigate();

  useEffect(() => {
    const getShipper = async () => {
      try {
        const total = await formFeedbackAPI.getByNoPageHistory({
          status: tab,
        });
        setTotalItems(total);
        const res = await formFeedbackAPI.getByPageHistory({
          limit: 10,
          page: page,
          status: tab,
        });
        setListFeedBack(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchId === '') getShipper();
  }, [tab, page]);

  useEffect(() => {
    if (!debouncedShipperId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const res = await formFeedbackAPI.searchNoPageHistory({
        idFeedback: debouncedShipperId.toUpperCase(),
      });
      setTotalItems(res);

      const result = await formFeedbackAPI.searchHistory({
        page: page,
        limit: 10,
        idFeedback: debouncedShipperId.toUpperCase(),
      });
      result.sort((a, b) => a.status - b.status);
      setSearchResult(result);
      if (debouncedShipperId === '') {
        setSearchResult([]);
      }
    };

    fetchApi();
  }, [debouncedShipperId, page, listFeedBack]);

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
          Lịch sử xử lý đơn góp ý và khiếu nại
        </h1>
      </div>

      <div className={cx('search-place')}>
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu mã đơn</div>
          <MyInput data={setSearchId} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
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
          <div>Không có đơn góp ý & khiếu nại nào phù hợp</div>
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
                  <HeaderTable hiddenAction={true} />
                  <tbody>
                    {listFeedBack.map((e, i) =>
                      status === 'Tất cả' || status === e.status ? (
                        <BodyTable item={e} key={i} hiddenAction={true} />
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

export default HistorySupport;
