import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './basketRedax';
import authReducer from './userRedux';

export default configureStore({
  reducer: {
    basket: basketReducer,
    auth: authReducer,
  },
});
