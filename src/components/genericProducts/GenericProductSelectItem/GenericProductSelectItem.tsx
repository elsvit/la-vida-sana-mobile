// GenericProductItem.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectGenericProductById } from '~/store/genericProducts/selectors';
import { Checkbox } from '~/components/ui/Checkbox';

interface Props {
  genericProductId: string;
  isSelected: boolean;
  onPress?: (id: string) => void;
}

const MAX_SELLERS = 3;

export const GenericProductSelectItem: React.FC<Props> = ({ genericProductId, isSelected, onPress }) => {
  const product = useSelector((state: any) =>
    selectGenericProductById(state, genericProductId),
  );

  // Fallback: even if product entity is not yet in the store, render a basic row
  // so that lists don't appear empty when IDs exist but entities haven't loaded.
  if (!product) {
    const content = (
      <>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{genericProductId}</Text>
        </View>
        <View pointerEvents="none" style={styles.checkbox}>
          <Checkbox status={isSelected ? 'checked' : 'unchecked'} />
        </View>
      </>
    );

    return onPress ? (
      <Pressable onPress={() => onPress(genericProductId)} style={styles.container}>
        {content}
      </Pressable>
    ) : (
      <View style={styles.container}>{content}</View>
    );
  }

  const sellers = [
    ...new Set(product.matchingProducts?.map(m => m.seller) || []),
  ];

  const renderContent = () => (
    <>
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
          {sellers.slice(0, MAX_SELLERS).map((seller) => (
            <View key={seller} style={styles.badge}>
              <Text style={styles.badgeText}>{seller}</Text>
            </View>
          ))}
          {sellers.length > MAX_SELLERS ? (
              <View style={styles.badge}>
                <Text style={styles.moreSellers}>+{sellers.length - MAX_SELLERS}</Text>
              </View>

          ) : null}
        </View>
      </View>

      {/* Right-aligned checkbox; pointerEvents disabled so parent Pressable handles taps */}
      <View pointerEvents="none" style={styles.checkbox}>
        <Checkbox status={isSelected ? 'checked' : 'unchecked'} />
      </View>
    </>
  );

  return onPress ?(
    <Pressable onPress={() => onPress(product.id)} style={styles.container}>
      {renderContent()}
    </Pressable>
  ) : (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

export default React.memo(GenericProductSelectItem);

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
  checkbox: {
    marginLeft: 8,
  },
  moreSellers: {
    marginLeft: 6,
    color: '#6b7280',
    fontSize: 12,
    alignSelf: 'center',
  },
});
