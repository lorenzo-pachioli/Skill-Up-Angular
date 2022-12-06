import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';
import { User } from './interfaces/state.interface';

export interface AppState {
  user: any;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: userReducer, //es el mismo nombre que se le dio en el app.module.ts
};
