import styles from './MyTableFormWithdraw.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { convertMoney } from '~/global/functionGlobal';
import { formatDateFull } from '~/global/formatDateCustom';

const cx = classNames.bind(styles);

const title = [
  'Mã đơn',
  'Mã người gửi',
  // 'Tình trạng',
  'Số tiền cần rút',
  'Thời gian gửi',
  'Hành động',
];
const titleHistory = [
  'Mã đơn',
  'Mã người gửi',
  // 'Tình trạng',
  'Số tiền cần rút',
  'Thời gian xử lý xong',
  'Người xử lý',
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

const HeaderTableHistory = () => (
  <thead>
    <tr>
      {titleHistory.map((e, i) => (
        <th key={i}>{e}</th>
      ))}
    </tr>
  </thead>
);

const BodyTable = ({ item, showConfirm, history }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{item.id_transaction_history}</td>
      <td>{item.id_shipper?.id_shipper}</td>
      {/* <td>{item.status}</td> */}
      <td>{convertMoney(item.money, 'đ')}</td>
      <td>{history ? formatDateFull(item.approval_date) : formatDateFull(item.createdAt)}</td>
      {item.status === 'Đã xử lý' && <td>{item.id_handler.fullname}</td>}
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-withdraw/withdraw-detail/${item._id}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>
        {/* {item.status === 'Đang xử lý' && (
          <Button color="success" style={{ marginLeft: 10 }} onClick={showConfirm}>
            <h4>Xác nhận xong</h4>
          </Button>
        )} */}
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable, HeaderTableHistory };
