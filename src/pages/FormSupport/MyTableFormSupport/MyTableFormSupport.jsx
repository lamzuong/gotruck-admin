import styles from './MyTableFormSupport.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';
import { formatDateFull } from '~/global/formatDateCustom';
import { useSelector } from 'react-redux';
import formFeedbackAPI from '~/api/formFeedback';

const cx = classNames.bind(styles);

const title = [
  'Mã đơn',
  'Mã người dùng',
  'Họ tên',
  'Chủ đề',
  'Tình trạng',
  'Thời gian gửi',
  'Hành động',
];
const HeaderTable = ({ hiddenAction }) => (
  <thead>
    <tr>
      {title.map((e, i) => {
        let item = '';
        if (e === 'Tình trạng') {
          hiddenAction === true ? (item = 'Người xử lý') : (item = e);
        } else if (e === 'Thời gian gửi') {
          hiddenAction === true ? (item = 'Thời gian xử lý xong') : (item = e);
        } else item = e;
        return <th key={i}>{item}</th>;
      })}
    </tr>
  </thead>
);
const BodyTable = ({ item, hiddenAction }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleReceive = async (item) => {
    const dataSend = item;
    dataSend.status = 'Đã tiếp nhận';
    dataSend.id_handler = user._id;
    const resAPI = await formFeedbackAPI.put(dataSend);
    if (resAPI.id_handler !== user._id) {
      alert('Đơn đã được xử lý bởi admin khác');
    } else {
      navigate('/form-support');
    }
  };

  const handleComplete = async (item) => {
    const dataSend = item;
    dataSend.status = 'Đã xong';
    dataSend.id_handler = user._id;
    const resAPI = await formFeedbackAPI.put(dataSend);
    if (resAPI.id_handler !== user._id) {
      alert('Đơn đã được xử lý bởi admin khác');
    } else {
      navigate('/form-support');
    }
  };
  return (
    <tr>
      <td>{item.id_feedback}</td>
      <td>{item.id_sender.id_cus}</td>
      <td>{item.id_sender.name}</td>
      <td>{item.subject}</td>
      {hiddenAction ? <td>{item.id_handler.fullname}</td> : <td>{item.status}</td>}
      <td>{hiddenAction ? formatDateFull(item.date_complete) : formatDateFull(item.createdAt)}</td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            navigate(`/form-support/support-detail/${item.id_feedback}`, { state: item });
          }}
        >
          <h4>Xem</h4>
        </Button>

        {item.status === 'Đã tiếp nhận' && !hiddenAction ? (
          <Button
            color="success"
            onClick={() => {
              handleComplete(item);
            }}
            className={cx('button')}
          >
            <h4>Xử lý xong</h4>
          </Button>
        ) : item.status === 'Đã gửi' && !hiddenAction ? (
          <Button
            color="dark"
            onClick={() => {
              handleReceive(item);
            }}
            className={cx('button')}
          >
            <h4>Tiếp nhận</h4>
          </Button>
        ) : null}
      </td>
    </tr>
  );
};
export { HeaderTable, BodyTable };
