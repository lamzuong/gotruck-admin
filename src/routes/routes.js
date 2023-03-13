import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';

import Customer from '~/pages/User/Customer/Customer';
import CustomerAccount from '~/pages/User/Customer/CustomerAccount/CustomerAccount';
import Shipper from '~/pages/User/Shipper/Shipper';
import ShipperAccount from '~/pages/User/Shipper/ShipperAccount/ShipperAccount';

import Order from '~/pages/Order/Order';
import OrderDetail from '~/pages/Order/OrderDetail/OrderDetail';
import ShipperLocation from '~/pages/Order/ShipperLocation/ShipperLocation';
import Policy from '~/pages/Policy/Policy';

import Price from '~/pages/Price/Price';
import Discount from '~/pages/Discount/Discount';
import HistoryChange from '~/pages/HistoryChange/HistoryChange';
import HistoryDetail from '~/pages/HistoryChange/HistoryDetail/HistoryDetail';

import FormRegister from '~/pages/FormRegister/FormRegister';
import FormSupport from '~/pages/FormSupport/FormSupport';
import FormVehicle from '~/pages/FormVehicle/FormVehicle';
import SupportDetail from '~/pages/FormSupport/SupportDetail/SupportDetail';
import RegisterDetail from '~/pages/FormRegister/RegisterDetail/RegisterDetail';
import Earning from '~/pages/Earning/Earning';
import Notification from '~/pages/Notification/Notification';
import Goods from '~/pages/Goods/Goods';
import Truck from '~/pages/Truck/Truck';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Login, layout: null },
  // { path: '/home', component: Home },
  { path: '/earning', component: Earning },
  { path: '/notification', component: Notification },

  { path: '/t/goods', component: Goods },
  { path: '/t/truck', component: Truck },

  { path: '/customer', component: Customer },
  { path: '/customer/:id', component: CustomerAccount },
  { path: '/shipper', component: Shipper },
  { path: '/shipper/:id', component: ShipperAccount },
  { path: '/shipper/:id/order', component: Order },

  { path: '/order', component: Order },
  { path: '/order-detail/:id', component: OrderDetail },
  { path: '/order-detail/:id/shipper-location', component: ShipperLocation },
  { path: '/policy', component: Policy },

  { path: '/pr/price', component: Price },
  { path: '/pr/discount', component: Discount },
  { path: '/pr/history-change', component: HistoryChange },
  { path: '/pr/history-change/:id', component: HistoryDetail },

  { path: '/form-support', component: FormSupport },
  { path: '/form-support/support-detail/:id', component: SupportDetail },
  { path: '/form-register', component: FormRegister },
  { path: '/form-register/register-detail/:id', component: RegisterDetail },
  { path: '/form-vehicle', component: FormVehicle },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
