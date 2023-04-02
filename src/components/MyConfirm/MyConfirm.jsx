import styles from './MyConfirm.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'reactstrap';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MyConfirm({ setShow, show, title, action }) {
  const [showModal, setShowModal] = useState(show);
  useEffect(() => {
    setShowModal(show);
    setShow(show);
  }, [show]);
  const handleShow = () => {
    setShowModal(!showModal);
    setShow(!showModal);
  };
  return (
    <Modal isOpen={showModal} toggle={handleShow}>
      <div className={cx('wrapper')}>
        <div>{title}</div>
        <div className={cx('view-button')}>
          <Button className={cx('button')} color="primary" onClick={action}>
            <h4>Có</h4>
          </Button>
          <Button className={cx('button')} color="danger" onClick={handleShow}>
            <h4>Hủy</h4>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default MyConfirm;
