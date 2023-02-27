import styles from './MyTableFormRegister.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const title = ['Mã đơn', 'Người gửi', 'Tình trạng', 'Thời gian', 'Hành động'];
const HeaderTable = () => (
  <thead>
    <tr>
      {title.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTable = ({ item }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.status}</td>
      <td>{item.time}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-register/register-detail/${item.id}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
