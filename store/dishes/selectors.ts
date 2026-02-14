import { createSelector } from 'reselect';
import { RootStateT } from '../store';
import { dishesAdapter } from './slice';
import {
  ECuisine,
  ECourse,
  EDietaryCategory,
  EMealTime,
  EDishDifficulty,
} from '~/types/IDish';
import { fetchDishes } from './slice';

// Base selectors
export const getDishesState = (state: RootStateT) => state.dishes;

// Adapter selectors
export const {
  selectAll: selectAllDishes,
  selectById: selectDishById,
  selectIds: selectDishIds,
  selectEntities: selectDishEntities,
  selectTotal: selectTotalDishes,
} = dishesAdapter.getSelectors((state: RootStateT) => state.dishes);

// Custom selectors
export const selectDishesByCuisine = (cuisine: ECuisine) =>
  createSelector([selectAllDishes], dishes =>
    dishes.filter(dish => dish.cuisine === cuisine),
  );

export const selectDishesByCourse = (course: ECourse) =>
  createSelector([selectAllDishes], dishes =>
    dishes.filter(dish => dish.course === course),
  );

export const selectDishesByDietaryCategory = (category: EDietaryCategory) =>
  createSelector([selectAllDishes], dishes =>
    dishes.filter(dish => dish.dietaryCategory === category),
  );

export const selectDishesByMealTime = (mealTime: EMealTime) =>
  createSelector([selectAllDishes], dishes =>
    dishes.filter(dish => dish.mealTime === mealTime),
  );

export const selectDishesByDifficulty = (difficulty: EDishDifficulty) =>
  createSelector([selectAllDishes], dishes =>
    dishes.filter(dish => dish.difficulty === difficulty),
  );

export const selectVegetarianDishes = createSelector(
  [selectAllDishes],
  dishes =>
    dishes.filter(
      dish =>
        dish.dietaryCategory === EDietaryCategory.VEGETARIAN ||
        dish.dietaryCategory === EDietaryCategory.VEGAN,
    ),
);

export const selectLessThanOneHourDishes = createSelector(
  [selectAllDishes],
  dishes =>
    dishes.filter(dish => {
      const totalTime = (dish.prepTime || 0) + (dish.cookTime || 0);
      return totalTime <= 1; // 1 hour or less
    }),
);

export const selectMoreThanFourRatedDishes = createSelector(
  [selectAllDishes],
  dishes => dishes.filter(dish => (dish.rating || 0) >= 4),
);

export const selectEnabledDishes = createSelector([selectAllDishes], dishes =>
  dishes.filter(dish => !dish.isDisabled),
);

export const selectDishesWithTags = (tags: string[]) =>
  createSelector([selectAllDishes], dishes =>
    dishes.filter(
      dish => dish.tags && tags.some(tag => dish.tags!.includes(tag)),
    ),
  );

export const selectIsFetchDishesLoading = createSelector(
  [(state: RootStateT) => state.common.LOADING],
  loading => loading[fetchDishes.type],
);

export const selectIsFetchDishesLoaded = createSelector(
  [(state: RootStateT) => state.common.LOADED],
  loaded => loaded[fetchDishes.type],
);
