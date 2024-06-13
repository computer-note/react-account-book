import { useContext } from 'react';
import Entry from './Entry';
import { styled } from 'styled-components';
import { AppContext } from '../context/AppContextProvider';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { readAllAccountList } from '../axios/accountApi';

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

function EntryList() {
  //const entryList = useSelector(state => state.entryListSlice);
  const { selectedMonth } = useContext(AppContext);

  const accountListQuery = useQuery({
    queryFn: readAllAccountList,
    queryKey: ['accountList'],
  });
  console.log('accountListQuery ↓');
  console.dir(accountListQuery);

  const { isPending, isError, data: entryList } = accountListQuery;

  if (isPending || isError) {
    return <p>로딩 중 혹은 에러 발생</p>;
  }

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
export default EntryList;
