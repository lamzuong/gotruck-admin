import styles from './MyTableFormWithdraw.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { convertMoney } from '~/global/functionGlobal';

const cx = classNames.bind(styles);

const title = [
  'Mã đơn',
  'Mã người gửi',
  'Tình trạng',
  'Số tiền cần rút',
  'Thời gian gửi',
  'Hành động',
];
const HeaderTable = () => (
  <thead>
    <tr>
      {title.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);
const BodyTable = ({ item, showConfirm }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.user.id}</td>
      <td>{item.status}</td>
      <td>{convertMoney(item.money, 'đ')}</td>
      <td>{item.time}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-withdraw/withdraw-detail/${item.id}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>
        {item.status === 'Chưa xử lý' && (
          <Button color="success" style={{ marginLeft: 10 }} onClick={showConfirm}>
            <h4>Xác nhận xong</h4>
          </Button>
        )}
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
