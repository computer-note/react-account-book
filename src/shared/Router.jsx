import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Header from './Header';
import HomePage from '../pages/HomePage';
import LoginPage from './../pages/LoginPage';
import SignupPage from './../pages/SignupPage';
import MyPage from './../pages/MyPage';
import DetailPage from '../pages/DetailPage';

import { useContext, useEffect } from 'react';

import { AuthContext } from '../context/AuthContextProvider';

function PublicRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    //질문 아래 alert 사용시 오래걸리는 이유
    //alert('로그인을 해주세요');
    navigate('/login');
  }, []);

  return <></>;
}

function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated ? (
        //로그인시 접근 가능한 페이지
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
        </Routes>
      ) : (
        //비로그인시 리다이렉트되는 페이지 => PublicRouter
        <Routes>
          <Route path='/' element={<PublicRouter />} />
          <Route path='/mypage' element={<PublicRouter />} />
          <Route path='/detail/:id' element={<PublicRouter />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
