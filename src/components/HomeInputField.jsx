import InputField from './InputField';

import { useContext, useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';

//현재 선택된 월을 가져오는데 필요
import { AppContext } from '../context/AppContextProvider';

//유저 정보를 가져오는데 필요
import { requestUserInfo } from '../axios/authApi';
import { AuthContext } from '../context/AuthContextProvider';

//계정이 아니라 가계부항목을 의미 => Todo: 혼동안되는 이름으로 바꾸기
import useAccount from '../hooks/useAccount';

const StSection = styled.section`
  display: flex;
  margin: 50px 0px;
`;

const emptyEntryValues = () => {
  const todayYYYYMMDD = new Date().toISOString().slice(0, 10);
  return {
    date: todayYYYYMMDD,
    title: '',
    expense: 0,
    description: '',
  };
};

function HomeInputField() {
  const [inputValues, setInputValues] = useState(emptyEntryValues);
  const { setSelectedMonth } = useContext(AppContext);
  const inputFieldRef = useRef();

  //유저 정보를 가져오기 위해
  const { getAccessToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  const createAccountMutation = useAccount(
    api => api.createAccountMutation
  );

  function handleCreateButtonClick() {
    //가계부항목의 id는 이미 id라는 속성명으로 저장하고 있으므로
    //유저의 id는 userId라는 속성명으로 저장해야 한다.
    createAccountMutation.mutate({
      ...inputValues,
      nickname: userInfo.nickname,
      userId: userInfo.id, //다른 유저가 작성한 항목은 수정하지 못하도록 하기 위해 id도 저장한다
    }); // => mutate returns undefined

    alert('생성 완료');
    resetFieldAndState();
    setSelectedMonth(Number(inputValues.date.slice(5, 7)));
  }

  function resetFieldAndState() {
    inputFieldRef.current.reset();

    setInputValues(emptyEntryValues());
  }

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

  return (
    <StSection>
      <InputField
        ref={inputFieldRef}
        setInputValues={setInputValues}
        defaultValues={inputValues}
      />
      <button onClick={handleCreateButtonClick}> 생성 </button>
    </StSection>
  );
}
export default HomeInputField;
