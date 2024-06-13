import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import DetailInputField from '../components/DetailInputField';
import { useSelector } from 'react-redux';

const StSection = styled.section`
  background-color: lightyellow;
  padding: 50px;
`;

function DetailPage() {
  const params = useParams();
  const entryList = useSelector(state => state.entryListSlice);
  const [currentEntry, _] = useState(getCurrentValues);
  const navigate = useNavigate();

  //주의: entryList와 param을 초기화한 후 사용
  function getCurrentValues() {
    const currentEntry = entryList.find(
      entry => entry.id === params.id
    );

    return { ...currentEntry };
  }

  function handleBackButtonClick() {
    navigate('/');
  }

  return (
    <StSection>
      <DetailInputField currentEntry={currentEntry} />
      <button onClick={handleBackButtonClick}> 뒤로가기 </button>
    </StSection>
  );
}
export default DetailPage;
