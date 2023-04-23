import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import { convertMoney } from '~/global/functionGlobal';

function HistoryDetail(props) {
  const location = useLocation();
  const item = location.state;
  return (
    <Table bordered>
      <thead>
        <tr>
          {/* <th>Tỉnh/Thành phố</th> */}
          <th>Dịch vụ</th>
          <th>
            Giá cước <p style={{ color: '#04af46' }}>tối thiểu 2km</p> đầu tiên
          </th>
          <th>Giá cước mỗi km tiếp theo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* <th rowSpan={5}>Toàn quốc</th> */}
          <td>{item[0].truck}</td>
          <td>{convertMoney(item[0].priceMin, ' đ')}</td>
          <td>{convertMoney(item[0].priceEachKm, ' đ')}</td>
        </tr>
        {item.map((e, i) =>
          i !== 0 ? (
            <tr key={i}>
              <td>{e.truck}</td>
              <td>{convertMoney(e.priceMin, ' đ')}</td>
              <td>{convertMoney(e.priceEachKm, ' đ')}</td>
            </tr>
          ) : null,
        )}
      </tbody>
    </Table>
  );
}

export default HistoryDetail;
