import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const title = [
  'Mã đơn hàng',
  'Mã tài xế',
  'Tên tài xế',
  'Biển số xe',
  'Mã khách hàng',
  'Tình trạng',
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
const BodyTable = ({ order }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{order.id_order}</td>
      <td>{order.shipper?.id_shipper?.id_shipper || <i>Chưa có</i>}</td>
      <td>{order.shipper?.id_shipper?.name || <i>Chưa có</i>}</td>
      <td>{order.shipper?.truck?.license_plate || <i>Chưa có</i>}</td>
      <td>{order.id_customer.id_cus}</td>
      <td>{order.status}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/order-detail/${order.id_order}`, { state: order });
          }}
        >
          <h4>Xem</h4>
        </Button>
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
