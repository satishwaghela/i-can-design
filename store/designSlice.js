import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  panState: {
    zoom: 1,
    transform: ''
  }
};

const slice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    updatePanState (state, action) {
      state.panState = { ...state.panState, ...action.payload };
    }
  }
});

export const { reducer } = slice;

export default slice;