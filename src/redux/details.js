import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import countriesService from '../services/services';

const initialState = {
  isCountryinfoLoading: false,
  isCountryinfoFailed: false,
  items: [],
  isPollutionLoading: false,
  isPollutionFailed: false,
  items2: [],
};

export const getDetails = createAsyncThunk(
  'details/getDetails',
  async ({ lat, lon }) => {
    const { data } = await countriesService.getPollution(lat, lon);
    return data.list;
  },
);

export const getDetails2 = createAsyncThunk(
  'details2/getDetails2',
  async (name) => {
    const { data } = await countriesService.getCountry(name);
    return data;
  },
);

export const details = createSlice({
  name: 'details',
  initialState,
  extraReducers: {
    [getDetails.fulfilled]: (state, action) => {
      const details = (action.payload).map((key) => ({
        nitro: key.components.no,
        carbon: key.components.co,
        nitrodioxide: key.components.no2,
        ozone: key.components.o3,
        sulphur: key.components.so2,
        AirQuality: key.main.aqi,
      }));
      const thestate = state;
      thestate.isPollutionLoading = false;
      thestate.isPollutionFailed = false;
      thestate.items = details;
    },
    [getDetails2.fulfilled]: (state, action) => {
      const details = (action.payload).map((key) => ({
        map: key.maps.googleMaps,
        flag: key.flags.svg,
        population: key.population,
        name: key.name.common,
      }));
      const thestate = state;
      thestate.isCountryinfoLoading = false;
      thestate.isisCountryinfoFailed = false;
      thestate.items2 = details;
    },
    [getDetails.pending]: (state) => {
      const thestate = state; thestate.isCountryinfoLoading = true;
    },
    [getDetails.rejected]: (state) => {
      const thestate = state; thestate.isCountryinfoFailed = true;
    },
    [getDetails2.pending]: (state) => {
      const thestate = state; thestate.isPollutionLoading = true;
    },
    [getDetails2.rejected]: (state) => {
      const thestate = state; thestate.isPollutionFailed = true;
    },
  },
});

export const { SEARCH, FILTER } = details.actions;

export default details.reducer;
