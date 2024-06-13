import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Entry({ entryData, currentUserId }) {
  const { date, title, expense, description, nickname } = entryData;
  const { id: entryId, userId: entryUserId } = entryData;

  const navigate = useNavigate();

  function handleEntryClick() {
    //Todo. 여기서 권한체크하는 것이 좋은지 질문
    if (currentUserId !== entryUserId) {
      alert('다른 사람이 쓴 글은 수정할 수 없습니다.');
      return;
    }

    navigate(`/detail/${entryId}`);
  }

  return (
    <StEntryDiv onClick={handleEntryClick}>
      <p> 작성자: {nickname}</p>
      <p> 날짜: {date} </p>
      <p> 제목: {title} </p>
      <p> 지출: {expense} 원 </p>
      <StP> 내용: {description} </StP>
    </StEntryDiv>
  );
}

const StEntryDiv = styled.div`
  border: 1px black solid;
  border-radius: 10px;
  height: 200px;
  padding: 10px;

  &:hover {
    background-color: lightskyblue;
  }
`;

const StP = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Entry;
