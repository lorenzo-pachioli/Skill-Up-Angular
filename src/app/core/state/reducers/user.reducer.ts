import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/user.actions';
import { User } from '../interfaces/state.interface';

export const initialState = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  point: 0,
  roleId: 0,
  updatedAt: '',
  createdAt: '',
  token: ''
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, { user }) => user),
  on(logout, (state) => ({ ...state, user: null }))
);
