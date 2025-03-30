import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Call {
  id: string;
  clientTel: string;
  duration: number;
  rating: number;
  recommendations: { recommendation: string }[];
  avgPauseLen: number;
  maxPauseLen: number;
  checklistScores: {
    contact: number;
    effectiveCommunication: number;
    presentation: number;
    convincingArguments: number;
    resultOrientation: number;
    initiative: number;
    clientOrientation: number;
    cpm: number;
  };
}

interface CallsState {
  callss: Call[]; // Опечатка здесь
  loading: boolean;
  error: string | null;
}

const initialState: CallsState = {
  callss: [],
  loading: false,
  error: null,
};

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    fetchCallsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCallsSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.callss = action.payload.map(call => ({
        id: call._id,
        clientTel: call.clientTel || '',
        duration: call.duration || 0,
        rating: call.rating || 0,
        recommendations: Array.isArray(call.recomendations)
          ? call.recomendations
          : [],
        avgPauseLen: call.avgPauseLen || 0,
        maxPauseLen: call.maxPauseLen || 0,
        checklistScores: {
          contact: call.competitions?.contact?.rating || 0,
          effectiveCommunication: call.competitions?.effectiveCommunication?.rating || 0,
          presentation: call.competitions?.presentation?.rating || 0,
          convincingArguments: call.competitions?.convincingArguments?.rating || 0,
          resultOrientation: call.competitions?.resultOrientation?.rating || 0,
          initiative: call.competitions?.initiative?.rating || 0,
          clientOrientation: call.competitions?.clientOrientation?.rating || 0,
          cpm: call.competitions?.cpm?.rating || 0,
        },
      }));
    },
    fetchCallsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCallsStart, fetchCallsSuccess, fetchCallsFailure } = callsSlice.actions;
export default callsSlice.reducer;