import styles from './Order.module.scss';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import MyInput from '~/components/MyInput/MyInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Order() {
  const orders = [
    {
      id: 'GT20220001',
      shipper: {
        id: 'TX220001',
        name: 'Nguyễn Văn Tài',
        numberTruck: '53-F2.45612',
      },
      peopleSend: {
        name: 'Lê Ngọc Bình',
        phone: '0794561231',
        address: '12 Tân hòa đông, P. Bình Trị Đông, Q. Bình Tân, TP. Hồ Chí Minh',
      },
      peopleReceive: {
        name: 'Trần Trọng Nghĩa',
        phone: '0909123562',
        address: '445/51 Ngô Thời Nhiệm, Long Thành, Đồng Nai',
      },
      status: 'Đã giao',
      priceTransport: 250000,
      imgReceiveGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang2_wsnibh.jpg',
      ],
      imgShippedGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang_ldpzlr.jpg',
      ],
    },
    {
      id: 'GT20220002',
      shipper: {
        id: 'TX220001',
        name: 'Nguyễn Văn Tài',
        numberTruck: '53-F2.45612',
      },
      peopleSend: {
        name: 'Lê Ngọc Bình',
        phone: '0794561231',
        address: '12 Tân hòa đông, P. Bình Trị Đông, Q. Bình Tân, TP. Hồ Chí Minh',
      },
      peopleReceive: {
        name: 'Trần Trọng Nghĩa',
        phone: '0909123562',
        address: '445/51 Ngô Thời Nhiệm, Long Thành, Đồng Nai',
      },
      status: 'Đang giao',
      priceTransport: 250000,
      imgReceiveGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang2_wsnibh.jpg',
      ],
      imgShippedGoods: [
        'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang_ldpzlr.jpg',
      ],
    },
  ];
  const title = [
    'Mã đơn hàng',
    'Mã tài xế',
    'Tên tài xế',
    'Biển số xe',
    'Người gửi hàng',
    'Tình trạng',
  ];
  const status = ['Tất cả', 'Đã giao', 'Đang giao', 'Đang lấy hàng', 'Đã hủy'];

  const [searchValue, setSearchValue] = useState();
  const [tab, setTab] = useState('Tất cả');
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-place')}>
        <div className={cx('title')}>Tra cứu mã đơn hàng</div>
        <MyInput data={setSearchValue} iconLeft={<FontAwesomeIcon icon={faSearch} />} />
      </div>

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
              <thead>
                <tr>
                  {title.map((e, i) => (
                    <th key={i}>{e}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((e, i) =>
                  status == 'Tất cả' || status == e.status ? (
                    <tr key={i}>
                      <td>{e.id}</td>
                      <td>{e.shipper.id}</td>
                      <td>{e.shipper.name}</td>
                      <td>{e.shipper.numberTruck}</td>
                      <td>{e.peopleSend.name}</td>
                      <td>{e.status}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => {
                            navigate(`/order-detail/${e.id}`, { state: e });
                          }}
                        >
                          <h4>Xem</h4>
                        </Button>
                      </td>
                    </tr>
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

export default Order;
