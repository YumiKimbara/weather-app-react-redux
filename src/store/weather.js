import { createSlice } from "@reduxjs/toolkit";

const initialWeatherState = {
  fetchedData: [],
  fetchedHoulyData: [],
  fetchedWeeklyData: [],
  city: "Vancouver",
  video: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    getWeather(state, action) {
      state.fetchedData = action.payload;
    },
    getHourlyWeather(state, action) {
      state.fetchedHoulyData = action.payload;
    },

    getWeeklyWeather(state, action) {
      state.fetchedWeeklyData = action.payload;
    },
    getCity(state, action) {
      state.city = action.payload;
    },
    changeVideo(state, action) {
      state.video = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
