import InputField from './InputField';

import { useContext, useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';

//현재 선택된 월을 가져오는데 필요
import { AppContext } from '../context/AppContextProvider';

//유저 정보를 가져오는데 필요
import { requestUserInfo } from '../axios/authApi';
import { AuthContext } from '../context/AuthContextProvider';

//계정이 아니라 가계부항목을 의미 => Todo: 혼동안되는 이름으로 바꾸기
import { createAccount } from '../axios/accountApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  //Todo. Custom Hook으로 만들기
  const queryClient = useQueryClient();
  const createAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accountList']);
    },
  });

  function handleCreateButtonClick() {
    createAccountMutation.mutate({
      ...inputValues,
      nickname: userInfo.nickname,
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
