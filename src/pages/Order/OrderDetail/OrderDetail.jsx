import styles from './OrderDetail.module.scss';
import { convertMoney } from '~/global/functionGlobal';
import customStyles from './styleModal';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function OrderDetail() {
  const location = useLocation();
  const item = location.state;

  const a = 'https://res.cloudinary.com/dicpaduof/image/upload/v1675313687/giaohang_ldpzlr.jpg';

  const img = [];
  for (let i = 0; i < 20; i++) {
    img.push(a);
  }

  const div_1_left_title = [
    { title: 'Mã đơn hàng', content: item.id },
    { title: 'Tài xế', content: item.shipper.id + ' - ' + item.shipper.name },
    { title: 'Biển số xe', content: item.shipper.numberTruck },
  ];
  const div_1_right_title = [
    { title: 'Người gửi', content: item.peopleSend.name },
    { title: 'Số điện thoại', content: item.peopleSend.phone },
    { title: 'Người nhận', content: item.peopleReceive.name },
    { title: 'Số điện thoại', content: item.peopleReceive.phone },
  ];

  const [imageChoose, setImageChoose] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={cx('wrapper')}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={cx('cover-img')}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={'white'}
            size={'2x'}
            className={cx('icon-close')}
            onClick={closeModal}
          />
          <img src={imageChoose} className={cx('show-img')} />
        </div>
      </Modal>
      {/* div 1 */}
      <div>
        <Container>
          <Row>
            <Col className="">
              {div_1_left_title.map((e, i) => (
                <Row key={i}>
                  <div className={cx('row-info')}>
                    <div className={cx('label')}>{e.title}</div>
                    <div className={cx('content')}>{e.content}</div>
                  </div>
                </Row>
              ))}
            </Col>
            <Col className="">
              {div_1_right_title.map((e, i) => (
                <Row key={i}>
                  <div className={cx('row-info')}>
                    <div className={cx('label')}>{e.title}</div>
                    <div className={cx('content')}>{e.content}</div>
                  </div>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      {/* div 2 */}
      <div>
        <Container>
          <Row>
            <div className={cx('row-info')}>
              <div className={cx('label')}>Giao từ</div>
              <div className={cx('content')}>{item.peopleSend.address}</div>
            </div>
          </Row>
          <Row>
            <div className={cx('row-info')}>
              <div className={cx('label')}>Tới</div>
              <div className={cx('content')}>{item.peopleReceive.address}</div>
            </div>
          </Row>
          {/* foot div 2 */}
          <Row xs="2">
            <Col>
              <div className={cx('row-info')}>
                <div className={cx('label')}>Tình trạng</div>
                <div className={cx('content')}>{item.status}</div>
              </div>
            </Col>
            <Col>
              <div className={cx('row-info')}>
                <div className={cx('label')}>Tiền vận chuyển</div>
                <div className={cx('content')}>{convertMoney(item.priceTransport, 'VNĐ')}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* div 3 */}
      <div className={cx('div3')}>
        <Container>
          <Row>
            <div className={cx('img-place')}>
              <div className={cx('title')}>Hình ảnh lúc lấy hàng</div>
              <div className={cx('cover-image')}>
                {img.map((e, i) => (
                  <img
                    src={e}
                    className={cx('image')}
                    key={i}
                    onClick={() => {
                      openModal();
                      setImageChoose(e);
                    }}
                  />
                ))}
              </div>
            </div>
          </Row>
          <Row>
            <div className={cx('img-place')}>
              <div className={cx('title')}>Hình ảnh lúc giao hàng</div>
              <div className={cx('cover-image')}>
                {img.map((e, i) => (
                  <img
                    src={e}
                    className={cx('image')}
                    key={i}
                    onClick={() => {
                      openModal();
                      setImageChoose(e);
                    }}
                  />
                ))}
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default OrderDetail;