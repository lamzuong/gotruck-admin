import styles from '../Policy.module.scss';
import data from '../data';
import MyConfirm from '~/components/MyConfirm/MyConfirm';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SecurityPolicy() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toForm = (title, content) => {
    navigate('/policy/form', {
      state: {
        policyId: 4,
        header: 'Quy chế hoạt động',
        title,
        content,
      },
    });
  };
  const handleDelete = () => {
    console.log(1);
  };

  return (
    <div className={cx('wrapper-policy')}>
      {showModal && (
        <MyConfirm
          setShow={setShowModal}
          show={showModal}
          title={'Bạn có chắc muốn xóa chính sách này không ?'}
          action={handleDelete}
        />
      )}
      <Button block color="primary" style={{ marginBottom: 20 }} onClick={() => toForm('', '')}>
        <h4>Thêm mới</h4>
      </Button>
      <div className={cx('title-header')}>Điều khoản cho khách hàng</div>
      {data.map(
        (e, i) =>
          e.policyId === 1 && (
            <div key={i}>
              <div className={cx('inline-between')}>
                <div className={cx('title')}>{e.title}</div>
                <div className={cx('inline')}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={cx('icon')}
                    onClick={() => setShowModal(!showModal)}
                  />
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={cx('icon')}
                    onClick={() => toForm(e.title, e.content)}
                  />
                </div>
              </div>
              <ul className={cx('content')}>
                {e.content.map((e1, i1) => (
                  <li key={i1}>{e1}</li>
                ))}
              </ul>
            </div>
          ),
      )}
    </div>
  );
}

export default SecurityPolicy;
