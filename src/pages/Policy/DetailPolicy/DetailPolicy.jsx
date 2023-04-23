import styles from '../Policy.module.scss';
import MyConfirm from '~/components/MyConfirm/MyConfirm';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import policyAPI from '~/api/policyAPI';
import HistoryButton from '~/components/HistoryButton/HistoryButton';
import { useSelector } from 'react-redux';
import { navigateToPolicy } from '~/global/functionGlobal';

const cx = classNames.bind(styles);

function DetailPolicy() {
  const user = useSelector((state) => state.auth.user);
  const url = window.location.href.slice(29);
  const info = navigateToPolicy(url);

  const [policy, setPolicy] = useState([]);
  const [policyChoose, setPolicyChoose] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rerender, setRerender] = useState(false);

  const navigate = useNavigate();
  const toForm = (policy) => {
    navigate('/policy/form', {
      state: {
        typePolicy: info.typePolicy,
        header: info.header,
        policy,
      },
    });
  };
  const handleDelete = async () => {
    try {
      await policyAPI.addPolicy({
        title: policyChoose.title,
        content: policyChoose.content,
        type: policyChoose.type,
        history: policyChoose.history,
        deletedAt: new Date(),
        deletedBy: user._id,
        hide: true,
      });

      await policyAPI.editPolicy({
        ...policyChoose,
        hide: true,
      });
      setShowModal(!showModal);
      setRerender(!rerender);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPolicy = async () => {
      try {
        const res = await policyAPI.getByType(info.typePolicy);
        setPolicy(res.filter((x) => x.hide === false));
      } catch (error) {
        console.log(error);
      }
    };
    getPolicy();
  }, [rerender, info.typePolicy]);

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
      <Button
        block
        color="primary"
        style={{ marginBottom: 20 }}
        onClick={() => toForm({ title: '', content: [] })}
      >
        <h4>Thêm mới</h4>
      </Button>
      <HistoryButton
        header={info.header}
        action={() => navigate(`/policy/history/${url}`, { state: { type: info.typePolicy } })}
      />
      {policy.length > 0 ? (
        policy.map(
          (e, i) =>
            e.hide === false && (
              <div key={i} className={cx('show-action')}>
                <div className={cx('inline-between')}>
                  <div className={cx('title')}>{e.title}</div>
                  <div className={cx('inline')}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={cx('icon')}
                      onClick={() => {
                        setShowModal(!showModal);
                        setPolicyChoose(e);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className={cx('icon')}
                      onClick={() => toForm(e)}
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
        )
      ) : (
        <div>Chưa có chính sách nào cả</div>
      )}
    </div>
  );
}

export default DetailPolicy;
