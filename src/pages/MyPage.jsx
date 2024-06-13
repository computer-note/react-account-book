import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { requestUserInfo } from '../axios/authApi';

function MyPage() {
  const { isAuthenticated, getAccessToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      //로그인된 경우에만 정보를 가져온다
      if (!isAuthenticated) {
        return;
      }

      const accessToken = getAccessToken();
      try {
        const response = await requestUserInfo(accessToken);
        /* response {
          data: avatar, id, nickname, success
        } */

        const { id, nickname } = response.data;
        setUserInfo({ id, nickname });

        return response;
      } catch (err) {
        //Todo. 유효하지 않은 엑세스 토큰을 사용한 경우 처리
        console.log('err ↓');
        console.dir(err);
      }
    }

    getUserInfo();
  }, []);

  if (!isAuthenticated) {
    return <p>로그인을 해주세요</p>;
  }

  if (!userInfo) {
    return <p>유저 정보 로딩 중</p>;
  }

  // 실수: return을 빼먹어서 실행이 계속 아래로 내려갔다.
  // 아래 코드는 userInfo가 null이 아닌 것을 전제하고 있다.
  // if (!userInfo) {
  //   <p>유저 정보 로딩 중</p>;
  // }

  return (
    <main>
      <p>유저아이디: {userInfo.id}</p>
      <p>유저닉네임: {userInfo.nickname}</p>
    </main>
  );
}

/* 콘솔로그 순서가 왜 Promise -> Object 순으로 찍히는지 조사
  useEffect(() => {
    async function getUserInfo() {
      const accessToken = getAccessToken();

      try {
        const response = await requestUserInfo(accessToken);
        console.log('1, response ↓');
        console.dir(response);

        return response;
      } catch (err) {
        console.log('err ↓');
        console.dir(err);
      }
    }

    //로그인된 경우에만 정보를 가져온다
    if (isAuthenticated) {
      const response = getUserInfo();
      console.log('2. response ↓');
      console.dir(response);
    }
  }, []);
*/

export default MyPage;
