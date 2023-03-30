import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import ChangePass from '~/pages/ChangePass/ChangePass';

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
import HistoryNotify from '~/pages/Notification/HistoryNotify/HistoryNotify';
import NotifyDetail from '~/pages/Notification/HistoryNotify/NotifyDetail/NotifyDetail';

import Goods from '~/pages/Goods/Goods';
import Truck from '~/pages/Truck/Truck';
import Radius from '~/pages/Radius/Radius';

import ContactUser from '~/pages/FormSupport/ContactUser/ContactUser';
import FormWithdraw from '~/pages/FormWithdraw/FormWithdraw';
import WithdrawDetail from '~/pages/FormWithdraw/WithdrawDetail/WithdrawDetail';
import VehicleDetail from '~/pages/FormVehicle/VehicleDetail/VehicleDetail';

import CustomerPolicy from '~/pages/Policy/CustomerPolicy/CustomerPolicy';
import ShipperPolicy from '~/pages/Policy/ShipperPolicy/ShipperPolicy';
import SecurityPolicy from '~/pages/Policy/SecurityPolicy/SecurityPolicy';
import RegulationPolicy from '~/pages/Policy/RegulationPolicy/RegulationPolicy';
import FormAddPolicy from '~/pages/Policy/FormAddPolicy/FormAddPolicy';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Login, layout: null },
  { path: '/change-pass', component: ChangePass },

  { path: '/earning', component: Earning },
  { path: '/notification', component: Notification },
  { path: '/notification/history', component: HistoryNotify },
  { path: '/notification/history/:id', component: NotifyDetail },

  { path: '/t/goods', component: Goods },
  { path: '/t/truck', component: Truck },
  { path: '/t/radius', component: Radius },

  { path: '/customer', component: Customer },
  { path: '/customer/:id', component: CustomerAccount },
  { path: '/shipper', component: Shipper },
  { path: '/shipper/:id', component: ShipperAccount },
  { path: '/shipper/:id/order', component: Order },

  { path: '/order', component: Order },
  { path: '/order-detail/:id', component: OrderDetail },
  { path: '/order-detail/:id/shipper-location', component: ShipperLocation },

  { path: '/policy', component: Policy },
  { path: '/policy/customer', component: CustomerPolicy },
  { path: '/policy/shipper', component: ShipperPolicy },
  { path: '/policy/security', component: SecurityPolicy },
  { path: '/policy/regulation', component: RegulationPolicy },
  { path: '/policy/form', component: FormAddPolicy },

  { path: '/pr/price', component: Price },
  { path: '/pr/discount', component: Discount },
  { path: '/pr/history-change', component: HistoryChange },
  { path: '/pr/history-change/:id', component: HistoryDetail },

  { path: '/form-support', component: FormSupport },
  { path: '/form-support/support-detail/:id', component: SupportDetail },
  { path: '/form-support/support-detail/:id/contact', component: ContactUser },
  { path: '/form-register', component: FormRegister },
  { path: '/form-register/register-detail/:id', component: RegisterDetail },
  { path: '/form-withdraw', component: FormWithdraw },
  { path: '/form-withdraw/withdraw-detail/:id', component: WithdrawDetail },
  { path: '/form-vehicle', component: FormVehicle },
  { path: '/form-vehicle/vehicle-detail/:id', component: VehicleDetail },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
