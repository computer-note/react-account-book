import { createSlice } from '@reduxjs/toolkit';
import loadFakeData from '../../assets/fakeData.js';
import { v4 as uuidv4 } from 'uuid';

const entryListData = loadFakeData();
entryListData.forEach(entry => {
   entry.id = uuidv4();
});

const entryListSlice = createSlice({
   name: 'entryList',
   initialState: entryListData,
   reducers: {
      addEntry: (state, action) => {
         const newEntry = {
            ...action.payload,
         };

         for (const key in newEntry) {
            if (newEntry[key] === '') {
               const defaultValue = `기본 ${key} ${newEntry.id}`;
               newEntry[key] = defaultValue;
            }
         }

         return [...state, newEntry];
      },
      removeEntry: (state, action) => {
         const targetEntryId = action.payload;
         return state.filter(entry => entry.id !== targetEntryId);
      },
      modifyEntry: (state, action) => {
         const targetEntryId = action.payload.id;

         const targetEntry = state.find(
            entry => entry.id === targetEntryId
         );

         Object.assign(targetEntry, action.payload);
      },
   },
});

export const { addEntry, removeEntry, modifyEntry } =
   entryListSlice.actions;

export default entryListSlice.reducer;
