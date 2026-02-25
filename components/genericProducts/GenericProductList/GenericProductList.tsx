// GenericProductList.tsx
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { IGenericProductCategory } from '~/types/IGenericProduct';
import { GenericProductListItem } from './GenericProductListItem';
import { ELang } from '~/types/ILang';
import { useSelector } from 'react-redux';
import { selectLang } from '~/store/account';

interface Props {
  categories: IGenericProductCategory[];
  onProductPress: (id: string) => void;
}

export const GenericProductList: React.FC<Props> = ({
  categories,
  onProductPress,
}) => {
  const lang = useSelector(selectLang);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleCategory = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const flattened = useMemo(() => {
    const result: any[] = [];

    for (const category of categories) {
      result.push({
        type: 'category',
        id: category.id,
        category,
      });

      if (expanded[category.id] && category.genericProductIds) {
        for (const id of category.genericProductIds) {
          result.push({
            type: 'product',
            genericProductId: id,
          });
        }
      }
    }

    return result;
  }, [categories, expanded]);

  const getNames = useCallback(
    (name: string, nameEn: string) => {
      const hasName2 = name && nameEn;
      const name1 = lang === ELang.en && nameEn ? nameEn : name || nameEn || '';
      const name2 = hasName2 ? (lang === ELang.en ? name : nameEn) : '';
      return { name1, name2 } as any;
    },
    [lang],
  );

  return (
    <FlatList
      data={flattened}
      keyExtractor={item =>
        item.type === 'category'
          ? `cat-${item.id}`
          : `prod-${item.genericProductId}`
      }
      renderItem={({ item }) =>
        item.type === 'category' ? (
          <Pressable
            onPress={() => toggleCategory(item.id)}
            style={styles.categoryRow}
          >
            <Text style={styles.categoryName1}>
              {expanded[item.id] ? '▼ ' : '▶ '}
              {getNames(item.category.name, item.category.nameEn).name1}
            </Text>
            {getNames(item.category.name, item.category.nameEn).name2 && (
              <Text
                style={styles.categoryName2}
              >
                {`(${getNames(item.category.name, item.category.nameEn).name2})`}
              </Text>
            )}
          </Pressable>
        ) : (
          <GenericProductListItem
            genericProductId={item.genericProductId}
            onPress={onProductPress}
          />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#f3f4f6',
    alignItems: 'flex-end',
  },
  categoryName1: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryName2: {
    fontSize: 12,
    color: '#6b7280',
    paddingLeft: 8,
  },
});
