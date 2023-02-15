import styles from './MyInput.module.scss';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function MyInput({
  data,
  valid,
  initValue = '',
  placeholder,
  error,
  hideErr = true,
  regex,
  checkEmpty = false,
  inputName = false,
  iconLeft,
}) {
  useEffect(() => {
    setHideError(hideErr);
  }, [hideErr]);
  useEffect(() => {
    setValueInput(initValue);
  }, [initValue]);

  const [valueInput, setValueInput] = useState(initValue);
  const [hideError, setHideError] = useState(hideErr);

  const removeAscent = (str) => {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  };
  const validate = (text) => {
    if (inputName) return regex.test(removeAscent(text));
    else return regex.test(text);
  };
  const isEmpty = (text) => {
    return text.trim() === '';
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('form-control')}>
        {iconLeft ? <div className={cx('icon-left')}>{iconLeft}</div> : null}
        <input
          className={cx('input')}
          onChange={(e) => {
            setValueInput(e.target.value);
            data(e.target.value);
            if (regex) valid(validate(e.target.value));
            if (valid) valid(!isEmpty(e.target.value));
          }}
          value={valueInput}
          placeholder={placeholder}
          onBlur={() => {
            if (regex) if (!validate(valueInput)) setHideError(false);
            if (checkEmpty) if (isEmpty(valueInput)) setHideError(false);
          }}
          onClick={() => {
            setHideError(true);
          }}
        />
      </div>
      {!hideError ? (
        <div className={cx('txt-error')}>{isEmpty(valueInput) ? 'Không được để trống' : error}</div>
      ) : null}
    </div>
  );
}

export default MyInput;
