import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';

import Customer from '~/pages/Account/Customer/Customer';
import CustomerAccount from '~/pages/Account/Customer/CustomerAccount/CustomerAccount';
import Shipper from '~/pages/Account/Shipper/Shipper';
import ShipperAccount from '~/pages/Account/Shipper/ShipperAccount/ShipperAccount';

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

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Login, layout: null },
  { path: '/home', component: Home },

  { path: '/customer', component: Customer },
  { path: '/customer/:id', component: CustomerAccount },
  { path: '/shipper', component: Shipper },
  { path: '/shipper/:id', component: ShipperAccount },
  { path: '/shipper/:id/order', component: Order },

  { path: '/order', component: Order },
  { path: '/order-detail/:id', component: OrderDetail },
  { path: '/order-detail/:id/shipper-location', component: ShipperLocation },
  { path: '/policy', component: Policy },

  { path: '/price', component: Price },
  { path: '/discount', component: Discount },
  { path: '/history-change', component: HistoryChange },
  { path: '/history-change/:id', component: HistoryDetail },

  { path: '/form-support', component: FormSupport },
  { path: '/form-support/support-detail/:id', component: SupportDetail },
  { path: '/form-register', component: FormRegister },
  { path: '/form-register/register-detail/:id', component: RegisterDetail },
  { path: '/form-vehicle', component: FormVehicle },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
