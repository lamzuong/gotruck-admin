import styles from './FormWithdraw.module.scss';
import data from './data';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from './MyTableFormWithdraw/MyTableFormWithdraw';
import MyButtonAdd from '~/components/MyButtonAdd/MyButtonAdd';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Modal, Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';

const cx = classNames.bind(styles);

const status = ['Tất cả', 'Chưa xử lý', 'Đã xử lý'];

function FormWithdraw() {
  const [searchId, setSearchId] = useState('');
  const [tab, setTab] = useState('Tất cả');

  const [imagePay, setImagePay] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Ảnh minh chứng nạp tiền</div>
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
      <div className={cx('search-place')}>
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu mã đơn</div>
          <MyInput data={setSearchId} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
        </div>
      </div>

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
                {data.map((e, i) =>
                  status === 'Tất cả' || status === e.status ? (
                    <BodyTable item={e} key={i} showConfirm={toggle} />
                  ) : null,
                )}
              </tbody>
            </Table>
          </TabPane>
        ))}
      </TabContent>

      <MyPagination />
    </div>
  );
}

export default FormWithdraw;
