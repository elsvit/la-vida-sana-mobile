import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { Avatar, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { Space } from '~/components/ui/Space';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { t } from '~/services/localization/localization';
import { selectGenericProductById } from '~/store/genericProducts/selectors';
import { useStyle } from '~/styles';
// import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { EScreens, ScreenRoutesParams } from '~/types/INavigation';

import { themedStyles } from './styles';

export interface IProductScreenProps {
  genericProductId: string;
}

export default function Product() {
  const [styles] = useStyle(themedStyles);

  useI18nHeaderTitle('products.product');

  const { id } =
    useRoute<RouteProp<ScreenRoutesParams, EScreens.Product>>().params;

  const product = useSelector((state: any) =>
    selectGenericProductById(state, id),
  );

  if (!product) {
    return (
      <SafeAreaBackground>
        {/*<ScreenHeader title={title} hasBackButton />*/}
        <View style={styles.centeredContainer}>
          <Text style={styles.loadingText}>{t('common.no_data_found')}</Text>
        </View>
      </SafeAreaBackground>
    );
  }

  const renderProductImage = () => {
    const imageUrl = product.thumbnail || product.image;

    if (imageUrl) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />
      );
    }

    return (
      <Avatar.Icon
        size={120}
        icon="package-variant"
        style={styles.productImagePlaceholder}
      />
    );
  };

  const renderProductInfo = () => {
    const infoItems: React.ReactNode[] = [];

    if (product.description) {
      infoItems.push(
        <View key="description" style={styles.infoSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            {t('common.description')}
          </Text>
          <Text variant="bodyMedium" style={styles.sectionContent}>
            {product.description}
          </Text>
        </View>,
      );
    }

    return infoItems;
  };

  const renderNutritionalInfo = () => {
    const items: React.ReactNode[] = [];

    if (product.calories != null) {
      items.push(
        <View key="calories" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.calories')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.calories} kcal
          </Text>
        </View>,
      );
    }

    if (product.protein != null) {
      items.push(
        <View key="protein" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.protein')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.protein} g
          </Text>
        </View>,
      );
    }

    if (product.fat != null) {
      items.push(
        <View key="fat" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.fat')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.fat} g
          </Text>
        </View>,
      );
    }

    if (product.carbohydrates != null) {
      items.push(
        <View key="carbohydrates" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.carbohydrates')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.carbohydrates} g
          </Text>
        </View>,
      );
    }

    if (product.salt != null) {
      items.push(
        <View key="salt" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.salt')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.salt} g
          </Text>
        </View>,
      );
    }

    if (product.sugar != null) {
      items.push(
        <View key="sugar" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.sugar')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.sugar} g
          </Text>
        </View>,
      );
    }

    if (product.fiber != null) {
      items.push(
        <View key="fiber" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.fiber')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.fiber} g
          </Text>
        </View>,
      );
    }

    if (product.saturatedFat != null) {
      items.push(
        <View key="saturatedFat" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.saturated_fat')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.saturatedFat} g
          </Text>
        </View>,
      );
    }

    if (product.monounsaturatedFat != null) {
      items.push(
        <View key="monounsaturatedFat" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.monounsaturated_fat')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.monounsaturatedFat} g
          </Text>
        </View>,
      );
    }

    if (product.polyunsaturatedFat != null) {
      items.push(
        <View key="polyunsaturatedFat" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.polyunsaturated_fat')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.polyunsaturatedFat} g
          </Text>
        </View>,
      );
    }

    if (product.cholesterol != null) {
      items.push(
        <View key="cholesterol" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.cholesterol')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.cholesterol} mg
          </Text>
        </View>,
      );
    }

    if (product.sodium != null) {
      items.push(
        <View key="sodium" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.sodium')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.sodium} mg
          </Text>
        </View>,
      );
    }

    if (Array.isArray(product.vitamins) && product.vitamins.length > 0) {
      items.push(
        <View key="vitamins" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.vitamins')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.vitamins.join(', ')}
          </Text>
        </View>,
      );
    }

    if (Array.isArray(product.minerals) && product.minerals.length > 0) {
      items.push(
        <View key="minerals" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.minerals')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.minerals.join(', ')}
          </Text>
        </View>,
      );
    }

    if (product.nutriScore != null) {
      items.push(
        <View key="nutriScore" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.nutri_score')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.nutriScore}
          </Text>
        </View>,
      );
    }

    if (product.totalDissolvedSolids != null) {
      items.push(
        <View key="tds" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.total_dissolved_solids')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.totalDissolvedSolids} ppm
          </Text>
        </View>,
      );
    }

    if (Array.isArray(product.allergens) && product.allergens.length > 0) {
      items.push(
        <View key="allergens" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('users.allergens')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.allergens.join(', ')}
          </Text>
        </View>,
      );
    }

    if (product.storageConditions != null) {
      items.push(
        <View key="storageConditions" style={styles.nutritionItem}>
          <Text variant="bodySmall" style={styles.nutritionLabel}>
            {t('products.storage_conditions')}:
          </Text>
          <Text variant="bodySmall" style={styles.nutritionValue}>
            {product.storageConditions}
          </Text>
        </View>,
      );
    }

    return items;
  };

  return (
    <SafeAreaBackground>
      {/*<ScreenHeader title={title} hasBackButton />*/}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Product Name */}
        <View style={styles.headerSection}>
          <Text variant="headlineSmall" style={styles.productName}>
            {product.name}
          </Text>
          {/*{product.rate && (*/}
          {/*  <View style={styles.ratingContainer}>*/}
          {/*    <Text variant="bodyMedium" style={styles.ratingText}>*/}
          {/*      ⭐ {product.rate}/5*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*)}*/}
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>{renderProductImage()}</View>

        <Space size={16} />

        {/* Nutritional Information (below the image) */}
        {renderNutritionalInfo().length > 0 && (
          <View style={styles.nutritionContainer}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t('products.nutritional_information')}
            </Text>
            <View style={styles.nutritionGrid}>{renderNutritionalInfo()}</View>
          </View>
        )}

        <Space size={16} />

        {/* Product Information */}
        {renderProductInfo()}

        <Space size={32} />
      </ScrollView>
    </SafeAreaBackground>
  );
}
