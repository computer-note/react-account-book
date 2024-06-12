import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StDiv = styled.div`
   border: 1px black solid;
   border-radius: 10px;
   height: 200px;

   &:hover {
      background-color: lightskyblue;
   }
`;

const StP = styled.p`
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

function Entry(props) {
   const { date, title, expense, description, id } = props.entryData;

   const navigate = useNavigate();

   function handleEntryClick() {
      const url = `/Detail/${id}`;
      navigate(url);
   }

   return (
      <StDiv onClick={handleEntryClick}>
         <p> 날짜: {date} </p>
         <p> 제목: {title} </p>
         <p> 지출: {expense} 원 </p>
         <StP> 내용: {description} </StP>
      </StDiv>
   );
}
export default Entry;
