import styles from './FormAddPolicy.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';

const cx = classNames.bind(styles);

function FormAddPolicy() {
  const location = useLocation();
  const item = location.state;
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState('');
  useEffect(() => {
    let result = '';
    for (const text of item.content) {
      result += text + '\n';
    }
    setContent(result);
  }, []);
  const handleSave = () => {
    console.log(content.split('\n'));
  };

  return (
    <div>
      <div className={cx('title-header')}>{item.header}</div>
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
      <Button color="primary" block onClick={handleSave}>
        <h4>Lưu</h4>
      </Button>
    </div>
  );
}

export default FormAddPolicy;
