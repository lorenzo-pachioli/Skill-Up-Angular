import { login, logout } from './auth.actions';
import { on, createReducer, createSelector } from '@ngrx/store';
import { User } from '../interfaces/state.interface';

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

export const getUser = (state: State) => state.user;
export const getEmail = (state: State) => state.email;
export const getToken = (state: State) => state.token;