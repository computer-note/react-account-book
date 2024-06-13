import Entry from './Entry';
import { styled } from 'styled-components';

import { useContext } from 'react';

import { AppContext } from '../context/AppContextProvider';

import { useQuery } from '@tanstack/react-query';
import { readAllAccountList } from '../axios/accountApi';

function EntryList() {
  const { selectedMonth } = useContext(AppContext);

  const accountListQuery = useQuery({
    queryFn: readAllAccountList,
    queryKey: ['accountList'],
  });

  const { isPending, isError, data: entryList } = accountListQuery;

  if (isPending || isError) {
    return <p>로딩 중 혹은 에러 발생</p>;
  }

  //Todo. 선택된 달에 맞춰서 필터링하는 로직 위로 빼기 + useMemo

  return (
    <StSection>
      <StP> {selectedMonth} 월의 가계부</StP>
      {entryList.map(entryData => {
        const entryMonth = Number(entryData.date.slice(5, 7));

        if (entryMonth === selectedMonth) {
          return <Entry key={entryData.id} entryData={entryData} />;
        }
      })}
    </StSection>
  );
}

const StSection = styled.section`
  border: 1px black solid;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StP = styled.p`
  font-size: x-large;
  background-color: lightcyan;
`;

export default EntryList;
