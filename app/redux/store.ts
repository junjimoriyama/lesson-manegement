// redux
import { configureStore } from '@reduxjs/toolkit';
// function
import calendarReducer from './Slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      calendar: calendarReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// // stateの型
// export type RootState = ReturnType<typeof store.getState>
// // dispatchの型
// export type AppDispatch = typeof store.dispatch