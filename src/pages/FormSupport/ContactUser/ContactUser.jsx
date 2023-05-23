import styles from './ContactUser.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import conversationAPI from '~/api/conversation';
import GlobalStyles from '~/global/GlobalStyles';
import { socketClient } from '~/api/socket';

const cx = classNames.bind(styles);

function ContactUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.state;
  const historyChat = location.state.historyChat;
  const [conversation, setConversation] = useState();
  const [listMess, setListMessage] = useState([]);
  const [mess, setMess] = useState();
  const user = useSelector((state) => state.auth.user);
  const [feedback, setFeedback] = useState(item);

  const getAllMessage = async () => {
    console.log(conversation);
    const listMess = await conversationAPI.getMessage(conversation._id);
    listMess.reverse();
    setListMessage(listMess);
  };

  useEffect(() => {
    const getMessage = async () => {
      const resConversation = await conversationAPI.getConversation({
        id_customer: feedback?.id_sender?._id,
        id_admin: user?._id,
        id_form: feedback?._id,
        form_model: 'FeedBack',
      });

      setConversation(resConversation);
      const listMess = await conversationAPI.getMessage(resConversation._id);
      listMess.reverse();
      setListMessage(listMess);
    };
    getMessage();
  }, []);

  useEffect(() => {
    socketClient.off('message' + user._id);
    socketClient.on('message' + user._id, (data) => {
      getAllMessage();
    });
  });

  const handleSend = async () => {
    const messageSend = {
      id_conversation: conversation._id,
      message: mess.trim(),
      id_sender: user._id,
      userSendModel: 'Admin',
      // id_sender: feedback.id_sender._id,
      // userSendModel: 'Customer',
    };
    if (mess.trim()) {
      const resMess = await conversationAPI.postMessage(messageSend);
      if (resMess.disable) {
        alert('Đơn đã xử lý xong nên không thể trò chuyện tiếp');
      } else {
        socketClient.emit('send_message', { id_receive: feedback.id_sender._id });
        setMess('');
        getAllMessage();
      }
    }
    setMess('');
  };
  function enterKey(e) {
    if (e.key === 'Enter') handleSend();
  }

  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' năm trước';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' tháng trước';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' ngày trước';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' giờ trước';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' phút trước';
    }
    return 'Vừa gửi';
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className={cx('icon')}
          onClick={() => navigate(-1)}
        />
        <div className={cx('name')}>{item?.id_sender?.name}</div>
        <div></div>
      </div>
      <div className={cx('body')} style={{ height: 500 }}>
        {listMess.map((e, i) => (
          <React.Fragment key={i}>
            <div key={i} style={{ marginBottom: 10 }}>
              {e.userSendModel === 'Admin' ? (
                <div className={cx('time-admin')}>
                  <div className={cx('time-mess-admin')}>{timeSince(new Date(e.createdAt))}</div>
                </div>
              ) : (
                <div className={cx('time-user')}>
                  <div className={cx('time-mess-user')}>{timeSince(new Date(e.createdAt))}</div>
                </div>
              )}
            </div>
            <div>
              {e.userSendModel === 'Admin' ? (
                <div className={cx('mess-admin')}>
                  <div className={cx('txt-mess-admin')}>{e.message}</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    src={e.id_sender.avatar}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  ></img>
                  <div className={cx('mess-user')}>
                    <div className={cx('txt-mess-user')}>{e.message}</div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      {!historyChat ? (
        <div className={cx('footer')}>
          <div className={cx('')}></div>
          <Input
            value={mess}
            className={cx('input')}
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setMess(e.target.value)}
            onKeyDown={(e) => enterKey(e)}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            color="#04af46"
            className={cx('icon')}
            onClick={() => handleSend()}
          />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: 30,
            alignItems: 'center',
          }}
        >
          Đơn đã xử lý xong
        </div>
      )}
    </div>
  );
}

export default ContactUser;
