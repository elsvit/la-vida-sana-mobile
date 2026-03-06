import React from 'react';

import { router } from 'expo-router';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { SectionListWithSearch } from '~/components/blocks/SectionListWithSearch';
import { GenericProductListItem } from '~/components/genericProducts';
import useGenericProductsSelectListData from '~/hooks/genericProducts';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { useStyle } from '~/styles';

import themedStyles from './styles';

export default function Products() {
  const [styles] = useStyle(themedStyles);
  useI18nHeaderTitle('products.products');

  const sectionListData = useGenericProductsSelectListData();

  const handleProductPress = (id: string) => {
    if (!id) return;

    router.push({
      pathname: '/products/Product/Product',
      params: { id },
    });
  };

  return (
    <SafeAreaBackground>
      <SectionListWithSearch
        style={styles.list}
        data={sectionListData}
        renderItem={(id: string) => (
          <GenericProductListItem
            genericProductId={id}
            onPress={() => handleProductPress(id)}
          />
        )}
        onChange={(values: string[]) => {
          const id = values[0];
          if (id) handleProductPress(id);
        }}
      />
    </SafeAreaBackground>
  );
}
