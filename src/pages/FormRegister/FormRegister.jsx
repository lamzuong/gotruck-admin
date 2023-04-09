import styles from './FormRegister.module.scss';
import MyInput from '~/components/MyInput/MyInput';
import { BodyTable, HeaderTable } from './MyTableFormRegister/MyTableFormRegister';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MyPagination from '~/components/MyPagination/MyPagination';
import formAPI from '~/api/form';

const cx = classNames.bind(styles);

const status = ['Tất cả'];

function FormRegister() {
  const [searchId, setSearchId] = useState('');
  const [tab, setTab] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [listRegister, setListRegister] = useState([]);

  useEffect(() => {
    (async function () {
      const resListRegister = await formAPI.getAllFormRegister();
      if (!resListRegister.isNotFound) {
        setListRegister([...resListRegister]);
      }
    }.call(this));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-place')}>
        <div className={cx('wrapper-search')}>
          <div className={cx('title')}>Tra cứu mã tài xế</div>
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

      <MyPagination setPage={setPage} page={page} totalItems={listRegister.length} />
    </div>
  );
}

export default FormRegister;
