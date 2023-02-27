import styles from './Home.module.scss';
import listGoods from './data';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, FormFeedback, FormGroup, Input, Modal } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
  const [page, setPage] = useState(1);
  const [goods, setGoods] = useState([]);
  const [modal, setModal] = useState(false);

  const [valueGoods, setValueGoods] = useState('');
  const [invalid, setInvalid] = useState(false);

  const [radiusShow, setRadiusShow] = useState(5);
  const [valueRadius, setValueRadius] = useState(5);
  const [showEditRadius, setShowEditRadius] = useState(false);

  const toggle = () => setModal(!modal);
  const handleEditRadius = () => {
    setShowEditRadius(false);
    setRadiusShow(valueRadius);
    // call API
  };

  useEffect(() => {
    let list = [];
    for (let i = page * 10 - 1; i >= (page - 1) * 10; i--) {
      if (listGoods[i]) list.push(listGoods[i]);
    }
    setGoods(list.reverse());
  }, [page]);

  useEffect(() => {
    for (let i = 0; i < listGoods.length; i++) {
      if (+valueGoods === listGoods[i].value) {
        setInvalid(true);
        return;
      }
    }
    setInvalid(false);
  }, [valueGoods]);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <div className={cx('wrapper-modal')}>
          <div className={cx('title')}>Nhập tên loại hàng hóa cần thêm</div>
          <FormGroup>
            <Input
              onChange={(e) => setValueGoods(e.target.value)}
              bsSize="lg"
              invalid={invalid}
              className={cx('input')}
            />
            <FormFeedback>Loại hàng hóa đã tồn tại</FormFeedback>
          </FormGroup>
          <Button color="primary" block className={cx('button-add')}>
            <h4>Thêm</h4>
          </Button>
        </div>
      </Modal>
      <div className={cx('block-1')}>
        {/* Category goods */}
        <div className={cx('wrapper-table')}>
          <div className={cx('wrapper-header')}>
            <b>Loại hàng hóa hiện có</b>
            <Button size="lg" color="primary" onClick={toggle}>
              <FontAwesomeIcon icon={faCirclePlus} />
              {'\t'}Thêm mới
            </Button>
          </div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>STT</th>
                <th>Loại hàng hóa</th>
              </tr>
            </thead>
            <tbody>
              {goods.map((e, i) => (
                <tr key={i}>
                  <td>{(page - 1) * 10 + i + 1}</td>
                  <td>{e.label}</td>
                  <td>
                    <Button color="danger">Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className={cx('wrapper-pagination')}>
            <Pagination size="lg">
              <PaginationItem>
                <PaginationLink previous onClick={() => page > 1 && setPage(page - 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  next
                  onClick={() => page < Math.ceil(listGoods.length / 10) && setPage(page + 1)}
                />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
        {/* Radius receive goods */}
        <div className={cx('wrapper-radius')}>
          <b>Bán kính nhận đơn:</b>
          <span className={cx('txt-value')}>{radiusShow} km</span>
          {!showEditRadius ? (
            <span className={cx('button-edit')} onClick={() => setShowEditRadius(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          ) : (
            <div className={cx('wrapper-input')}>
              <Input bsSize="lg" type="number" onChange={(e) => setValueRadius(e.target.value)} />
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
  );
}

export default Home;
