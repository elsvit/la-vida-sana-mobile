import React, { useMemo, useState } from 'react';

import { router } from 'expo-router';
import { useSelector } from 'react-redux';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { GenericProductList } from '~/components/genericProducts/GenericProductList';
import { Search } from '~/components/ui/Search/Search';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { selectLang } from '~/store/account';
import {
  selectAllGenericProductCategories,
  selectGenericProductById,
} from '~/store/genericProducts/selectors';
import { useStyle } from '~/styles';
import { ELang } from '~/types/ILang';

import themedStyles from './styles';

export default function Products() {
  const [styles] = useStyle(themedStyles);

  const lang = useSelector(selectLang);
  const categories = useSelector(selectAllGenericProductCategories);

  useI18nHeaderTitle('products.products');

  const [searchQuery, setSearchQuery] = useState('');

  // 🔎 Filtered + Sorted Categories
  const filteredCategories = useMemo(() => {
    if (!categories) return [];

    const query = searchQuery.trim().toLowerCase();

    const sorted = [...categories].sort((a, b) => {
      const aName =
        lang === ELang.en
          ? (a.nameEn || a.name || '').toLowerCase()
          : (a.name || '').toLowerCase();

      const bName =
        lang === ELang.en
          ? (b.nameEn || b.name || '').toLowerCase()
          : (b.name || '').toLowerCase();

      return aName.localeCompare(bName);
    });

    if (!query) return sorted;

    // filter products inside categories
    return sorted
      .map(category => {
        const filteredIds =
          category.genericProductIds?.filter(id => {
            const product = selectGenericProductById(
              (window as any).__store?.getState(),
              id,
            );

            if (!product) return false;

            const name = product.name?.toLowerCase() || '';
            const nameEn = product.nameEn?.toLowerCase() || '';

            return name.includes(query) || nameEn.includes(query);
          }) || [];

        return {
          ...category,
          genericProductIds: filteredIds,
        };
      })
      .filter(category => category.genericProductIds?.length);
  }, [categories, searchQuery, lang]);

  const handleProductPress = (id: string) => {
    if (!id) return;

    router.push({
      pathname: '/products/Product/Product',
      params: { id },
    });
  };

  return (
    <SafeAreaBackground>
      {/* 🔎 SEARCH */}
      <Search onChange={setSearchQuery} />

      {/* 📦 PRODUCT LIST */}
      <GenericProductList
        categories={filteredCategories}
        onProductPress={handleProductPress}
      />
    </SafeAreaBackground>
  );
}
