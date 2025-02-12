import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { conferenceRoomSchedulerServerApi } from './services/conferenceRoomSchedulerServerApi';

export const store = configureStore({
  reducer: {
    [conferenceRoomSchedulerServerApi.reducerPath]:
      conferenceRoomSchedulerServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conferenceRoomSchedulerServerApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
