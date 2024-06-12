import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { AppContext } from '../context/AppContext';
import styled from 'styled-components';

const StDiv = styled.div`
   background-color: mediumaquamarine;
   height: 100px;
   width: 500px;
   border-radius: 20px;
   font-size: xx-large;
   display: flex;
   align-items: center;
`;

function extractMonthFromDate(date) {
   //YYYY-MM-DD
   return date.slice(5, 7);
}

function TotalMonthExpense() {
   const entryList = useSelector(state => state.entryListSlice);
   const { selectedMonth } = useContext(AppContext);

   const totalMonthExpense = entryList
      .filter(entry => {
         const entryMonth = +extractMonthFromDate(entry.date);
         return entryMonth === selectedMonth;
      })
      .reduce((expense, curEntry) => {
         return expense + curEntry.expense;
      }, 0);

   return (
      <StDiv>
         {selectedMonth}월의 총 지출액: {totalMonthExpense} 원
      </StDiv>
   );
}
export default TotalMonthExpense;
