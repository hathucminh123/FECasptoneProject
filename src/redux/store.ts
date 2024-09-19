import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice'; 
import favoriteJobReducer from './slices/favoriteJob';
import ViewJobRducer from './slices/ViewJob';

const store = configureStore({
  reducer: {
    search: searchReducer,
    favorite:favoriteJobReducer,
    view:ViewJobRducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
