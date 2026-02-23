import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import React, { useState } from 'react';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { t } from '~/services/localization/localization';
// import { ActivityIndicator, IconButton } from 'react-native-paper';
import { useStyle } from '~/styles';
import { themedStyles } from './styles';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
// import { IDish } from '~/types/IDish';
import { Space } from '~/components/ui/Space';
import { ESeller } from '~/types/IProduct';
import { ProductList } from '~/components/products/ProductList';
// import { Divider } from 'react-native-paper';
import MercadonaIcon from '~/assets/svg/sellers/mercadona.svg';
import CarrefourIcon from '~/assets/svg/sellers/carrefour.svg';
import SupermarketIcon from '~/assets/svg/mainTabs/shopping-active.svg';
import ChevronDownIcon from '~/assets/svg/common/chevron-down.svg';
import ChevronUpIcon from '~/assets/svg/common/chevron-up.svg';

export default function Products() {
  const [styles] = useStyle(themedStyles);
  const title = t('products.products');

  // State to track which sellers are visible
  const [visibleSellers, setVisibleSellers] = useState<Set<ESeller>>(
    // new Set([ESeller.MERCADONA, ESeller.CARREFOUR]), // All sellers visible by default
    new Set(), // All sellers visible by default
  );

  const sellers: ESeller[] = [ESeller.MERCADONA, ESeller.CARREFOUR];

  const toggleSellerVisibility = (seller: ESeller) => {
    const newVisibleSellers = new Set(visibleSellers);
    if (newVisibleSellers.has(seller)) {
      newVisibleSellers.delete(seller);
    } else {
      newVisibleSellers.add(seller);
    }
    setVisibleSellers(newVisibleSellers);
  };

  const isSellerVisible = (seller: ESeller) => visibleSellers.has(seller);

  const getSellerDisplayName = (seller: ESeller): string => {
    switch (seller) {
      case ESeller.MERCADONA:
        return t('sellers.mercadona');
      case ESeller.CARREFOUR:
        return t('sellers.carrefour');
      default:
        return seller;
    }
  };

  const getSellerIcon = (seller: ESeller) => {
    switch (seller) {
      case ESeller.MERCADONA:
        return MercadonaIcon;
      case ESeller.CARREFOUR:
        return CarrefourIcon;
      default:
        return SupermarketIcon;
    }
  };

  return (
    <SafeAreaBackground>
      <ScreenHeader title={title} hasBackButton />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {sellers.map(seller => (
          <View key={seller}>
            {/* Seller Header */}
            <View style={styles.sellerHeader}>
              <View style={styles.sellerHeaderContent}>
                {React.createElement(getSellerIcon(seller), {
                  width: 24,
                  height: 24,
                })}
                <Text style={styles.sellerTitle}>
                  {getSellerDisplayName(seller)}
                </Text>
                <View style={styles.sellerHeaderActions}>
                  <TouchableOpacity
                    onPress={() => toggleSellerVisibility(seller)}
                    style={styles.toggleButton}
                  >
                    {isSellerVisible(seller) ? (
                      <ChevronUpIcon width={20} height={20} />
                    ) : (
                      <ChevronDownIcon width={20} height={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Seller Products List - Only render if visible */}
            {isSellerVisible(seller) && (
              <View style={styles.sellerProductsContainer}>
                <ProductList seller={seller} />
              </View>
            )}
          </View>
        ))}

        {/* Bottom spacing */}
        <Space size={4} />
      </ScrollView>
    </SafeAreaBackground>
  );
};
