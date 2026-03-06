// GenericProductItem.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectGenericProductById } from '~/store/genericProducts/selectors';

interface Props {
  genericProductId: string;
  onPress: (id: string) => void;
}

export const GenericProductListItem: React.FC<Props> = ({ genericProductId, onPress }) => {
  const product = useSelector((state: any) =>
    selectGenericProductById(state, genericProductId),
  );

  if (!product) return null;

  const sellers = [
    ...new Set(product.matchingProducts?.map(m => m.seller) || []),
  ];

  return (
    <Pressable onPress={() => onPress(product.id)} style={styles.container}>
      <Image
        source={{
          uri:
            product.thumbnail ||
            product.image ||
            'https://via.placeholder.com/48',
        }}
        style={styles.image}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.name}</Text>

        {product.nameEn && <Text style={styles.nameEn}>{product.nameEn}</Text>}

        <View style={styles.sellersRow}>
          {sellers.map((seller: string) => (
            <View key={seller} style={styles.badge}>
              <Text style={styles.badgeText}>{seller}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(GenericProductListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  nameEn: {
    fontSize: 13,
    color: '#6b7280',
  },
  sellersRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
  },
});
