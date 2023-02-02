import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
