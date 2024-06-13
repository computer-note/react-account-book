import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//가계부항목 관리
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

//현재 선택된 월을 관리
import AppContextProvider from './context/AppContextProvider';

//현재 앱의 인증상태를 관리
import AuthContextProvider from './context/AuthContextProvider';

//Tanstack Query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </AuthContextProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
