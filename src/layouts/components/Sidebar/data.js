import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChartLine,
  faCircleExclamation,
  faClipboardList,
  faPeopleCarry,
  faSackDollar,
  faShieldHalved,
  faTruckFast,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
const sidebar = [
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
      {
        title: 'Quản lý loại xe tải',
        to: '/t/truck',
      },
    ],
  },
  {
    title: 'Giá cả',
    icon: <FontAwesomeIcon icon={faSackDollar} />,
    path: '/pr',
    sub: [
      {
        title: 'Giá vận chuyển',
        to: '/pr/price',
      },
      {
        title: 'Khuyến mãi',
        to: '/pr/discount',
      },
    ],
  },
  {
    title: 'Đơn xử lý',
    icon: <FontAwesomeIcon icon={faCircleExclamation} />,
    path: '/form',
    sub: [
      {
        title: 'Đơn Góp ý và Khiếu nại',
        to: '/form-support',
        numberNotify: 4,
      },
      {
        title: 'Đơn đăng ký của shipper',
        to: '/form-register',
        numberNotify: 2,
      },
      {
        title: 'Đơn yêu cầu rút tiền',
        to: '/form-withdraw',
        numberNotify: 2,
      },
      {
        title: 'Đơn yêu cầu thêm phương tiện',
        to: '/form-vehicle',
        numberNotify: 2,
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
export default sidebar;
