import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Home from './pages/Home';
import Detail from './pages/Detail';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

const GlobalStyle = createGlobalStyle`
	${reset}
`;

const getTodayMonth = () => {
   return Number(new Date().getMonth()) + 1;
};

function App() {
   const [selectedMonth, setSelectedMonth] = useState(getTodayMonth);

   return (
      <>
         <GlobalStyle />
         <BrowserRouter>
            <Provider store={store}>
               <AppContext.Provider
                  value={{ selectedMonth, setSelectedMonth }}
               >
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/Detail/:id' element={<Detail />} />
                  </Routes>
               </AppContext.Provider>
            </Provider>
         </BrowserRouter>
      </>
   );
}

export default App;
