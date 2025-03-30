import { configureStore } from "@reduxjs/toolkit";
import callsReducer from '../entities/TableSlice';
import dailyCallsReducer from '../entities/ChartSlice'

export const store = configureStore({
  reducer: {
    calls: callsReducer,
    dailyCalls: dailyCallsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
