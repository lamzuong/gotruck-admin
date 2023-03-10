import styles from './Truck.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import truckAPI from '~/api/truckAPI';
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Truck() {
  // ======== State truck type ========

  const [pageTruck, setPageTruck] = useState(1);
  const [totalTruck, setTotalTruck] = useState([]);
  const [truck, setTruck] = useState([]);
  const [rerenderTruck, setRerenderTruck] = useState(false);

  const [modalTruck, setModalTruck] = useState(false);
  const [valueTruck, setValueTruck] = useState('');
  const [distanceLte2, setDistanceLte2] = useState('');
  const [distanceGt2, setDistanceGt2] = useState('');
  const [invalidTruck, setInvalidTruck] = useState(false);
  const [modalDeleteTruck, setModalDeleteTruck] = useState(false);
  const [valueDeleteTruck, setValueDeleteTruck] = useState('');

  const [valueSearchTruck, setValueSearchTruck] = useState('');
  const [resultSearchTruck, setResultSearchTruck] = useState([]);
  const [totalResultSearchTruck, setTotalResultSearchTruck] = useState([]);
  const [pageSearchTruck, setPageSearchTruck] = useState(1);
  const toggleTruck = () => {
    setModalTruck(!modalTruck);
    setInvalidTruck(false);
  };
  const toggleDeleteTruck = (weight) => {
    setValueDeleteTruck(weight);
    setModalDeleteTruck(!modalDeleteTruck);
  };
  // ================== Loại xe tải ==================
  const listTrucks = [2, 2, 2];
  useEffect(() => {
    const getAllTruck = async () => {
      const res = await truckAPI.getTruckType();
      setTotalTruck(res);
    };
    getAllTruck();
  }, [rerenderTruck]);
  // show truck type
  useEffect(() => {
    const getTruckType = async () => {
      try {
        const res = await truckAPI.getTruckTypePagination({ page: pageTruck, limit: 10 });
        let list = [];
        for (const e of res) {
          list.push({ value: e.name, label: 'Xe ' + e.name + ' tấn' });
        }
        setTruck(list);
      } catch (error) {
        console.log(error);
      }
    };
    getTruckType();
  }, [pageTruck, rerenderTruck]);
  // add, delete truck type
  useEffect(() => {
    for (let i = 0; i < totalTruck.length; i++) {
      if (+valueTruck === +totalTruck[i].name) {
        setInvalidTruck(true);
        return;
      }
    }
    setInvalidTruck(false);
  }, [valueTruck]);
  const handleAddTruck = async () => {
    try {
      const distance = await truckAPI.getAllDistance();
      const truck = await truckAPI.addTruckType({ name: +valueTruck });
      await truckAPI.addTruckPrice({
        id_truck_type: truck._id,
        id_distance: distance[0]._id,
        price: +distanceLte2,
        start_date: new Date(),
        end_date: new Date(),
      });
      await truckAPI.addTruckPrice({
        id_truck_type: truck._id,
        id_distance: distance[1]._id,
        price: +distanceGt2,
        start_date: new Date(),
        end_date: new Date(),
      });
      toggleTruck();
      setRerenderTruck(!rerenderTruck);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTruck = async () => {
    try {
      const truck = await truckAPI.getTruckTypeByName(+valueDeleteTruck);
      const truckPrice = await truckAPI.getTruckPriceByIdTruck(truck._id);
      await truckAPI.deleteTruckType(+valueDeleteTruck);
      for (const item of truckPrice) {
        await truckAPI.deleteTruckPrice(item._id);
      }
      toggleDeleteTruck();
      setRerenderTruck(!rerenderTruck);
    } catch (error) {
      console.log(error);
    }
  };
  // page
  const previousPageTruck = () => {
    if (valueSearchTruck === '') {
      if (pageTruck > 1) setPageTruck(pageTruck - 1);
    } else {
      if (pageSearchTruck > 1) setPageSearchTruck(pageSearchTruck - 1);
    }
  };
  const currentPageTruck = () => {
    if (valueSearchTruck === '') {
      if (truck.length === 0) return 0;
      return pageTruck;
    } else {
      if (resultSearchTruck.length === 0) return 0;
      return pageSearchTruck;
    }
  };
  const nextPageTruck = () => {
    if (valueSearchTruck === '') {
      if (pageTruck < Math.ceil(totalTruck.length / 10)) setPageTruck(pageTruck + 1);
    } else {
      if (pageSearchTruck < Math.ceil(totalResultSearchTruck.length / 10))
        setPageSearchTruck(pageSearchTruck + 1);
    }
  };
  const arrayTruckCurrent = () => {
    if (valueSearchTruck === '') {
      return truck;
    } else return resultSearchTruck;
  };

  return (
    <div className={cx('wrapper-table')}>
      {/* Modal add truck type */}
      <Modal isOpen={modalTruck} toggle={toggleTruck}>
        <div className={cx('wrapper-modal')}>
          <FormGroup>
            <Label>Nhập trọng tải cho xe cần thêm</Label>
            <Input
              onChange={(e) => setValueTruck(e.target.value)}
              bsSize="lg"
              invalid={invalidTruck}
              className={cx('input')}
            />
            <FormFeedback>Loại trọng tải đã tồn tại</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Giá tối thiểu 2km đầu tiên</Label>
            <Input
              onChange={(e) => setDistanceLte2(e.target.value)}
              bsSize="lg"
              className={cx('input')}
            />
          </FormGroup>
          <FormGroup>
            <Label>Giá mỗi km tiếp theo</Label>
            <Input
              onChange={(e) => setDistanceGt2(e.target.value)}
              bsSize="lg"
              className={cx('input')}
            />
          </FormGroup>
          <Button color="primary" block className={cx('button-add')} onClick={handleAddTruck}>
            <h4>Thêm</h4>
          </Button>
        </div>
      </Modal>
      {/* Modal delete goods type */}
      <Modal isOpen={modalDeleteTruck} toggle={toggleDeleteTruck}>
        <div className={cx('wrapper-modal')}>
          <div>Bạn có chắc muốn xóa loại xe tải {valueDeleteTruck} tấn ?</div>
          <div className={cx('wrapper-button')}>
            <Button color="primary" className={cx('button')} onClick={handleDeleteTruck}>
              <h4>OK</h4>
            </Button>
            <Button color="danger" className={cx('button')} onClick={() => toggleDeleteTruck('')}>
              <h4>Hủy</h4>
            </Button>
          </div>
        </div>
      </Modal>
      <div className={cx('title')}>Quản lý loại xe tải</div>
      <div className={cx('wrapper-header')}>
        <div className={cx('inline-center')}>
          <div className={cx('label')}>Tìm kiếm</div>
          <Input className={cx('input')} />
        </div>
        <Button size="lg" color="primary" onClick={toggleTruck}>
          <FontAwesomeIcon icon={faCirclePlus} />
          {'\t'}Thêm mới
        </Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>STT</th>
            <th>Loại xe tải</th>
          </tr>
        </thead>
        <tbody>
          {truck.map((e, i) => (
            <tr key={i}>
              <td>{(pageTruck - 1) * 10 + i + 1}</td>
              <td>{e.label}</td>
              <td>
                <Button color="danger" onClick={() => toggleDeleteTruck(e.value)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={cx('inline-around')}>
        <div></div>
        <div className={cx('wrapper-pagination')}>
          <Pagination size="lg">
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => pageTruck > 1 && setPageTruck(pageTruck - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{pageTruck}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                onClick={() =>
                  pageTruck < Math.ceil(listTrucks.length / 10) && setPageTruck(pageTruck + 1)
                }
              />
            </PaginationItem>
          </Pagination>
        </div>
        <div style={{ color: 'grey' }}>
          Tổng số trang: {currentPageTruck()} trên {Math.ceil(arrayTruckCurrent().length / 10)}
        </div>
      </div>
    </div>
  );
}

export default Truck;
