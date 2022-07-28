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
  async ({lat,lon}) => {
    const  {data } = await countriesService.getPollution(lat,lon);
    console.log(data.list)
    return data.list;

  },
);

export const getDetails2 = createAsyncThunk(
  'details2/getDetails2',
  async (name) => {
    const  {data } = await countriesService.getCountry(name);
    console.log(data)
    return data;

  },
);


export const details = createSlice({
  name: 'details',
  initialState,
  reducers: {
    SEARCH(state, action) {
      const newState = state.items.filter((word) => word.country==action.payload);
      const thestate = state;
      thestate.items = newState;
    },
    FILTER(state, action) {
      const newState = state.items.map((mission) => {
        if (mission.missionId !== action.payload) return mission;
        return { ...mission, joined: false };

      });
      const thestate = state;
      thestate.items = newState;
    },
  },
  //co: 233.65, no: 0, no2: 0.43, o3: 68.67, so2: 0.98
  extraReducers: {
    [getDetails.fulfilled]: (state, action) => {
      const details = (action.payload).map((key) => ({
        nitro: key.components.no,
        carbon:key.components.co,
        nitrodioxide:key.components.no2,
        ozone:key.components.o3,
        sulphur:key.components.so2,
        AirQuality: key.main.aqi,
      }));
      const thestate = state;
      thestate.isPollutionLoading = false;
      thestate.isPollutionFailed= false;
      thestate.items = details;
    },
    [getDetails2.fulfilled]: (state, action) => {
      const details = (action.payload).map((key) => ({
        map: key.maps.googleMaps,
        flag:key.flags.svg,
        population: key.population,
        name: key.name.common,
      }));
      const thestate = state;
      thestate.isCountryinfoLoading = false;
      thestate.isisCountryinfoFailed = false;
      thestate.items2 = details;
    },
    [getDetails.pending]: (state) => { const thestate = state; thestate.isCountryinfoLoading = true; },
    [getDetails.rejected]: (state) => { const thestate = state; thestate.isCountryinfoFailed = true; },
    [getDetails2.pending]: (state) => { const thestate = state; thestate.isPollutionLoading = true; },
    [getDetails2.rejected]: (state) => { const thestate = state; thestate.isPollutionFailed = true; },
  },
});

export const { SEARCH, FILTER } = details.actions;

export default details.reducer;
