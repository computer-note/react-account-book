import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <StNav>
      {/* 인증상태 false이면 표시할 UI */}
      <Link to='/login'>로그인</Link>
      <Link to='/signup'>회원가입</Link>

      {/* 인증상태 true이면 표시할 UI */}
      <Link to='/mypage'>나의페이지</Link>
      <button>로그아웃</button>
    </StNav>
  );
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
