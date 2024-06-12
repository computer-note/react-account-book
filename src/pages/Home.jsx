import HomeInputField from './../components/HomeInputField';
import MonthSelector from './../components/MonthSelector';
import TotalMonthExpense from '../components/TotalMonthExpense';
import EntryList from './../components/EntryList';

function Home() {
   return (
      <>
         <HomeInputField />
         <MonthSelector />
         <TotalMonthExpense />
         <EntryList />
      </>
   );
}

export default Home;
