import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChartLine,
  faCircleExclamation,
  faClipboardList,
  faPeopleCarry,
  faShieldHalved,
  faTruckFast,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';

const sidebarLocal = [
  {
    title: 'Thống kê doanh thu',
    icon: <FontAwesomeIcon icon={faChartLine} />,
    path: '/earning',
    sub: [],
  },
  {
    title: 'Tạo thông báo',
    icon: <FontAwesomeIcon icon={faBell} />,
    path: '/notification',
    sub: [],
  },
  {
    title: 'Tài xế',
    icon: <FontAwesomeIcon icon={faPeopleCarry} />,
    path: '/shipper',
    sub: [],
  },
  {
    title: 'Khách hàng',
    icon: <FontAwesomeIcon icon={faUserShield} />,
    path: '/customer',
    sub: [],
  },
  {
    title: 'Vận chuyển',
    icon: <FontAwesomeIcon icon={faTruckFast} />,
    path: '/t',
    sub: [
      {
        title: 'Quản lý loại hàng hóa',
        to: '/t/goods',
      },
      // {
      //   title: 'Quản lý loại xe tải',
      //   to: '/t/truck',
      // },
      {
        title: 'Giá vận chuyển',
        to: '/t/price',
      },
      {
        title: 'Bán kính nhận đơn',
        to: '/t/radius',
      },
      {
        title: 'Phí vận chuyển',
        to: '/t/feeapp',
      },
    ],
  },
  // {
  //   title: 'Giá cả',
  //   icon: <FontAwesomeIcon icon={faSackDollar} />,
  //   path: '/pr',
  //   sub: [
  //     {
  //       title: 'Khuyến mãi',
  //       to: '/pr/discount',
  //     },
  //   ],
  // },
  {
    title: 'Xử lý đơn',
    icon: <FontAwesomeIcon icon={faCircleExclamation} />,
    path: '/form',
    sub: [
      {
        title: 'Đơn Góp ý và Khiếu nại',
        to: '/form-support',
        numberNotify: 0,
        type: 'feedback',
      },
      {
        title: 'Đơn đăng ký của tài xế',
        to: '/form-register',
        numberNotify: 0,
        type: 'register',
      },
      {
        title: 'Đơn yêu cầu rút tiền',
        to: '/form-withdraw',
        numberNotify: 0,
        type: 'withdraw',
      },
      {
        title: 'Đơn yêu cầu thêm phương tiện',
        to: '/form-vehicle',
        numberNotify: 0,
        type: 'vehicle',
      },
    ],
  },
  {
    title: 'Đơn hàng',
    icon: <FontAwesomeIcon icon={faClipboardList} />,
    path: '/order',
    sub: [],
  },
  {
    title: 'Điều khoản và Chính sách',
    icon: <FontAwesomeIcon icon={faShieldHalved} />,
    path: '/policy',
    sub: [],
  },
];

export default sidebarLocal;
