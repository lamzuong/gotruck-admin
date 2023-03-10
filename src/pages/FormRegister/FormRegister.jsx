import styles from './FormRegister.module.scss';
import data from './data';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from './MyTableFormRegister/MyTableFormRegister';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const status = ['Tất cả', 'Chấp thuận', 'Từ chối', 'Chưa tiếp nhận'];

function FormRegister() {
  const [searchId, setSearchId] = useState('');
  const [tab, setTab] = useState('Tất cả');
  return (
    <div className={cx('wrapper')}>
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
                    <BodyTable item={e} key={i} />
                  ) : null,
                )}
              </tbody>
            </Table>
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
}

export default FormRegister;
