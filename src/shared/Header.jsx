import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import styled from 'styled-components';

function Header() {
  const { isAuthenticated, setAppStateLogOut } =
    useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogoutButtonClick() {
    //Todo. logout API 호출 후 응답 대기
    setAppStateLogOut();

    alert('로그아웃');
    navigate('/');
  }

  return (
    <StNav>
      <p>현재인증상태:{isAuthenticated.toString()}</p>
      {isAuthenticated ? (
        /* 인증상태 true이면 표시할 UI */
        <>
          <Link to='/mypage'>나의페이지</Link>
          <button onClick={handleLogoutButtonClick}>로그아웃</button>
        </>
      ) : (
        /* 인증상태 false이면 표시할 UI */
        <>
          <Link to='/login'>로그인</Link>
          <Link to='/signup'>회원가입</Link>
        </>
      )}
    </StNav>
  );

  // 이후 로그인 되었는데 로그인 페이지로 가거나 하는 경우를 테스트하기 편하게 하기 위한 세팅
  // return (
  //   <StNav>
  //     <p>현재인증상태:{isAuthenticated.toString()}</p>
  //     {/* 인증상태 true이면 표시할 UI */}
  //     <Link to='/mypage'>나의페이지</Link>
  //     <button>로그아웃</button>
  //     {/* 인증상태 false이면 표시할 UI */}
  //     <Link to='/login'>로그인</Link>
  //     <Link to='/signup'>회원가입</Link>
  //   </StNav>
  // );
}

//질문: StNav 정의 이전에 사용해도 되는 이유
const StNav = styled.nav`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 2rem;
  gap: 2rem;
  height: 6rem;
  font-size: 1.3rem;
  background-color: aliceblue;
`;

export default Header;
