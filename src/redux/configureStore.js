import { configureStore } from '@reduxjs/toolkit';
import count from './mainpage';
import detail from './details';

const store = configureStore({
  reducer: {
    countries: count,
    details: detail,
  },
});
export default store;
