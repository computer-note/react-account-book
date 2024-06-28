import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Header from './Header';

import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import LoginPage from './../pages/LoginPage';
import SignupPage from './../pages/SignupPage';
import MyPage from './../pages/MyPage';

import { useContext, useEffect } from 'react';

import { AuthContext } from '../context/AuthContextProvider';

// function PublicRouter() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     //질문 아래 alert 사용시 오래걸리는 이유
//     //alert('로그인을 해주세요');
//     navigate('/login');
//   }, []);

//   return <></>;
// }

//로그인을 한 유저가 PublicRoute에 접근할 경우 마이페이지로 리다이렉트
function PublicRoute({ element: PageComponent, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    alert('로그인이 되어있습니다. 마이페이지로 이동합니다.');
  }

  return !isAuthenticated ? (
    <PageComponent {...rest} />
  ) : (
    <Navigate to='/mypage' />
  );
}

//로그인 하지 않은 유저가 PrivateRoute에 접근할 경우 로그인페이지로 리다이렉트
function PrivateRoute({ element: PageComponent, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    alert('로그인이 되어있지 않습니다. 로그인페이지로 이동합니다.');
  }

  return isAuthenticated ? (
    <PageComponent {...rest} />
  ) : (
    <Navigate to='/login' />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route
          path='/login'
          element={<PublicRoute element={<LoginPage />} />}
        /> */}
        <Route
          path='/'
          element={<PrivateRoute element={HomePage} />}
        />
        <Route
          path='/detail'
          element={<PrivateRoute element={DetailPage} />}
        />
        <Route
          path='/mypage'
          element={<PrivateRoute element={MyPage} />}
        />

        <Route
          path='/login'
          element={<PublicRoute element={LoginPage} />}
        />
        <Route
          path='/signup'
          element={<PublicRoute element={SignupPage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
