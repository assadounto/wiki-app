import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import countriesService from '../services/services';

const initialState = {
  isLoading: false,
  isFailed: false,
  items: [],
};

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async () => {
    const  {data } = await countriesService.getAll();
    console.log(data)
    return data;

  },
);

export const countries = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    FILTER(state, action) {
      const newState = state.items.map((mission) => {
        if (mission.missionId !== action.payload) return mission;
        return { ...mission, joined: false };

      });
      const thestate = state;
      thestate.items = newState;
    },
  },
  extraReducers: {
    [getCountries.fulfilled]: (state, action) => {
      const countries = (action.payload).map((key) => ({
        country: key.name.common,
        lat: key.latlng[0],
        lon: key.latlng[1],
        population: key.population,
        region: key.region,
        flag:key.flags.svg,
      }));
      const thestate = state;
      thestate.isLoading = false;
      thestate.isFailed = false;
      thestate.items = countries;
      console.log(thestate)
    },
    [getCountries.pending]: (state) => { const thestate = state; thestate.isLoading = true; },
    [getCountries.rejected]: (state) => { const thestate = state; thestate.isFailed = true; },
  },
});

export const { SEARCH, FILTER } = countries.actions;

export default countries.reducer;
