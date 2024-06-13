import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Entry({ entryData }) {
  const { date, title, expense, description, nickname, id } =
    entryData;

  const navigate = useNavigate();

  function handleEntryClick() {
    navigate(`/detail/${id}`);
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
