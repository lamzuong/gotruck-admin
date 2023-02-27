import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const title = [
  'Mã đơn hàng',
  'Mã tài xế',
  'Tên tài xế',
  'Biển số xe',
  'Người gửi hàng',
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
      <td>{order.id}</td>
      <td>{order.shipper.id}</td>
      <td>{order.shipper.name}</td>
      <td>{order.shipper.numberTruck}</td>
      <td>{order.peopleSend.name}</td>
      <td>{order.status}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/order-detail/${order.id}`, { state: order });
          }}
        >
          <h4>Xem</h4>
        </Button>
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
