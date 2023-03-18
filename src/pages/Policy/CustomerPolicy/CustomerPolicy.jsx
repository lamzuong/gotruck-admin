import styles from '../Policy.module.scss';
import data from '../data';

import React from 'react';
import classNames from 'classnames/bind';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CustomerPolicy() {
  const navigate = useNavigate();
  const toForm = (title, content) => {
    navigate('/policy/form', {
      state: {
        policyId: 1,
        header: 'Điều khoản cho khách hàng',
        title,
        content,
      },
    });
  };
  return (
    <div className={cx('wrapper-policy')}>
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
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={cx('icon')}
                  onClick={() => toForm(e.title, e.content)}
                />
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

export default CustomerPolicy;
