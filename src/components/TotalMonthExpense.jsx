import styled from 'styled-components';

import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';

import { useQuery } from '@tanstack/react-query';
import { readAllAccountList } from '../axios/accountApi';

//Todo: 유틸리티 모듈로 빼기
function extractMonthFromDate(date) {
  //YYYY-MM-DD => MM
  return date.slice(5, 7);
}

function TotalMonthExpense() {
  const { selectedMonth } = useContext(AppContext);

  //Todo: 가져올 때 월별로 filter해서 가져오는 API있는지 알아보기
  const accountListQuery = useQuery({
    queryFn: readAllAccountList,
    queryKey: ['accountList'],
  });

  //Todo: DB에서는 가계부항목을 Account라고 부르는데 클라이언트에서는 Entry라고 부르는 문제 해결하기
  const { isPending, isError, data: entryList } = accountListQuery;

  if (isPending || isError) {
    return <p>로딩 중 혹은 에러 발생</p>;
  }

  //Todo: 적절한 Memoization 적용하기
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

const StDiv = styled.div`
  background-color: mediumaquamarine;
  height: 100px;
  width: 500px;
  border-radius: 20px;
  font-size: xx-large;
  display: flex;
  align-items: center;
`;

export default TotalMonthExpense;
