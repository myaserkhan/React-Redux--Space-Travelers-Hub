import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial State
const initialState = [];

// Base URL
const url = 'https://api.spacexdata.com/v3/rockets';

// Async Action Creators
export const fetchRectketApi = createAsyncThunk(
  'rockets/fetchRectketApi',
  async () => {
    const response = await axios.get(url);
    return response.data;
  },
);

// Slice Reducer
export const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRectketApi.fulfilled]: (state, action) => {
      const rockets = action.payload.map((el) => ({
        rocketId: el.rocket_id,
        rocketName: el.rocket_name,
        rocketDesc: el.description,
        rocketImg: el.flickr_images[0],
        rocketReserved: true,
      }));
      return rockets;
    },
  },
});

export default rocketSlice.reducer;
