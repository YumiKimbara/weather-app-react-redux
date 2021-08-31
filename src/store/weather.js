import { createSlice } from "@reduxjs/toolkit";

const initialWeatherState = { fetchedData: [] };

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    getWeather(state, action) {
      state.fetchedData = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
