import styles from './MyTableFormVehicle.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { convertMoney } from '~/global/functionGlobal';
import { formatDateFull } from '~/global/formatDateCustom';

const cx = classNames.bind(styles);

const title = ['Mã đơn', 'Mã người gửi', 'Tình trạng', 'Thời gian gửi', 'Hành động'];
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
      <td>{item.id_truck}</td>
      <td>{item.id_shipper.id_shipper}</td>
      <td>{item.status}</td>
      <td>{formatDateFull(item.createdAt)}</td>
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
