import styles from './Goods.module.scss';
import goodsApi from '~/api/goodsAPI';
import useDebounce from '~/hook/useDebounce';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Goods() {
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

  return (
    <div>
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
                    <Button
                      color="warning"
                      className={cx('button')}
                      onClick={() => toggleDeleteGoods(e.label)}
                    >
                      Sửa
                    </Button>
                    <Button
                      color="danger"
                      className={cx('button')}
                      onClick={() => toggleDeleteGoods(e.label)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {arrayGoodsCurrent().length <= 0 && <div>Không có loại hàng hóa nào</div>}
          <div className={cx('inline-around')}>
            <div></div>
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
        </div>
      </div>
    </div>
  );
}

export default Goods;
