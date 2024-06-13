import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import Header from './Header';
import MyPage from './../pages/MyPage';
import LoginPage from './../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
