import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice'; 
import favoriteJobReducer from './slices/favoriteJob';
import ViewJobRducer from './slices/viewJob';
import  createJobReducer  from './slices/createJobs';

const store = configureStore({
  reducer: {
    search: searchReducer,
    favorite:favoriteJobReducer,
    view:ViewJobRducer,
    create:createJobReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
