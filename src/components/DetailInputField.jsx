import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputField from './InputField';

import { useDispatch } from 'react-redux';
import {
   modifyEntry,
   removeEntry,
} from '../redux/slices/entryListSlice';

import styled from 'styled-components';

const StColumnOrientedInputField = styled(InputField)`
   display: flex;
   flex-direction: column;
`;

function DetailInputField({ currentEntry }) {
   const [inputValues, setInputValues] = useState(currentEntry);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   function handleModifyButtonClick() {
      const newEntryData = {
         ...inputValues,
         id: currentEntry.id,
      };

      for (const key in newEntryData) {
         if (newEntryData[key] === '') {
            const defaultValue = `기본 ${key} ${currentEntry.id}`;
            newEntryData[key] = defaultValue;
         }
      }

      //Todo: 이전값에서 바뀐 내용이 없으면 수정을 요청하지 않는다.
      dispatch(modifyEntry({ ...newEntryData }));

      setInputValues({ ...newEntryData });

      alert('수정 완료');
   }

   function handleDeleteButtonClick() {
      //Todo: 바로 삭제하지 않고 확인 모달을 추가한다.

      dispatch(removeEntry(currentEntry.id));

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
export default DetailInputField;
