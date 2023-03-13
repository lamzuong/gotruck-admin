import data from './data';
import styles from './HistoryChange.module.scss';

import classNames from 'classnames/bind';
import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function HistoryChange() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={cx('title-header')}>Lịch sử thay đổi</div>
      <Table striped>
        <thead>
          <tr>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr key={i}>
              <td>{e.start}</td>
              <td>{e.end || 'Hiện tại'}</td>
              <td>{e.content}</td>
              <td>
                <i
                  className={cx('underline')}
                  onClick={() => {
                    navigate(`/history-change/${e.id}`, { state: e.price });
                  }}
                >
                  Xem chi tiết
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HistoryChange;
