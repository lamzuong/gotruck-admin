import styles from './MyTableFormSupport.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const title = ['Mã đơn', 'Người gửi', 'Chủ đề', 'Tình trạng', 'Thời gian', 'Hành động'];
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
      <td>{item.sender.name}</td>
      <td>{item.subject}</td>
      <td>{item.status}</td>
      <td>{item.time}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-support/support-detail/${item.id}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>
        {item.status === 'Đã tiếp nhận' ? (
          <Button color="success" onClick={() => {}} className={cx('button')}>
            <h4>Xử lý xong</h4>
          </Button>
        ) : item.status === 'Chưa tiếp nhận' ? (
          <Button color="dark" onClick={() => {}} className={cx('button')}>
            <h4>Tiếp nhận</h4>
          </Button>
        ) : null}
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
