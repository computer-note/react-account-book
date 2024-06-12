import { configureStore } from '@reduxjs/toolkit';
import entryListSlice from '../slices/entryListSlice';

const store = configureStore({
   reducer: { entryListSlice },
});

export default store;
