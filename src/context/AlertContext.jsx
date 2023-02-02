import React, { createContext, useState } from 'react';
import Alert from '~/components/MyAlert/MyAlert';

export const AlertContext = createContext({});

const AlertContextProvider = ({ children }) => {
  const [Alerts, setAlerts] = useState([]);

  function Message() {
    let id = (Math.random() * 100 + 100).toLocaleString();
    let res = {
      success: function (message, autoClose = true, duration = 1000) {
        console.log(message, autoClose, duration);
        setAlerts((state) => [
          ...state,
          {
            message,
            autoClose,
            type: 'success',
            id,
          },
        ]);
        if (autoClose) {
          return setTimeout(() => {
            setAlerts((state) => state.filter((value) => value.id !== id));
          }, duration);
        }
      },
      error: function (message, autoClose = true, duration = 1000) {
        console.log(message, autoClose, duration);
        setAlerts((state) => [
          ...state,
          {
            message,
            autoClose,
            type: 'error',
            id,
          },
        ]);
        if (autoClose) {
          return setTimeout(() => {
            setAlerts((state) => state.filter((value) => value.id !== id));
          }, duration);
        }
      },
      warning: function (message, autoClose = true, duration = 1000) {
        console.log(message, autoClose, duration);
        setAlerts((state) => [
          ...state,
          {
            message,
            autoClose,
            type: 'warning',
            id,
          },
        ]);
        if (autoClose) {
          return setTimeout(() => {
            setAlerts((state) => state.filter((value) => value.id !== id));
          }, duration);
        }
      },
    };
    return res;
  }
  function onClose(id) {
    setAlerts((state) => state.filter((value) => value.id !== id));
  }
  return (
    <AlertContext.Provider value={{ Message: Message }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {Alerts?.length !== 0 &&
          Alerts.map((alert) => (
            <Alert
              key={alert.id}
              type={alert.type}
              message={alert.message}
              autoClose={alert.autoClose}
              id={alert.id}
              onClose={onClose}
            />
          ))}
      </div>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContextProvider;
