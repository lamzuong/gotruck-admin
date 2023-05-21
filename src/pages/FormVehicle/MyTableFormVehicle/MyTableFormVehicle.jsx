import styles from './MyTableFormVehicle.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { convertMoney } from '~/global/functionGlobal';
import { formatDateFull } from '~/global/formatDateCustom';

const cx = classNames.bind(styles);

const title = ['Mã đơn', 'Mã người gửi', 'Tình trạng', 'Thời gian gửi', 'Hành động'];
const HeaderTable = ({ history }) => {
  let listTitle = [];
  for (const item of title) {
    if (item === 'Thời gian gửi' && history) {
      listTitle.push('Thời gian xử lý xong');
      listTitle.push('Người xử lý');
    } else listTitle.push(item);
  }
  return (
    <thead>
      <tr>
        {listTitle.map((e, i) => (
          <th key={i}>{e}</th>
        ))}
      </tr>
    </thead>
  );
};

const BodyTable = ({ item, history }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{item.id_truck}</td>
      <td>{item.id_shipper?.id_shipper}</td>
      <td>{item.status}</td>
      <td>{history ? formatDateFull(item.approval_date) : formatDateFull(item.createdAt)}</td>
      {history && <td>{item.id_handler.fullname}</td>}
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-vehicle/vehicle-detail/${item.id}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
