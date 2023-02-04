import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import GlobalStyles from './global/GlobalStyles';
import AlertContextProvider from './context/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertContextProvider>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </AlertContextProvider>,
);
