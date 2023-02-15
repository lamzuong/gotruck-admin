import styles from './Shipper.module.scss';
import {
  BodyTableShipper,
  HeaderTableShipper,
} from '~/pages/Account/components/MyTableAccount/MyTableAccount';
import MyInput from '~/components/MyInput/MyInput';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Customer() {
  const accounts = [
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'TX2022001',
      phone: '0794891252',
      name: 'Nguyễn Văn A',
      identityNumber: '0797412015322',
      firstTime: '24/02/2022 8.30 P.M',
      lastTime: '24/02/2023 9.30 P.M',
      finishOrder: 45,
      cancelOrder: 23,
      star: 4,
      status: 'Đã khóa',
      imagePapers: [
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      ],
      vehicle: [
        {
          id: 1,
          name: 'Huyndai',
          numberTruck: '56F-45123',
          imagePapers: [
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
          ],
          default: true,
        },
        {
          id: 2,
          name: 'Toyota',
          numberTruck: '56F-46153',
          imagePapers: [
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
            'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
          ],
          default: false,
        },
      ],
    },
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'TX2022002',
      phone: '0794891252',
      name: 'Nguyễn Văn B',
      identityNumber: '0797412015322',
      firstTime: '24/02/2022 8.30 P.M',
      lastTime: '24/02/2023 9.30 P.M',
      finishOrder: 45,
      cancelOrder: 23,
      star: 4.3,
      status: 'Đang hoạt động',
      imagePapers: [
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      ],
      vehicle: [],
    },
    {
      avatar: 'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      id: 'TX2022003',
      phone: '0794891252',
      name: 'Nguyễn Văn C',
      identityNumber: '0797412015322',
      firstTime: '24/02/2022 8.30 P.M',
      lastTime: '24/02/2023 9.30 P.M',
      finishOrder: 45,
      cancelOrder: 23,
      star: 4.5,
      status: 'Đang hoạt động',
      imagePapers: [
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
        'https://toplist.vn/images/800px/photo-studio-duc-cuong-321718.jpg',
      ],
      vehicle: [],
    },
  ];
  const status = ['Tất cả', 'Đang hoạt động', 'Đã khóa'];

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tab, setTab] = useState('Tất cả');

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu ID</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>
      {/* Search result */}
      {searchResult.length > 0 ? (
        <Table striped className={cx('table-order')}>
          <HeaderTableShipper />
          <tbody>
            {searchResult.map((e, i) => (
              <BodyTableShipper order={e} key={i} />
            ))}
          </tbody>
        </Table>
      ) : (
        <>
          {/* Tab order */}
          <Nav tabs>
            {status.map((e, i) => (
              <NavItem key={i} className={cx('tabs')}>
                <NavLink className={tab == e ? 'active' : ''} onClick={() => setTab(e)}>
                  <div className={tab == e ? cx('choose-tab') : cx('no-choose-tab')}>{e}</div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={tab}>
            {status.map((status, i) => (
              <TabPane tabId={status} key={i}>
                <Table striped className={cx('table-order')}>
                  <HeaderTableShipper />
                  <tbody>
                    {accounts.map((e, i) =>
                      status == 'Tất cả' || status == e.status ? (
                        <BodyTableShipper user={e} key={i} />
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

export default Customer;
