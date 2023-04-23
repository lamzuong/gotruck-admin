import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import MyPagination from '~/components/MyPagination/MyPagination';
import priceAPI from '~/api/priceAPI';
import { formatDateFull } from '~/global/formatDateCustom';
import { convertMoney } from '~/global/functionGlobal';

function HistoryChange() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getFormRegister = async () => {
      try {
        const total = await priceAPI.getByNoPageHistory();
        setTotalItems(total);
        const res = await priceAPI.getByPageHistory({
          limit: 10,
          page: page,
        });
        setData([...res]);
      } catch (error) {
        console.log(error);
      }
    };
    getFormRegister();
  }, [page]);

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
            {/* <th>Mã</th> */}
            <th>Người thay đổi</th>
            <th>Giá cũ</th>
            <th>Giá mới</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr key={i}>
              {/* <td>{e.id_history_price}</td> */}
              <td>{e.modifiedBy.fullname}</td>
              <td>{convertMoney(e.old_price, ' đ')}</td>
              <td>{convertMoney(e.new_price, ' đ')}</td>
              <td>{formatDateFull(e.start_date)}</td>
              <td>{formatDateFull(e.end_date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MyPagination setPage={setPage} page={page} totalItems={totalItems.length} />
    </div>
  );
}

export default HistoryChange;
