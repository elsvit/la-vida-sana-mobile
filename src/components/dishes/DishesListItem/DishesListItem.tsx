import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Chip, Avatar } from 'react-native-paper';
import { IDish } from '~/types/IDish';
import { t } from '~/services';
import { themedStyles } from './styles';
import { useStyle } from '~/styles/hooks';
import { useSelector } from 'react-redux';
import { IDishListItem } from './types';
import { EScreens, NavigationProp } from '~/types/INavigation';
import { useRouter } from "expo-router";
import { useDishTranslation } from '~/hooks/dishes';
// import { selectLang } from '~/store/account/selectors';

export const DishListItem: React.FC<IDishListItem> = ({ dishId }) => {
  const [styles] = useStyle(themedStyles);
  const router = useRouter();


  const dish: IDish = useSelector(
    (state: any) => state.dishes.entities[dishId],
  );

  const { dishName } = useDishTranslation(dish);
  // Get the image URL - in React Native, we'll use the image directly
  const imageUrl = dish.thumbnail || dish.image;

  // const { calculateDishNutrition } = useDishesNutrition(productsState, genericProducts);

  // const nutrition = calculateDishNutrition(dish);

  const renderDishImage = () => {
    if (imageUrl) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={styles.dishImage}
          resizeMode="cover"
        />
      );
    }
    return (
      <Avatar.Icon size={48} icon="food" style={styles.dishImagePlaceholder} />
    );
  };

  const renderNutritionInfo = () => {
    const parts: any = [];

    // if (nutrition.totalPrice > 0) {
    //   parts.push(`€${nutrition.totalPrice.toFixed(2)}`);
    // }

    // if (nutrition.calories > 0) {
    //   parts.push(`Kcal: ${nutrition.calories.toFixed(1)}`);
    // }

    // if (nutrition.protein !== undefined) {
    //   parts.push(`P: ${nutrition.protein.toFixed(2)}g`);
    // }

    // if (nutrition.carbohydrates !== undefined) {
    //   parts.push(`C: ${nutrition.carbohydrates.toFixed(2)}g`);
    // }

    // if (nutrition.fat !== undefined) {
    //   parts.push(`F: ${nutrition.fat.toFixed(2)}g`);
    // }

    return parts.join(' | ');
  };

  const renderDishDetails = () => {
    const details = [];

    if (dish.rating) {
      details.push(`rate: ${dish.rating}`);
    }

    if (dish.prepTime) {
      details.push(`prep: ${dish.prepTime}m`);
    }

    if (dish.cookTime) {
      details.push(`cook: ${dish.cookTime}m`);
    }

    if (dish.cuisine) {
      details.push(dish.cuisine);
    }

    if (dish.course) {
      details.push(dish.course);
    }

    if (dish.difficulty) {
      details.push(`diff: ${dish.difficulty}`);
    }

    if (dish.dietaryCategory) {
      details.push(dish.dietaryCategory);
    }

    if (dish.mealTime) {
      details.push(dish.mealTime);
    }

    if (dish.preparationMethod) {
      details.push(dish.preparationMethod);
    }

    return details.join(', ');
  };

  const handlePress = () => {
    console.log('118 DishListItem handlePress dishId:', dishId);
    router.push({
      pathname: `/${EScreens.Dish}` as any,
      params: { dishId },
    });
  };

  return (
    <Card
      onPress={handlePress}
      style={[styles.container, dish.isDisabled && styles.disabledContainer]}
    >
      <Card.Content style={styles.content}>
        {/* Main content row */}
        <View style={styles.mainRow}>
          {/* Dish image */}
          <View style={styles.imageContainer}>{renderDishImage()}</View>

          {/* Dish info */}
          <View style={styles.dishInfo}>
            {/* Name and chips */}
            <View style={styles.nameRow}>
              <Text variant="bodyMedium" style={styles.dishName}>
                {dishName}
              </Text>
              {/* <Chip
                mode="outlined"
                compact
                style={styles.idChip}
                textStyle={styles.chipText}
              >
                id: {dish.id}
              </Chip> */}
              {dish.isDisabled && (
                <Chip
                  mode="outlined"
                  compact
                  style={styles.disabledChip}
                  textStyle={styles.chipText}
                >
                  {t('common.disabled')}
                </Chip>
              )}
            </View>

            {/* Nutrition info */}
            <Text variant="bodySmall" style={styles.nutritionText}>
              {renderNutritionInfo()}
              {dish.tags && dish.tags.length > 0 && (
                <Text>
                  {' '}
                  | {t('sellers.title')}: {dish.tags.join(', ')}
                </Text>
              )}
            </Text>
          </View>

          {/* Action buttons */}
          <View style={styles.actionsContainer}>
            <View style={styles.buttonRow}>
              {/* <IconButton
                icon="content-copy"
                size={20}
                mode="outlined"
                onPress={() => console.log('TEST_169 duplicate dish', dish)}
                style={styles.actionButton}
              /> */}
            </View>
          </View>
        </View>

        {/* Dish details row */}
        {renderDishDetails() && (
          <View style={styles.detailsRow}>
            <Text variant="bodySmall" style={styles.detailsText}>
              {renderDishDetails()}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
