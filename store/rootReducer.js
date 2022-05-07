import { combineReducers } from '@reduxjs/toolkit';

import { reducer as designReducer } from './designSlice';

const rootReducer = combineReducers({
  design: designReducer
});

export default rootReducer;
