import { createSelector } from 'reselect';
import { RootStateT } from '~/store';
import { usersAdapter } from './slice';

// Base selectors
export const getUsersState = (state: RootStateT) => state.users;

// Adapter selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: RootStateT) => state.users);
