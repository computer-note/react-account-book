import { createContext, useState } from 'react';

const AppContext = createContext(null);

const getTodayMonth = () => {
  return Number(new Date().getMonth()) + 1;
};

function AppContextProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState(getTodayMonth);
  return (
    <AppContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppContextProvider;
