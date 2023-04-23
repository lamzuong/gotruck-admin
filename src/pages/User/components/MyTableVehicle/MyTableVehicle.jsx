import styles from './MyTableVehicle.module.scss';

import classNames from 'classnames/bind';
const { faTruck } = require('@fortawesome/free-solid-svg-icons');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const cx = classNames.bind(styles);

const title = ['Tên phương tiện', 'Biển số xe', 'Giấy tờ xe', 'Hình ảnh xe', 'Xe đang chạy'];

const HeaderTableVehicle = () => {
  return (
    <thead>
      <tr>
        {title.map((e, i) => (
          <th key={i}>{e}</th>
        ))}
      </tr>
    </thead>
  );
};
const BodyTableVehicle = ({ item, setImageChoose, openModal }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.license_plate}</td>
      <td>
        {item.list_vehicle_registration.map((e, i) => (
          <img
            src={e}
            key={i}
            className={cx('image-paper')}
            alt={e}
            onClick={() => {
              openModal();
              setImageChoose(e);
            }}
          />
        ))}
      </td>
      <td>
        {item.list_image_info.map((e, i) => (
          <img
            src={e}
            key={i}
            className={cx('image-paper')}
            alt={e}
            onClick={() => {
              openModal();
              setImageChoose(e);
            }}
          />
        ))}
      </td>
      <td>{item.default ? <FontAwesomeIcon icon={faTruck} /> : ''}</td>
    </tr>
  );
};
export { HeaderTableVehicle, BodyTableVehicle };
