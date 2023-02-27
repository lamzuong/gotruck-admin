import styles from './MyTablePrice.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const HeaderTableEditOne = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th>
          Giá cước <p style={{ color: '#04af46' }}>tối thiểu 2km</p> đầu tiên
        </th>
        <th>Giá cước mỗi km tiếp theo</th>
      </tr>
    </thead>
  );
};
const HeaderTableEditAll = () => {
  return (
    <thead>
      <tr>
        <th>Dịch vụ</th>
        <th>
          Giá cước <p style={{ color: '#04af46' }}>tối thiểu 2km</p> đầu tiên
        </th>
        <th>Giá cước mỗi km tiếp theo</th>
      </tr>
    </thead>
  );
};
export { HeaderTableEditOne, HeaderTableEditAll };
