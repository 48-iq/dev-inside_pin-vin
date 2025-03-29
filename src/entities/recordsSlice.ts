import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Call {
  id: string;
  clientTel: string;
  duration: number;
  rating: number;
  recommendations: string[];
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
  calls: Call[];
  loading: boolean;
  error: string | null;
}

const initialState: CallsState = {
  calls: [],
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
      state.calls = action.payload.map(call => ({
        id: call.id,
        clientTel: call.clientTel,
        duration: call.duration,
        rating: call.rating,
        recommendations: call.recommendations,
        avgPauseLen: call.avgPauseLen,
        maxPauseLen: call.maxPauseLen,
        checklistScores: {
          contact: call.competition.contact.rating,
          effectiveCommunication: call.competition.effectiveCommunication.rating,
          presentation: call.competition.presentation.rating,
          convincingArguments: call.competition.convincingArguments.rating,
          resultOrientation: call.competition.resultOrientation.rating,
          initiative: call.competition.initiative.rating,
          clientOrientation: call.competition.clientOrientation.rating,
          cpm: call.competition.cpm.rating,
        }
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