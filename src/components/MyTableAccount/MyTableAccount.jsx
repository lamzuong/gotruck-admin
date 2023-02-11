import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const titleCustomer = ['ID', 'Số điện thoại', 'Họ tên', 'Tình trạng'];
const HeaderTableCustomer = () => (
  <thead>
    <tr>
      {titleCustomer.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTableCustomer = ({ user }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.phone}</td>
      <td>{user.name}</td>
      <td>{user.status}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/customer/${user.id}`, { state: user });
          }}
        >
          <h4>Xem</h4>
        </Button>
        {user.status === 'Đã khóa' ? (
          <Button color="success" style={{ marginLeft: 10 }}>
            <h4>Mở khóa</h4>
          </Button>
        ) : (
          <Button color="danger" style={{ marginLeft: 10 }}>
            <h4>Khóa tài khoản</h4>
          </Button>
        )}
      </td>
    </tr>
  );
};
export { HeaderTableCustomer, BodyTableCustomer };

const titleShipper = ['ID', 'Số điện thoại', 'Họ tên', 'Tình trạng'];
const HeaderTableShipper = () => (
  <thead>
    <tr>
      {titleShipper.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTableShipper = ({ user }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.phone}</td>
      <td>{user.name}</td>
      <td>{user.status}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/shipper/${user.id}`, { state: user });
          }}
        >
          <h4>Xem</h4>
        </Button>
        {user.status === 'Đã khóa' ? (
          <Button color="success" style={{ marginLeft: 10 }}>
            <h4>Mở khóa</h4>
          </Button>
        ) : (
          <Button color="danger" style={{ marginLeft: 10 }}>
            <h4>Khóa tài khoản</h4>
          </Button>
        )}
      </td>
    </tr>
  );
};
export { HeaderTableShipper, BodyTableShipper };
