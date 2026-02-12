// import { createSelector } from 'reselect';
import { RootStateT } from '../store';
// import { usersAdapter } from './slice';

// Base selectors
export const getAccountState = (state: RootStateT) => state.account;

// Simple selectors
export const selectLang = (state: RootStateT) => state.account.lang;
export const selectRole = (state: RootStateT) => state.account.role;

// Adapter selectors
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   selectEntities: selectUserEntities,
//   selectTotal: selectTotalUsers,
// } = usersAdapter.getSelectors((state: RootStateT) => state.account.users);

// Direct adapter selectors (no need for wrapper functions)
// export const getUsers = selectAllUsers;
// export const getUserById = selectUserById;
// export const getUserIds = selectUserIds;
// export const getUserEntities = selectUserEntities;
// export const getTotalUsers = selectTotalUsers;

// export const getUsersWithAllergens = createSelector([selectAllUsers], users =>
//   users.filter(user => user.allergens && user.allergens.length > 0),
// );

// export const getUserFavoriteProducts = (userId: string) =>
//   createSelector(
//     [(state: RootStateT) => selectUserById(state, userId)],
//     user => {
//       return user?.favoriteProducts || [];
//     },
//   );

// export const getUserFavoriteDishes = (userId: string) =>
//   createSelector(
//     [(state: RootStateT) => selectUserById(state, userId)],
//     user => {
//       return user?.favoriteDishes || [];
//     },
//   );

export const selectIsLangInitiating = (state: RootStateT) =>
  state.account.isLangInitiating;
