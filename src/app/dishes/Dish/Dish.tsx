import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { Avatar, Chip, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { Space } from '~/components/ui/Space';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { t } from '~/services';
import { selectLang } from '~/store/account';
import { selectDishById } from '~/store/dishes/selectors';
import { useStyle } from '~/styles';
import { ELang } from '~/types/ILang';
import { EScreens, ScreenRoutesParams } from '~/types/INavigation';

import themedStyles from './styles';

export default function Dish() {
  const [styles] = useStyle(themedStyles);

  useI18nHeaderTitle('dishes.dish');

  const { dishId } =
    useRoute<RouteProp<ScreenRoutesParams, EScreens.Dish>>().params;

  const dish = useSelector((state: any) => selectDishById(state, dishId));

  const lang = useSelector(selectLang);

  if (!dish) {
    return (
      <SafeAreaBackground>
        <View style={styles.centeredContainer}>
          <Text>{t('common.no_data_found')}</Text>
        </View>
      </SafeAreaBackground>
    );
  }

  const name = lang === ELang.en ? dish.nameEn || dish.name : dish.name;

  const description =
    lang === ELang.en
      ? dish.descriptionEn || dish.description
      : dish.description;

  const recipe = lang === ELang.en ? dish.recipeEn || dish.recipe : dish.recipe;

  const renderImage = () => {
    const imageUrl = dish.thumbnail || dish.image;

    if (imageUrl) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }

    return (
      <Avatar.Icon
        size={120}
        icon="silverware-fork-knife"
        style={styles.imagePlaceholder}
      />
    );
  };

  return (
    <SafeAreaBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Name */}
        <View style={styles.headerSection}>
          <Text variant="headlineSmall" style={styles.title}>
            {name}
          </Text>

          {dish.rating != null && <Text variant="bodyMedium">⭐ {dish.rating}/5</Text>}
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>{renderImage()}</View>
        <Space size={16} />

        {/* Tags */}
        {dish.tags?.length ? (
          <View style={styles.tagsContainer}>
            {dish.tags.map(tag => (
              <Chip key={tag} style={styles.chip}>
                <Text>{tag}</Text>
              </Chip>
            ))}
          </View>
        ) : null}

        <Space size={16} />

        {/* Info */}
        {dish.prepTime && (
          <Text>
            ⏱ {t('dishes.prep_time')}: {dish.prepTime}h
          </Text>
        )}

        {dish.cookTime && (
          <Text>
            🔥 {t('dishes.cook_time')}: {dish.cookTime}h
          </Text>
        )}

        {dish.difficulty && (
          <Text>
            📊 {t('dishes.difficulty')}: {dish.difficulty}
          </Text>
        )}

        <Space size={16} />

        {/* Description */}
        {description && (
          <>
            <Text variant="titleMedium">{t('common.description')}</Text>
            <Text>{description}</Text>
            <Space size={16} />
          </>
        )}

        {/* Recipe */}
        {recipe && (
          <>
            <Text variant="titleMedium">{t('dishes.recipe')}</Text>
            <Text>{recipe}</Text>
          </>
        )}

        <Space size={32} />
      </ScrollView>
    </SafeAreaBackground>
  );
}
