import { useContext, useRef, useState } from 'react';
import InputField from './InputField';
import { styled } from 'styled-components';
import { AppContext } from '../context/AppContextProvider';
import { useDispatch } from 'react-redux';
import { addEntry } from '../redux/slices/entryListSlice';
import { v4 as uuidv4 } from 'uuid';

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
  const inputFieldRef = useRef();

  const dispatch = useDispatch();
  const { setSelectedMonth } = useContext(AppContext);

  function handleCreateButtonClick() {
    dispatch(addEntry({ ...inputValues, id: uuidv4() }));
    setSelectedMonth(Number(inputValues.date.slice(5, 7)));

    resetFieldAndState();

    alert('생성 완료');
  }

  function resetFieldAndState() {
    inputFieldRef.current.reset();

    setInputValues(emptyEntryValues());
  }

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
