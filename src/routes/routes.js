import Welcome from '../pages/Welcome/Welcome';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';

// Không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Welcome },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
