import { configureStore } from '@reduxjs/toolkit';
import countries from './mainpage';
import details from './details';

const store = configureStore({
  reducer: {
    countries,
    details,
  },
});
export default store;
