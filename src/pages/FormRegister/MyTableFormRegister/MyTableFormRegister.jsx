import styles from './MyTableFormRegister.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { formatDateFull } from '~/global/formatDateCustom';

const cx = classNames.bind(styles);

const title = ['Mã đơn', 'Người gửi', 'Số điện thoại', 'Thời gian gửi', 'Hành động'];
const HeaderTable = () => (
  <thead>
    <tr>
      {title.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);

const titleHistory = [
  'Mã đơn',
  'Người gửi',
  'Số điện thoại',
  'Thời gian gửi',
  'Người xử lý',
  'Thời gian xử lý',
  'Hành động',
];
const HeaderTableHistory = () => {
  return (
    <thead>
      <tr>
        {titleHistory.map((e, i) => (
          <th key={i}>{e}</th>
        ))}
      </tr>
    </thead>
  );
};

const BodyTable = ({ item }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{item.id_form}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{formatDateFull(item.createdAt)}</td>
      {item.status !== 'Chưa duyệt' && <td>{item.id_handler.fullname}</td>}
      <td>{item.status !== 'Chưa duyệt' ? formatDateFull(item.approval_date) : 'Chưa xử lý'} </td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-register/register-detail/${item.id_shipper}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable, HeaderTableHistory };
