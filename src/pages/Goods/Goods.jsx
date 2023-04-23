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
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Goods() {
  const [pageGoods, setPageGoods] = useState(1);
  const [totalGoods, setTotalGoods] = useState([]);
  const [goods, setGoods] = useState([]);
  const [rerenderGoods, setRerenderGoods] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const [modalGoods, setModalGoods] = useState(false);
  const [valueGoods, setValueGoods] = useState('');
  const [invalidGoods, setInvalidGoods] = useState(false);
  const [modalDeleteGoods, setModalDeleteGoods] = useState(false);
  const [valueDeleteGoods, setValueDeleteGoods] = useState('');
  const [modalUpdateGoods, setModalUpdateGoods] = useState(false);
  const [valueUpdateGoods, setValueUpdateGoods] = useState('');
  const [itemUpdate, setItemUpdate] = useState('');
  const [valueSearchGoods, setValueSearchGoods] = useState('');
  const [resultSearchGoods, setResultSearchGoods] = useState([]);
  const [totalResultSearchGoods, setTotalResultSearchGoods] = useState([]);
  const [pageSearchGoods, setPageSearchGoods] = useState(1);
  const [totalItem, setTotalItem] = useState(1);

  const toggleGoods = () => {
    setModalGoods(!modalGoods);
    setInvalidGoods(false);
  };

  const toggleDeleteGoods = (label) => {
    setValueDeleteGoods(label);
    setModalDeleteGoods(!modalDeleteGoods);
  };

  const toggleUpdateGoods = (label) => {
    setModalUpdateGoods(!modalUpdateGoods);
    setInvalidGoods(false);
  };
  // ================== Loại hàng hoá ==================
  useEffect(() => {
    const getAllGoods = async () => {
      const res = await goodsApi.getAll();

      setTotalGoods(res);
      const totalItemTemp = Math.ceil(res.length / 10);
      setTotalItem(totalItemTemp);
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

  useEffect(() => {
    for (let i = 0; i < totalGoods.length; i++) {
      if (valueUpdateGoods === totalGoods[i].value) {
        setInvalidGoods(true);
        return;
      }
    }
    setInvalidGoods(false);
  }, [valueUpdateGoods]);

  const handleAddGoods = async () => {
    try {
      await goodsApi.add({ value: valueGoods.trim(), label: valueGoods.trim() });
      toggleGoods();
      setRerenderGoods(!rerenderGoods);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateGoods = async () => {
    try {
      const dataSend = {
        id_good_update: itemUpdate._id,
        goodNew: {
          value: valueUpdateGoods,
          label: valueUpdateGoods,
          history: {
            oldValue: itemUpdate.value,
            newValue: valueUpdateGoods,
            modifiedAt: new Date(),
            modifiedBy: user._id,
          },
        },
      };
      await goodsApi.put(dataSend);
      toggleUpdateGoods();
      setRerenderGoods(!rerenderGoods);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGoods = async () => {
    try {
      const dataSend = {
        valueDeleteGoods: valueDeleteGoods,
        deletedAt: new Date(),
        deletedBy: user._id,
      };
      await goodsApi.delete(dataSend);
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
        if (debouncedGoods.trim() !== '') {
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
            disabled={invalidGoods || !valueGoods?.trim()}
            block
            className={cx('button-add')}
            onClick={handleAddGoods}
          >
            <h4>Thêm</h4>
          </Button>
        </div>
      </Modal>
      {/* Modal update goods */}
      <Modal isOpen={modalUpdateGoods} toggle={toggleUpdateGoods}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Nhập tên loại hàng hóa mới</div>
          <FormGroup>
            <Input
              value={valueUpdateGoods}
              onChange={(e) => setValueUpdateGoods(e.target.value)}
              bsSize="lg"
              invalid={invalidGoods}
              className={cx('input')}
            />
            <FormFeedback>Loại hàng hóa đã tồn tại</FormFeedback>
          </FormGroup>
          <Button
            color="primary"
            disabled={invalidGoods || !valueUpdateGoods?.trim()}
            block
            className={cx('button-add')}
            onClick={handleUpdateGoods}
          >
            <h4>Sửa</h4>
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
                      onClick={() => {
                        setItemUpdate(e);
                        setValueUpdateGoods(e.value);
                        toggleUpdateGoods(e.label);
                      }}
                    >
                      <h4>Sửa</h4>
                    </Button>
                    <Button
                      color="danger"
                      className={cx('button')}
                      onClick={() => toggleDeleteGoods(e.label)}
                    >
                      <h4>Xóa</h4>
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
              Tổng số trang: {currentPageGoods()} trên {totalItem}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goods;
