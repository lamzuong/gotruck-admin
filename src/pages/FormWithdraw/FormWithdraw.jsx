import styles from './FormWithdraw.module.scss';
import data from './data';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from './MyTableFormWithdraw/MyTableFormWithdraw';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Modal, Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';
import useDebounce from '~/hook/useDebounce';
import formWithDrawAPI from '~/api/formWithDraw';
import HistoryButton from '~/components/HistoryButton/HistoryButton';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const status = ['Tất cả'];

function FormWithdraw() {
  const [searchId, setSearchId] = useState('');
  const [tab, setTab] = useState('Tất cả');

  const [imagePay, setImagePay] = useState(null);
  const [modal, setModal] = useState(false);
  const [listWithDraw, setListWithDraw] = useState([]);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const debouncedShipperId = useDebounce(searchId, 300);
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (!debouncedShipperId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const res = await formWithDrawAPI.searchNoPage({
        id_transaction_history: debouncedShipperId.toUpperCase(),
      });
      setTotalItems(res);

      const result = await formWithDrawAPI.search({
        page: page,
        limit: 10,
        id_transaction_history: debouncedShipperId.toUpperCase(),
      });

      setSearchResult([...result]);
      if (debouncedShipperId === '') {
        setSearchResult([]);
      }
    };

    fetchApi();
  }, [debouncedShipperId, page, listWithDraw]);

  useEffect(() => {
    const getFormRegister = async () => {
      try {
        const total = await formWithDrawAPI.getByNoPage();
        setTotalItems(total);
        const res = await formWithDrawAPI.getByPage({
          limit: 10,
          page: page,
        });
        setListWithDraw([...res]);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchId === '') getFormRegister();
  }, [tab, page]);

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Ảnh minh chứng đã chuyển khoản</div>
          {imagePay === null ? (
            <MyButtonAdd data={setImagePay} />
          ) : (
            <div>
              <img
                src={imagePay !== null && window.URL.createObjectURL(imagePay[0])}
                className={cx('img')}
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={cx('icon-del')}
                onClick={() => setImagePay(null)}
              />
            </div>
          )}
          <input type={'file'} />
          <Button block color="primary" className={cx('button')} size="lg">
            <h4>Xác nhận</h4>
          </Button>
        </div>
      </Modal>
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
              navigate(`/form-withdraw/history`);
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
                <BodyTable item={e} key={i} showConfirm={toggle} />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Không có đơn yêu cầu rút tiền phù hợp</div>
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
                    {listWithDraw.map((e, i) =>
                      status === 'Tất cả' || status === e.status ? (
                        <BodyTable item={e} key={i} showConfirm={toggle} />
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

export default FormWithdraw;
