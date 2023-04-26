import styles from './Customer.module.scss';
import {
  BodyTableCustomer,
  HeaderTableCustomer,
} from '~/pages/User/components/MyTableAccount/MyTableAccount';
import customerAPI from '~/api/customerAPI';
import MyInput from '~/components/MyInput/MyInput';
import MyPagination from '~/components/MyPagination/MyPagination';
import MyConfirm from '~/components/MyConfirm/MyConfirm';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hook/useDebounce';
import customStyles from '~/pages/Order/OrderDetail/stylesModal';
import ReactModal from 'react-modal';

const cx = classNames.bind(styles);

function Customer() {
  const status = ['Tất cả', 'Đang hoạt động', 'Đã khóa'];

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');
  const [rerender, setRerender] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [txtConfirm, setTxtConfirm] = useState(false);
  const [userConfirm, setUserConfirm] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageChoose, setImageChoose] = useState('');
  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const total = await customerAPI.getByNoPage({
          status: tab,
        });
        setTotalItems(total);
        const res = await customerAPI.getByPage({
          limit: 10,
          page: page,
          status: tab,
        });
        setCustomers(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchValue === '') getCustomer();
  }, [tab, page, rerender]);

  const debouncedCustomerId = useDebounce(searchValue, 200);
  useEffect(() => {
    if (!debouncedCustomerId.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const res = await customerAPI.searchNoPage({
        idCustomer: debouncedCustomerId,
      });
      setTotalItems(res);

      const result = await customerAPI.search({
        page: page,
        limit: 10,
        idCustomer: debouncedCustomerId,
      });

      setSearchResult(result);
      if (debouncedCustomerId === '') {
        setSearchResult([]);
      }
    };
    fetchApi();
  }, [debouncedCustomerId, page]);

  const changeTab = (tab) => {
    setPage(1);
    setTab(tab);
  };

  const handleBlock = async () => {
    await customerAPI.block(userConfirm.id_cus);
    setShowConfirm(false);
    setRerender(!rerender);
  };

  return (
    <div className={cx('wrapper')}>
      <ReactModal isOpen={modalIsOpen} toggle={closeModal} style={customStyles}>
        <div className={cx('cover-img')}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={'white'}
            size={'2x'}
            className={cx('icon-close')}
            onClick={closeModal}
          />
          <img src={imageChoose} className={cx('show-img')} />
        </div>
      </ReactModal>
      <MyConfirm
        setShow={setShowConfirm}
        show={showConfirm}
        title={txtConfirm}
        action={handleBlock}
      />
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu ID</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>
      {/* Search result */}
      {searchValue !== '' ? (
        searchResult.length > 0 ? (
          <Table striped className={cx('table-order')}>
            <HeaderTableCustomer />
            <tbody>
              {searchResult.map((e, i) => (
                <BodyTableCustomer
                  user={e}
                  key={i}
                  show={showConfirm}
                  setShow={setShowConfirm}
                  setText={setTxtConfirm}
                  setUser={setUserConfirm}
                  setImageChoose={setImageChoose}
                  showAvatar={modalIsOpen}
                  setShowAvatar={setIsOpen}
                />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Không có khách hàng nào phù hợp</div>
        )
      ) : (
        <>
          {/* Tab order */}
          <Nav tabs>
            {status.map((e, i) => (
              <NavItem key={i} className={cx('tabs')}>
                <NavLink className={tab == e ? 'active' : ''} onClick={() => changeTab(e)}>
                  <div className={tab == e ? cx('choose-tab') : cx('no-choose-tab')}>{e}</div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={tab}>
            {status.map((status, i) => (
              <TabPane tabId={status} key={i}>
                <Table striped className={cx('table-order')}>
                  <HeaderTableCustomer />
                  <tbody>
                    {customers?.map((e, i) => (
                      <BodyTableCustomer
                        user={e}
                        key={i}
                        show={showConfirm}
                        setShow={setShowConfirm}
                        setText={setTxtConfirm}
                        setUser={setUserConfirm}
                        setImageChoose={setImageChoose}
                        showAvatar={modalIsOpen}
                        setShowAvatar={setIsOpen}
                      />
                    ))}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </>
      )}
      {/* Page */}
      <MyPagination setPage={setPage} page={page} totalItems={totalItems.length} />
    </div>
  );
}

export default Customer;
