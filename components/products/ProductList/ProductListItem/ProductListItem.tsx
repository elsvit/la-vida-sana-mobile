import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Chip, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useStyle } from '~/styles/hooks';
import { themedStyles } from './styles';
import { IProductListItem } from './types';
import { selectById } from '~/store/products/selectors';
import { IProduct } from '~/types/IProduct';
import { useRouter } from "expo-router";
import { EScreens, NavigationProp } from '~/types/INavigation';

export const ProductListItem: React.FC<IProductListItem> = ({
  productId,
  seller,
}) => {
  const [styles] = useStyle(themedStyles);
  const router = useRouter();

  const product: IProduct | undefined = useSelector(
    selectById(seller, productId),
  );

  if (!product) {
    return null; // or return a loading/error component
  }

  const imageUrl = product.thumbnail || product.image;

  const handlePress = () => {
    router.push({
      pathname: `/${EScreens.Product}` as any,
      params: { productId, seller },
    });
  };

  return (
    <Card style={styles.productCard} onPress={handlePress}>
      <Card.Content style={styles.productContent}>
        <View style={styles.productMainRow}>
          {/* Thumbnail or Image */}
          <View style={styles.productImageContainer}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.productImagePlaceholder}>
                {product.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            {/* Name */}
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>

            {/* Size, SizeFormat and Price in one row */}
            <View style={styles.productDetailsRow}>
              {/* Size and SizeFormat */}
              {(product.size || product.sizeFormat) && (
                <Text style={styles.productSize}>
                  {product.size && product.sizeFormat
                    ? `${product.size} ${product.sizeFormat}`
                    : product.size || product.sizeFormat}
                </Text>
              )}

              {/* Price */}
              {product.price && (
                <Text style={styles.productPrice}>
                  €{product.price.toFixed(2)}
                </Text>
              )}
            </View>
          </View>

          {/* Action Button */}
          <IconButton
            icon="chevron-right"
            size={20}
            onPress={() => {
              console.log('Product pressed:', product.id);
            }}
          />
        </View>

        {/* Nutrition Info - Small fonts */}
        {(product.calories ||
          product.protein ||
          product.carbohydrates ||
          product.fat) && (
          <View style={styles.nutritionRow}>
            {product.calories && (
              <Text style={styles.nutritionText}>{product.calories} cal</Text>
            )}
            {product.protein && (
              <Text style={styles.nutritionText}>
                {product.protein}g protein
              </Text>
            )}
            {product.carbohydrates && (
              <Text style={styles.nutritionText}>
                {product.carbohydrates}g carbs
              </Text>
            )}
            {product.fat && (
              <Text style={styles.nutritionText}>{product.fat}g fat</Text>
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
