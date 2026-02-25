import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { t } from '~/services/localization/localization';
import { Avatar, Card, Chip, Text } from 'react-native-paper';
import { Image, ScrollView, View } from 'react-native';
import { useStyle } from '~/styles';
import themedStyles from './styles';
import { Space } from '~/components/ui/Space';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EScreens, ScreenRoutesParams } from '~/types/INavigation';
import { useSelector } from 'react-redux';
import { RootStateT } from '~/store';
import { selectById } from '~/store/products/selectors';
import { ESeller, IProduct } from '~/types/IProduct';
import React from 'react';
import { IGenericProduct } from '~/types/IGenericProduct';
import { selectGenericProductById } from '~/store/genericProducts/selectors';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';

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

  const title = t('products.product');

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
    const infoItems = [];

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

  // const renderNutritionalInfo = () => {
  //   const nutritionItems = [];
  //
  //   if (product.calories) {
  //     nutritionItems.push(
  //       <View key="calories" style={styles.nutritionItem}>
  //         <Text variant="bodySmall" style={styles.nutritionLabel}>
  //           {t('products.calories')}:
  //         </Text>
  //         <Text variant="bodySmall" style={styles.nutritionValue}>
  //           {product.calories} kcal
  //         </Text>
  //       </View>,
  //     );
  //   }
  //
  //   if (product.protein) {
  //     nutritionItems.push(
  //       <View key="protein" style={styles.nutritionItem}>
  //         <Text variant="bodySmall" style={styles.nutritionLabel}>
  //           {t('products.protein')}:
  //         </Text>
  //         <Text variant="bodySmall" style={styles.nutritionValue}>
  //           {product.protein}g
  //         </Text>
  //       </View>,
  //     );
  //   }
  //
  //   if (product.fat) {
  //     nutritionItems.push(
  //       <View key="fat" style={styles.nutritionItem}>
  //         <Text variant="bodySmall" style={styles.nutritionLabel}>
  //           {t('products.fat')}:
  //         </Text>
  //         <Text variant="bodySmall" style={styles.nutritionValue}>
  //           {product.fat}g
  //         </Text>
  //       </View>,
  //     );
  //   }
  //
  //   if (product.carbohydrates) {
  //     nutritionItems.push(
  //       <View key="carbs" style={styles.nutritionItem}>
  //         <Text variant="bodySmall" style={styles.nutritionLabel}>
  //           {t('products.carbohydrates')}:
  //         </Text>
  //         <Text variant="bodySmall" style={styles.nutritionValue}>
  //           {product.carbohydrates}g
  //         </Text>
  //       </View>,
  //     );
  //   }
  //
  //   if (product.fiber) {
  //     nutritionItems.push(
  //       <View key="fiber" style={styles.nutritionItem}>
  //         <Text variant="bodySmall" style={styles.nutritionLabel}>
  //           {t('products.fiber')}:
  //         </Text>
  //         <Text variant="bodySmall" style={styles.nutritionValue}>
  //           {product.fiber}g
  //         </Text>
  //       </View>,
  //     );
  //   }
  //
  //   if (product.sugar) {
  //     nutritionItems.push(
  //       <View key="sugar" style={styles.nutritionItem}>
  //         <Text variant="bodySmall" style={styles.nutritionLabel}>
  //           {t('products.sugar')}:
  //         </Text>
  //         <Text variant="bodySmall" style={styles.nutritionValue}>
  //           {product.sugar}g
  //         </Text>
  //       </View>,
  //     );
  //   }
  //
  //   return nutritionItems;
  // };

  // const renderPriceInfo = () => {
  //   if (!product.price) return null;
  //
  //   return (
  //     <Card style={styles.priceCard}>
  //       <Card.Content>
  //         <View style={styles.priceContainer}>
  //           <Text variant="headlineSmall" style={styles.priceText}>
  //             €{product.price.toFixed(2)}
  //           </Text>
  //           {product.pricePerUnit && (
  //             <Text variant="bodyMedium" style={styles.pricePerUnitText}>
  //               €{product.pricePerUnit.toFixed(2)} per unit
  //             </Text>
  //           )}
  //         </View>
  //       </Card.Content>
  //     </Card>
  //   );
  // };

  // const handleAddToCart = () => {
  //   Alert.alert('Add to Cart', 'This feature will be implemented soon.', [
  //     { text: 'OK' },
  //   ]);
  // };

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

        {/* Price Information */}
        {/*{renderPriceInfo()}*/}

        <Space size={16} />

        {/* Nutritional Information */}
        {/*{renderNutritionalInfo().length > 0 && (*/}
        {/*  <View style={styles.nutritionContainer}>*/}
        {/*    <Text variant="titleMedium" style={styles.sectionTitle}>*/}
        {/*      {t('products.nutritional_information')}*/}
        {/*    </Text>*/}
        {/*    <View style={styles.nutritionGrid}>{renderNutritionalInfo()}</View>*/}
        {/*  </View>*/}
        {/*)}*/}

        <Space size={16} />

        {/* Product Information */}
        {renderProductInfo()}

        <Space size={16} />

        <Space size={32} />
      </ScrollView>
    </SafeAreaBackground>
  );
};
