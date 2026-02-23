import React, { useState, useMemo } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import {
  List,
  Divider,
  Chip,
  IconButton,
  Card,
  Switch,
} from 'react-native-paper';
import { useStyle } from '~/styles/hooks';
import { themedStyles } from './styles';
import { IProductList, IProductListItem } from './types';
import {
  IProductCategory,
  IProduct,
  ESeller,
  EProductsType,
} from '~/types/IProduct';
import { useSelector } from 'react-redux';
import { RootStateT } from '~/store';
import { selectSellerProductsData } from '~/store/products/selectors';
import { ProductListItem } from './ProductListItem';
import ChevronDownIcon from '~/assets/svg/common/chevron-down.svg';
import ChevronUpIcon from '~/assets/svg/common/chevron-up.svg';

export const ProductList: React.FC<IProductList> = ({ seller }) => {
  const [styles] = useStyle(themedStyles);

  // Get products and categories from store using the new selector
  const { products, categories } = useSelector((state: RootStateT) =>
    selectSellerProductsData(state, seller),
  );

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  // Add state for controlling visibility
  const [showCategories, setShowCategories] = useState(true);
  const [showProducts, setShowProducts] = useState(true);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getProductIdsForCategory = (categoryId: string): string[] => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.productIds || [];
  };

  // Modify flatListData to respect visibility settings
  const flatListData = useMemo(() => {
    const result: IProductListItem[] = [];

    const addCategoryAndChildren = (
      category: IProductCategory,
      level: number = 0,
      parentId?: string,
    ) => {
      // Only add categories if showCategories is true
      if (showCategories) {
        result.push({
          type: 'category',
          data: category,
          level,
          parentId,
        });
      }

      const isExpanded = expandedCategories.has(category.id);

      if (isExpanded) {
        // Add subcategories first (only if showCategories is true)
        if (
          showCategories &&
          category.categories &&
          category.categories.length > 0
        ) {
          category.categories.forEach(subCategory => {
            addCategoryAndChildren(subCategory, level + 1, category.id);
          });
        }

        // Add products in this category (only if showProducts is true)
        if (showProducts) {
          // const categoryProductIds = getProductIdsForCategory(category.id);
          const categoryProductIds = category?.productIds || [];
          categoryProductIds.forEach(productId => {
            result.push({
              type: 'product',
              data: productId,
              level: level + 1,
              parentId: category.id,
            });
          });
        }
      }
    };

    // Process root categories
    categories.forEach(category => {
      addCategoryAndChildren(category, 0);
    });

    return result;
  }, [categories, expandedCategories, products, showCategories, showProducts]);

  const renderCategory = (item: IProductListItem) => {
    const category = item.data as IProductCategory;
    const isExpanded = expandedCategories.has(category.id);
    const categoryProductIds = getProductIdsForCategory(category.id);
    const hasSubcategories =
      category.categories && category.categories.length > 0;
    const hasProducts = categoryProductIds.length > 0;

    return (
      <View style={[styles.categoryContainer, { marginLeft: item.level * 16 }]}>
        <List.Item
          title={category.name || 'Unnamed Category'}
          left={() => (
            <View style={styles.categoryIconContainer}>
              <Text style={styles.categoryIcon}>
                {hasSubcategories ? '📁' : '📦'}
              </Text>
            </View>
          )}
          right={() => (
            <View style={styles.categoryRightContainer}>
              {hasProducts && (
                <Chip style={styles.countChip} textStyle={styles.countText}>
                  {categoryProductIds.length}
                </Chip>
              )}
              <TouchableOpacity onPress={() => toggleCategory(category.id)}>
                {isExpanded ? (
                  <ChevronUpIcon width={20} height={20} />
                ) : (
                  <ChevronDownIcon width={20} height={20} />
                )}
              </TouchableOpacity>
            </View>
          )}
          onPress={() => toggleCategory(category.id)}
          style={styles.categoryItem}
          titleStyle={styles.categoryTitle}
        />
        <Divider style={styles.categoryDivider} />
      </View>
    );
  };

  const renderProduct = (item: IProductListItem) => {
    const productId = item.data as string; // Now data is just the productId string

    return (
      <View style={{ marginLeft: item.level * 16 }}>
        <ProductListItem productId={productId} seller={seller} />
      </View>
    );
  };

  const renderItem = ({ item }: { item: IProductListItem }) => {
    switch (item.type) {
      case EProductsType.CATEGORY:
        return renderCategory(item);
      case EProductsType.PRODUCT:
        return renderProduct(item);
      default:
        return null;
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateTitle}>No Products Found</Text>
      <Text style={styles.emptyStateDescription}>
        No products are available for {seller} at the moment.
      </Text>
    </View>
  );

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const keyExtractor = (item: IProductListItem, index: number) => {
    if (item.type === 'category') {
      return `category-${(item.data as IProductCategory).id}`;
    } else {
      return `product-${item.data as string}`; // Changed to string for productId
    }
  };

  if (categories.length === 0) {
    return renderEmptyComponent();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={flatListData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};
