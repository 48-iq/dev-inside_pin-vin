import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DailyChecklistScores {
  contact: number;
  effectiveCommunication: number;
  presentation: number;
  convincingArguments: number;
  resultOrientation: number;
  initiative: number;
  clientOrientation: number;
  cpm: number;
}

export interface DailyCall {
  id: string;
  date: string;
  hour: number;
  rating: number;
  processedCallRecords: number;
  avgPauseLen: number;
  maxPauseLen: number;
  avgDuration: number;
  checklistScores: DailyChecklistScores;
}

interface DailyAvg {
  processedCallRecords: number;
  avgPauseLen: number;
  avgMaxPauseLen: number;
  avgDuration: number;
}

interface DailyCallsState {
  calls: DailyCall[];
  averages: DailyAvg;
  loading: boolean;
  error: string | null;
}

const initialState: DailyCallsState = {
  calls: [],
  averages: {
    processedCallRecords: 0,
    avgPauseLen: 0,
    avgMaxPauseLen: 0,
    avgDuration: 0,
  },
  loading: false,
  error: null,
};

const dailyCallsSlice = createSlice({
  name: 'dailyCalls',
  initialState,
  reducers: {
    fetchDailyCallsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDailyCallsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      const { days, avg } = action.payload;

      state.calls = days.flatMap((day: any) =>
        day.hours.map((hour: any) => ({
          id: `${day.date}-${hour.hour}`,
          date: day.date,
          hour: hour.hour,
          rating: hour.rating,
          processedCallRecords: hour.processedCallRecords,
          avgPauseLen: hour.avgPauseLen,
          maxPauseLen: hour.avgMaxPauseLen,
          avgDuration: hour.avgDuration,
          checklistScores: {
            contact: hour.competitions.contact,
            effectiveCommunication: hour.competitions.effectiveCommunication,
            presentation: hour.competitions.presentation,
            convincingArguments: hour.competitions.convincingArguments,
            resultOrientation: hour.competitions.resultOrientation,
            initiative: hour.competitions.initiative,
            clientOrientation: hour.competitions.clientOrientation,
            cpm: hour.competitions.cpm,
          },
        }))
      );

      state.averages = {
        processedCallRecords: avg.processedCallRecords,
        avgPauseLen: avg.avgPauseLen,
        avgMaxPauseLen: avg.avgMaxPauseLen,
        avgDuration: avg.avgDuration,
      };
    },
    fetchDailyCallsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDailyCallsStart, fetchDailyCallsSuccess, fetchDailyCallsFailure } = dailyCallsSlice.actions;
export default dailyCallsSlice.reducer;
