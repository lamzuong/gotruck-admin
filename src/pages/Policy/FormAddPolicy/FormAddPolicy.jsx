import styles from './FormAddPolicy.module.scss';
import policyAPI from '~/api/policyAPI';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { useSelector } from 'react-redux';
import { navigateBackPolicy } from '~/global/functionGlobal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FormAddPolicy() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const item = location.state;

  const action = item.policy.title === '' ? 'Add' : 'Edit';

  const navigate = useNavigate();
  const [title, setTitle] = useState(item.policy.title);
  const [content, setContent] = useState('');

  useEffect(() => {
    let result = '';
    for (const text of item.policy?.content) {
      result += text + '\n';
    }
    setContent(result);
  }, [item.policy?.content]);

  const handleSave = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Tiêu đề và nội dung không được dể trống');
      return;
    }
    await policyAPI.addPolicy({
      title: title,
      content: content
        .trim()
        .split('\n')
        .filter((x) => x.trim() !== ''),
      type: item.typePolicy,
      history: {
        oldValue: {
          title: null,
          content: [],
        },
        modifiedAt: new Date(),
        modifiedBy: user._id,
      },
      deletedAt: null,
      deletedBy: null,
      hide: false,
    });
    navigate(`/policy/${navigateBackPolicy(item.typePolicy)}`);
  };

  const handleEdit = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Tiêu đề và nội dung không được dể trống');
      return;
    }
    await policyAPI.addPolicy({
      title: title,
      content: content
        .trim()
        .split('\n')
        .filter((x) => x.trim() !== ''),
      type: item.typePolicy,
      history: {
        oldValue: {
          title: item.policy.title,
          content: item.policy.content,
        },
        modifiedAt: new Date(),
        modifiedBy: user._id,
      },
      deletedAt: null,
      deletedBy: null,
      hide: true,
    });
    await policyAPI.editPolicy({
      _id: item.policy._id,
      title: title,
      content: content
        .trim()
        .split('\n')
        .filter((x) => x.trim() !== ''),
      type: item.typePolicy,
      history: item.policy.history,
      deletedAt: null,
      deletedBy: null,
      hide: false,
    });
    navigate(`/policy/${navigateBackPolicy(item.typePolicy)}`);
  };
  return (
    <div>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ fontSize: '150%', cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <div style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 15 }}>{item.header}</div>
      </div>

      <FormGroup>
        <Label>Tiêu đề</Label>
        <Input className={cx('input')} value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Nội dung</Label>
        <Input
          type="textarea"
          className={cx('area')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormGroup>
      <Button color="primary" block onClick={action === 'Add' ? handleSave : handleEdit}>
        <h4>Lưu</h4>
      </Button>
    </div>
  );
}

export default FormAddPolicy;
