import InputField from './InputField';
import styled from 'styled-components';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAccount from '../hooks/useAccount';

function DetailInputField({ currentEntry }) {
  const [inputValues, setInputValues] = useState(currentEntry);
  const navigate = useNavigate();

  const updateAccountMutation = useAccount(
    api => api.updateAccountMutation
  );

  const deleteAccountByIdMutation = useAccount(
    api => api.deleteAccountByIdMutation
  );

  function handleModifyButtonClick() {
    const newEntryData = {
      ...inputValues,
      id: currentEntry.id,
    };

    //Todo. 디폴트값 채워주는 로직을 다른 곳으로 뺄 수 있으면 빼기
    for (const key in newEntryData) {
      if (newEntryData[key] === '') {
        const defaultValue = `기본 ${key} ${currentEntry.id}`;
        newEntryData[key] = defaultValue;
      }
    }

    //Question mutate 완료까지 wait 되는 것인지?
    updateAccountMutation.mutate(newEntryData);

    alert('수정 완료');
    setInputValues({ ...newEntryData });
  }

  function handleDeleteButtonClick() {
    //Question 삭제 완료까지 wait 되는 것인지?
    deleteAccountByIdMutation.mutate(currentEntry.id);

    alert('삭제 완료');
    navigate('/');
  }

  return (
    <>
      <StColumnOrientedInputField
        defaultValues={inputValues}
        setInputValues={setInputValues}
      />
      <button onClick={handleModifyButtonClick}>수정하기</button>
      <button onClick={handleDeleteButtonClick}>삭제하기</button>
    </>
  );
}

const StColumnOrientedInputField = styled(InputField)`
  display: flex;
  flex-direction: column;
`;

export default DetailInputField;
