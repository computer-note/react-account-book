import Entry from './Entry';
import { styled } from 'styled-components';

import { useContext, useState, useEffect } from 'react';

import { AppContext } from '../context/AppContextProvider';

import { AuthContext } from '../context/AuthContextProvider';
import { requestUserInfo } from '../axios/authApi';

import useAccount from '../hooks/useAccount';

function EntryList() {
  const { selectedMonth } = useContext(AppContext);

  const accountListQuery = useAccount(
    api => api.readAllAccountListQuery
  );

  const { isPending, isError, data: entryList } = accountListQuery;

  //Todo. 현재 로그인된 유저 정보 => 전역상태에 저장해놓도록 바꾸기
  //유저 정보를 가져오기 위해
  const { getAccessToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const accessToken = getAccessToken();
      try {
        const response = await requestUserInfo(accessToken);
        const { id, nickname } = response.data;
        setUserInfo({ id, nickname });
      } catch (err) {
        console.dir(err);
      }
    }

    getUserInfo();
  }, []);

  if (isPending || isError || !userInfo) {
    return <p>로딩 중 혹은 에러 발생</p>;
  }

  //Todo. 선택된 달에 맞춰서 필터링하는 로직 위로 빼기 + useMemo
  return (
    <StSection>
      <StP> {selectedMonth} 월의 가계부</StP>
      {entryList.map(entryData => {
        const entryMonth = Number(entryData.date.slice(5, 7));

        if (entryMonth === selectedMonth) {
          return (
            <Entry
              key={entryData.id}
              entryData={entryData}
              currentUserId={userInfo.id}
            />
          );
        }
      })}
    </StSection>
  );
}

const StSection = styled.section`
  border: 1px black solid;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StP = styled.p`
  font-size: x-large;
  background-color: lightcyan;
`;

export default EntryList;
