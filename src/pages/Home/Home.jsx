import styles from './Home.module.scss';
import { listTrucks } from './data';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, FormFeedback, FormGroup, Input, Label, Modal } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import goodsApi from '~/api/goodsAPI';
import useDebounce from '~/hook/useDebounce';
import truckAPI from '~/api/truckAPI';

const cx = classNames.bind(styles);

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [statistic, setStatistic] = useState('today');

  // ======== State goods type ========
  const [pageGoods, setPageGoods] = useState(1);
  const [totalGoods, setTotalGoods] = useState([]);
  const [goods, setGoods] = useState([]);
  const [rerenderGoods, setRerenderGoods] = useState(false);

  const [modalGoods, setModalGoods] = useState(false);
  const [valueGoods, setValueGoods] = useState('');
  const [invalidGoods, setInvalidGoods] = useState(false);
  const [modalDeleteGoods, setModalDeleteGoods] = useState(false);
  const [valueDeleteGoods, setValueDeleteGoods] = useState('');

  const [valueSearchGoods, setValueSearchGoods] = useState('');
  const [resultSearchGoods, setResultSearchGoods] = useState([]);
  const [totalResultSearchGoods, setTotalResultSearchGoods] = useState([]);
  const [pageSearchGoods, setPageSearchGoods] = useState(1);

  const toggleGoods = () => {
    setModalGoods(!modalGoods);
    setInvalidGoods(false);
  };
  const toggleDeleteGoods = (label) => {
    setValueDeleteGoods(label);
    setModalDeleteGoods(!modalDeleteGoods);
  };

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

  // =============== Bán kính nhận đơn ===============

  const [radiusShow, setRadiusShow] = useState(5);
  const [valueRadius, setValueRadius] = useState(5);
  const [showEditRadius, setShowEditRadius] = useState(false);
  const handleRadiusChange = (event) => {
    const limit = 2;
    setValueRadius(event.target.value.slice(0, limit));
  };
  const handleEditRadius = () => {
    setShowEditRadius(false);
    setRadiusShow(valueRadius);
    // call API
  };

  // ================== Loại hàng hoá ==================
  useEffect(() => {
    const getAllGoods = async () => {
      const res = await goodsApi.getAll();
      setTotalGoods(res);
    };
    getAllGoods();
  }, [rerenderGoods]);
  // show goods type
  useEffect(() => {
    const getGoodsType = async () => {
      try {
        const res = await goodsApi.getByPage({ page: pageGoods, limit: 10 });
        setGoods(res);
      } catch (error) {
        console.log(error);
      }
    };
    getGoodsType();
  }, [pageGoods, rerenderGoods]);
  // add, delete goods type
  useEffect(() => {
    for (let i = 0; i < totalGoods.length; i++) {
      if (valueGoods === totalGoods[i].value) {
        setInvalidGoods(true);
        return;
      }
    }
    setInvalidGoods(false);
  }, [valueGoods]);
  const handleAddGoods = async () => {
    try {
      await goodsApi.add({ value: valueGoods, label: valueGoods });
      toggleGoods();
      setRerenderGoods(!rerenderGoods);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteGoods = async () => {
    try {
      await goodsApi.delete(valueDeleteGoods);
      toggleDeleteGoods();
      setRerenderGoods(!rerenderGoods);
    } catch (error) {
      console.log(error);
    }
  };
  // search goods type
  const debouncedGoods = useDebounce(valueSearchGoods, 500);
  useEffect(() => {
    const searchGoods = async () => {
      try {
        if (debouncedGoods !== '') {
          const res = await goodsApi.search(debouncedGoods);
          setTotalResultSearchGoods(res);
          let list = [];
          for (let i = pageSearchGoods * 10 - 1; i >= (pageSearchGoods - 1) * 10; i--) {
            if (res[i]) list.push(res[i]);
          }
          setResultSearchGoods(list.reverse());
        } else {
          setResultSearchGoods([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchGoods();
  }, [debouncedGoods, rerenderGoods]);
  // page
  const previousPageGoods = () => {
    if (valueSearchGoods === '') {
      if (pageGoods > 1) setPageGoods(pageGoods - 1);
    } else {
      if (pageSearchGoods > 1) setPageSearchGoods(pageSearchGoods - 1);
    }
  };
  const currentPageGoods = () => {
    if (valueSearchGoods === '') {
      if (goods.length === 0) return 0;
      return pageGoods;
    } else {
      if (resultSearchGoods.length === 0) return 0;
      return pageSearchGoods;
    }
  };
  const nextPageGoods = () => {
    if (valueSearchGoods === '') {
      if (pageGoods < Math.ceil(totalGoods.length / 10)) setPageGoods(pageGoods + 1);
    } else {
      if (pageSearchGoods < Math.ceil(totalResultSearchGoods.length / 10))
        setPageSearchGoods(pageSearchGoods + 1);
    }
  };
  const arrayGoodsCurrent = () => {
    if (valueSearchGoods === '') {
      return goods;
    } else return resultSearchGoods;
  };

  // ================== Loại xe tải ==================
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

  // Biểu đồ doanh thu
  const data = {
    labels: ['Mon', 'Tue', 'Web', 'Tue', 'Web'],
    datasets: [
      {
        label: 'Doanh thu theo ngày',
        data: [10251320, 102332306, 32012319, 252523454, 523452343],
        borderColor: 'blue',
        tension: 0.2,
      },
    ],
  };
  const options = {};
  const optionsStatis = [
    { value: 'today', label: 'Thống kê hôm nay' },
    { value: 'week', label: 'Thống kê theo tuần' },
    { value: 'month', label: 'Thống kê theo tháng' },
    { value: 'specific', label: 'Thống kê theo ngày cụ thể' },
  ];
  useEffect(() => {
    const date = new Date();
    if (statistic.value === 'today') {
      setStartDate(date);
    } else if (statistic.value === 'week') {
      date.setDate(date.getDate() - 7);
      setStartDate(date);
    } else if (statistic.value === 'month') {
      date.setMonth(date.getMonth() - 1);
      setStartDate(date);
    }
  }, [statistic]);
  const handleChangeDate = () => {};

  return (
    <div className={cx('wrapper')}>
      {/* Modal add goods type */}
      <Modal isOpen={modalGoods} toggle={toggleGoods}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Nhập tên loại hàng hóa cần thêm</div>
          <FormGroup>
            <Input
              onChange={(e) => setValueGoods(e.target.value)}
              bsSize="lg"
              invalid={invalidGoods}
              className={cx('input')}
            />
            <FormFeedback>Loại hàng hóa đã tồn tại</FormFeedback>
          </FormGroup>
          <Button
            color="primary"
            disabled={invalidGoods}
            block
            className={cx('button-add')}
            onClick={handleAddGoods}
          >
            <h4>Thêm</h4>
          </Button>
        </div>
      </Modal>
      {/* Modal delete goods type */}
      <Modal isOpen={modalDeleteGoods} toggle={toggleDeleteGoods}>
        <div className={cx('wrapper-modal')}>
          <div>Bạn có chắc muốn xóa loại hàng hóa ' {valueDeleteGoods} ' ?</div>
          <div className={cx('wrapper-button')}>
            <Button color="primary" className={cx('button')} onClick={handleDeleteGoods}>
              <h4>OK</h4>
            </Button>
            <Button color="danger" className={cx('button')} onClick={() => toggleDeleteGoods('')}>
              <h4>Hủy</h4>
            </Button>
          </div>
        </div>
      </Modal>
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
      {/* Thống kê doanh thu */}
      <div className={cx('wrapper-statistic')}>
        <div className={cx('title')}>Thống kê doanh thu</div>
        <div className={cx('inline')}>
          <div className={cx('graph-view')}>
            <Line data={data} options={options}></Line>
          </div>
          <div className={cx('wrapper-search')}>
            <div>
              <Select
                options={optionsStatis}
                defaultValue={optionsStatis[0]}
                onChange={setStatistic}
              />
              {statistic.value === 'specific' && (
                <>
                  <div className={cx('wrapper-date')}>
                    <div className={cx('view-date')}>
                      <div>Ngày bắt đầu</div>
                      <input
                        type="date"
                        className={cx('input-date')}
                        onChange={handleChangeDate}
                        defaultValue={startDate.toISOString().substring(0, 10)}
                      />
                    </div>
                    <div className={cx('view-date')}>
                      <div>Ngày kết thúc</div>
                      <input
                        type="date"
                        className={cx('input-date')}
                        onChange={handleChangeDate}
                        defaultValue={endDate.toISOString().substring(0, 10)}
                      />
                    </div>
                  </div>
                  <Button block color="primary" className={cx('btn-search')}>
                    <div className={cx('txt-search')}>Tìm kiếm</div>
                  </Button>
                </>
              )}
            </div>
            {/* Ban kinh nhan don cua shipper */}
            <div className={cx('wrapper-radius')}>
              <div className={cx('radius-view')}>
                <div className={cx('title-mini')}>Bán kính nhận đơn:</div>
                <span className={cx('txt-value')}>{radiusShow} km</span>
                {!showEditRadius && (
                  <span className={cx('button-edit')} onClick={() => setShowEditRadius(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                )}
              </div>
              {showEditRadius && (
                <div className={cx('wrapper-input')}>
                  <div className={cx('inline-center')}>
                    <Input
                      bsSize="lg"
                      type="number"
                      max={2}
                      value={valueRadius}
                      onChange={handleRadiusChange}
                    />
                    <div style={{ marginLeft: 10 }}>km</div>
                  </div>
                  <div className={cx('wrapper-button')}>
                    <Button
                      color="primary"
                      size="lg"
                      className={cx('button')}
                      onClick={handleEditRadius}
                    >
                      OK
                    </Button>
                    <Button
                      color="danger"
                      size="lg"
                      className={cx('button')}
                      onClick={() => setShowEditRadius(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Quản lý loại hàng hóa và loại xe */}
      <div className={cx('inline-between')}>
        {/* Hàng hoá */}
        <div className={cx('wrapper-table')}>
          <div className={cx('title')}>Quản lý loại hàng hóa</div>
          <div className={cx('wrapper-header')}>
            <div className={cx('inline-center')}>
              <div className={cx('label')}>Tìm kiếm</div>
              <Input
                className={cx('input')}
                onChange={(e) => setValueSearchGoods(e.target.value)}
                value={valueSearchGoods}
              />
            </div>
            <Button size="lg" color="primary" onClick={toggleGoods}>
              <FontAwesomeIcon icon={faCirclePlus} />
              {'\t'}Thêm mới
            </Button>
          </div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>STT</th>
                <th>Loại hàng hóa</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {arrayGoodsCurrent().map((e, i) => (
                <tr key={i}>
                  <td>{(currentPageGoods() - 1) * 10 + i + 1}</td>
                  <td>{e.label}</td>
                  <td>
                    <Button color="danger" onClick={() => toggleDeleteGoods(e.label)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {arrayGoodsCurrent().length <= 0 && <div>Không có loại hàng hóa nào</div>}
          <div className={cx('wrapper-pagination')}>
            <Pagination size="lg">
              <PaginationItem>
                <PaginationLink previous onClick={previousPageGoods} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{currentPageGoods()}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next onClick={nextPageGoods} />
              </PaginationItem>
            </Pagination>
          </div>
          <div style={{ color: 'grey' }}>
            Tổng số trang: {currentPageGoods()} trên {Math.ceil(arrayGoodsCurrent().length / 10)}
          </div>
        </div>
        {/* Xe tải */}
        <div className={cx('wrapper-table')}>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
