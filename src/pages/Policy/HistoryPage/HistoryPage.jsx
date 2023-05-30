import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import policyAPI from '~/api/policyAPI';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDateFull } from '~/global/formatDateCustom';
import MyPagination from '~/components/MyPagination/MyPagination';

function HistoryPage() {
  const navigate = useNavigate();
  const urlNow = window.location.href.slice(21);
  const arr = urlNow.split('/');
  let url = '';
  for (let i = 1; i < arr.length; i++) {
    url += '/' + arr[i];
  }
  const location = useLocation();
  const item = location.state;
  const [policy, setPolicy] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const total = await policyAPI.getByNoPageHistory({ type: item.type });
        setTotalItems(total);
        const res = await policyAPI.getByPageHistory({
          limit: 10,
          page: page,
          type: item.type,
        });
        setPolicy(
          res.sort(
            (a, b) =>
              new Date(b.deletedAt || b.history.modifiedAt) -
              new Date(a.deletedAt || a.history.modifiedAt),
          ),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPolicy();
  }, [page, item.type]);

  const checkModify = (item) => {
    if (item.deletedBy !== null) return 'Xóa bỏ';
    else if (item.history.oldValue?.title === null) return 'Thêm mới';
    else return 'Chỉnh sửa';
  };
  const peopleModify = (item) => {
    if (item.deletedBy !== null) return item.deletedBy.fullname;
    else return item.history.modifiedBy.fullname;
  };

  return (
    <div>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ fontSize: '150%', cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <h1 style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 15 }}>Lịch sử thay đổi</h1>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Thời gian thay đổi</th>
            <th>Loại thay đổi</th>
            <th>Người thay đổi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {policy.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td style={{ maxWidth: 300 }}>{e.title}</td>
              <td>
                {e.deletedBy === null
                  ? formatDateFull(e.history.modifiedAt)
                  : formatDateFull(e.deletedAt)}
              </td>
              <td>{checkModify(e)}</td>
              <td>{peopleModify(e)}</td>
              <td style={{ width: '10%' }}>
                <Button color="primary" onClick={() => navigate(`${url}/detail`, { state: e })}>
                  <h4>Xem</h4>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MyPagination setPage={setPage} page={page} totalItems={totalItems.length} />
    </div>
  );
}

export default HistoryPage;
