import { login, logout } from './auth.actions';
import { on, createReducer, createSelector } from '@ngrx/store';
import { User } from '../interfaces/state.interface';
import { AppState } from '../app.state';
import { IUser } from '../../interfaces/User';

export interface State {
  user: User | null;
  email: string | null;
  token: string | null;
  autenticated: boolean;
}

export const initialState: State = {
  user: null,
  email: null,
  token: null,
  autenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({
    ...state,
    user,
    email: user.email,
    token: user.token,
    autenticated: true,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    email: null,
    token: null,
    autenticated: false,
  }))
);

//! selectors
export const getAuth = (state: AppState) => state.user;
export const getUser = (state: State) => state.user;
export const getEmail = (state: State) => state.email;
export const getToken = (state: State) => state.token;

export const selectedUser = createSelector(
  getAuth,
  (state: IUser) => {
    console.log(state);
    return state;
  }
);
