import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/store/store';
import { fetchDishes } from '~/store/dishes/slice';
import {
  selectAllDishes,
  selectDishIds,
  selectIsFetchDishesLoaded,
  selectIsFetchDishesLoading,
} from '~/store/dishes/selectors';
import { selectLang } from '~/store/account/selectors';
import {
  ECourse,
  ECuisine,
  EDietaryCategory,
  EDishDifficulty,
  EMealTime,
  EPreparationMethod,
  IDish
} from '~/types/IDish';
import { ELang } from '~/types/ILang';
import { t, TranslationKey } from '~/services/localization/localization';

export const useGetDishes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading: Maybe<boolean> = useSelector(selectIsFetchDishesLoading);
  const isLoaded: Maybe<boolean> = useSelector(selectIsFetchDishesLoaded);
  const dishes: IDish[] = useSelector(selectAllDishes);
  const dishesIds: string[] = useSelector(selectDishIds);

  const fetchDishesData = () => {
    if (!isLoading) {
      dispatch(fetchDishes());
    }
  };

  return {
    dishesIds,
    dishes,
    isLoading,
    isLoaded,
    fetchDishesData,
  };
};

export const useDishTranslation = (dish: IDish | undefined) => {
  const lang = useSelector(selectLang);

  if (!dish) {
    return {
      dishDescription: '',
      dishName: '',
      dishRecipe: '',
    };
  }

  const isEnglish = lang === ELang.en;
  const dishName = (isEnglish && dish.nameEn) || dish.name;
  const dishDescription = (isEnglish && dish.descriptionEn) || dish.description;
  const dishRecipe = (isEnglish && dish.recipeEn) || dish.recipe;

  const courseKeyMap: Record<ECourse, TranslationKey> = {
    [ECourse.APPETIZERS]: 'dishes.ECourse.appetizers',
    [ECourse.SOUPS]: 'dishes.ECourse.soups',
    [ECourse.SALADS]: 'dishes.ECourse.salads',
    [ECourse.MAIN_COURSES]: 'dishes.ECourse.main_courses',
    [ECourse.SIDE_DISHES]: 'dishes.ECourse.side_dishes',
    [ECourse.DESSERTS]: 'dishes.ECourse.desserts',
    [ECourse.BEVERAGES]: 'dishes.ECourse.beverages',
    [ECourse.OTHER]: 'dishes.ECourse.other',
  };
  const dishCourse = t(courseKeyMap[(dish.course ?? ECourse.OTHER) as ECourse]);

  const cuisineKeyMap: Record<ECuisine, TranslationKey> = {
    [ECuisine.SPANISH]: 'dishes.ECuisine.italian',
    [ECuisine.ITALIAN]: 'dishes.ECuisine.italian',
    [ECuisine.FRENCH]: 'dishes.ECuisine.french',
    [ECuisine.CHINESE]: 'dishes.ECuisine.chinese',
    [ECuisine.MEXICAN]: 'dishes.ECuisine.mexican',
    [ECuisine.UKRAINIAN]: 'dishes.ECuisine.ukrainian',
    [ECuisine.INDIAN]: 'dishes.ECuisine.indian',
    [ECuisine.JAPANESE]: 'dishes.ECuisine.japanese',
    [ECuisine.AMERICAN]: 'dishes.ECuisine.american',
    [ECuisine.OTHER]: 'dishes.ECuisine.other',
  };
  const dishCuisine = t(
    cuisineKeyMap[(dish.cuisine ?? ECuisine.OTHER) as ECuisine],
  );

  const difficultyKeyMap = {
    [EDishDifficulty.EASY]: 'dishes.EDifficulty.easy',
    [EDishDifficulty.MEDIUM]: 'dishes.EDifficulty.medium',
    [EDishDifficulty.HARD]: 'dishes.EDifficulty.hard',
    [EDishDifficulty.OTHER]: 'dishes.EDifficulty.other',
  } as const satisfies Record<EDishDifficulty, TranslationKey>;
  const dishDifficulty = t(
    difficultyKeyMap[
      (dish.difficulty ?? EDishDifficulty.OTHER) as EDishDifficulty
    ],
  );

  const dietaryCategoryKeyMap = {
    [EDietaryCategory.VEGETARIAN]: 'dishes.EDietaryCategory.vegetarian',
    [EDietaryCategory.VEGAN]: 'dishes.EDietaryCategory.vegan',
    [EDietaryCategory.GLUTEN_FREE]: 'dishes.EDietaryCategory.gluten_free',
    [EDietaryCategory.KETO]: 'dishes.EDietaryCategory.keto',
    [EDietaryCategory.LOW_CARB]: 'dishes.EDietaryCategory.low_carb',
    [EDietaryCategory.OTHER]: 'dishes.EDietaryCategory.other',
  } as const satisfies Record<EDietaryCategory, TranslationKey>;
  const dishDietaryCategory = t(
    dietaryCategoryKeyMap[
      (dish.dietaryCategory ?? EDietaryCategory.OTHER) as EDietaryCategory
    ],
  );

  const mealTimeKeyMap: Record<EMealTime, TranslationKey> = {
    [EMealTime.BREAKFAST]: 'dishes.EMealTime.breakfast',
    [EMealTime.BRUNCH]: 'dishes.EMealTime.brunch',
    [EMealTime.LUNCH]: 'dishes.EMealTime.lunch',
    [EMealTime.DINNER]: 'dishes.EMealTime.dinner',
    [EMealTime.SNACKS]: 'dishes.EMealTime.snacks',
    [EMealTime.LATE_NIGHT]: 'dishes.EMealTime.late_night',
    [EMealTime.OTHER]: 'dishes.EMealTime.other',
  };
  const dishMealTime = t(
    mealTimeKeyMap[(dish.mealTime ?? EMealTime.OTHER) as EMealTime],
  );

  const preparationMethodKeyMap = {
    [EPreparationMethod.GRILLED]: 'dishes.EPreparationMethod.grilled',
    [EPreparationMethod.FRIED]: 'dishes.EPreparationMethod.fried',
    [EPreparationMethod.BAKED]: 'dishes.EPreparationMethod.baked',
    [EPreparationMethod.STEAMED]: 'dishes.EPreparationMethod.steamed',
    [EPreparationMethod.BOILED]: 'dishes.EPreparationMethod.boiled',
    [EPreparationMethod.RAW]: 'dishes.EPreparationMethod.raw',
    [EPreparationMethod.OTHER]: 'dishes.EPreparationMethod.other',
  } as const satisfies Record<EPreparationMethod, TranslationKey>;
  const dishPreparationMethod = t(
    preparationMethodKeyMap[
      (dish.preparationMethod ?? EPreparationMethod.OTHER) as EPreparationMethod
    ],
  );

  return {
    dishDescription,
    dishName,
    dishRecipe,
    dishCourse,
    dishCuisine,
    dishDifficulty,
    dishDietaryCategory,
    dishMealTime,
    dishPreparationMethod,
  };
};
