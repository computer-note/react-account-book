import InputField from './InputField';
import styled from 'styled-components';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteAccountById,
  updateAccount,
} from '../axios/accountApi';

function DetailInputField({ currentEntry }) {
  const [inputValues, setInputValues] = useState(currentEntry);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const updateAccountMutation = useMutation({
    mutationFn: updatedAccount => updateAccount(updatedAccount),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const deleteAccountByIdMutation = useMutation({
    mutationFn: accountId => deleteAccountById(accountId),
    onSuccess: () => queryClient.invalidateQueries(),
  });

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

    updateAccountMutation.mutate(newEntryData);

    alert('수정 완료');
    setInputValues({ ...newEntryData });
  }

  function handleDeleteButtonClick() {
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
