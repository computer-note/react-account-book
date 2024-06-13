import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//가계부항목 상태관리
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

//현재 선택된 월을 관리
import AppContextProvider from './context/AppContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Provider>
  </React.StrictMode>
);
