import styles from './ContactUser.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'reactstrap';

const cx = classNames.bind(styles);

function ContactUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;

  const chat = [
    {
      sender: 'admin',
      mess: 'Chúng tôi đã xem hình ảnh minh chứng và còn một số điều cần làm rõ',
      img: [],
    },
    {
      sender: 'admin',
      mess: 'Hình ảnh đó còn thiếu về đơn hàng của bạn mong bạn gửi thêm hình ảnh minh chứng',
      img: [],
    },
    { sender: item.sender.id, mess: 'Dạ bên bạn chờ mình xíu nhé', img: [] },
    {
      sender: item.sender.id,
      mess: 'Mình gửi ạ',
      img: [
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
      ],
    },
    {
      sender: item.sender.id,
      mess: '',
      img: [
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
        'https://salt.tikicdn.com/cache/w1200/ts/product/6e/8e/24/a253072a098918e947099fb5683f0401.jpg',
      ],
    },
    { sender: item.sender.id, mess: 'Bên admin giải quyết giúp e', img: [] },
  ];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className={cx('icon')}
          onClick={() => navigate(-1)}
        />
        <div className={cx('name')}>{item.sender.name}</div>
        <div></div>
      </div>
      <div className={cx('body')}>
        {chat.map((e, i) => (
          <div key={i}>
            {e.sender === 'admin' ? (
              <div className={cx('mess-admin')}>
                <div className={cx('txt-mess-admin')}>{e.mess}</div>
                <div className={cx('view-image')}>
                  {e.img?.map((e1, i1) => (
                    <img src={e1} key={i1} className={cx('image')} />
                  ))}
                </div>
              </div>
            ) : (
              <div className={cx('mess-user')}>
                <div className={cx('txt-mess-user')}>{e.mess}</div>
                <div className={cx('view-image')}>
                  {e.img?.map((e1, i1) => (
                    <img src={e1} key={i1} className={cx('image')} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={cx('footer')}>
        <div className={cx('')}></div>
        <Input className={cx('input')} placeholder="Nhập tin nhắn..." />
        <FontAwesomeIcon icon={faPaperPlane} className={cx('icon')} />
      </div>
    </div>
  );
}

export default ContactUser;
