import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { styled } from 'styled-components';

const StSection = styled.section`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
`;

const StDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props =>
    props.$isSelected ? 'lightblue' : 'beige'};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props =>
      props.$isSelected ? '' : 'goldenrod'};
  }
`;

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useContext(AppContext);

  function handleMonthClick(event) {
    const newSelectedMonth = Number(event.target.dataset.value);
    setSelectedMonth(newSelectedMonth);
  }

  return (
    <StSection>
      {months.map(month => {
        const isSelected = selectedMonth === month;
        return (
          <StDiv
            onClick={handleMonthClick}
            key={month}
            $isSelected={isSelected}
            data-value={month}
          >
            {month}월
          </StDiv>
        );
      })}
    </StSection>
  );
}
export default MonthSelector;
