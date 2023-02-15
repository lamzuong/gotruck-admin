import Welcome from '~/pages/Welcome/Welcome';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';

import Customer from '~/pages/Account/Customer/Customer';
import CustomerAccount from '~/pages/Account/Customer/CustomerAccount/CustomerAccount';
import Shipper from '~/pages/Account/Shipper/Shipper';
import ShipperAccount from '~/pages/Account/Shipper/ShipperAccount/ShipperAccount';

import Order from '~/pages/Order/Order';
import OrderDetail from '~/pages/Order/OrderDetail/OrderDetail';
import Policy from '~/pages/Policy/Policy';

import Price from '~/pages/Price/Price';
import Discount from '~/pages/Discount/Discount';
import HistoryChange from '~/pages/HistoryChange/HistoryChange';

import FormRegister from '~/pages/FormRegister/FormRegister';
import FormSupport from '~/pages/FormSupport/FormSupport';
import FormVehicle from '~/pages/FormVehicle/FormVehicle';

// Layout
import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout/OnlyHeaderLayout';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Welcome },
  { path: '/home', component: Home },
  { path: '/login', component: Login, layout: OnlyHeaderLayout },

  { path: '/customer', component: Customer },
  { path: '/customer/:id', component: CustomerAccount },
  { path: '/shipper', component: Shipper },
  { path: '/shipper/:id', component: ShipperAccount },
  { path: '/shipper/:id/order', component: Order },

  { path: '/order', component: Order },
  { path: '/order-detail/:id', component: OrderDetail },
  { path: '/policy', component: Policy },

  { path: '/price', component: Price },
  { path: '/discount', component: Discount },
  { path: '/history-change', component: HistoryChange },

  { path: '/form-support', component: FormSupport },
  { path: '/form-register', component: FormRegister },
  { path: '/form-vehicle', component: FormVehicle },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
