import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { useEffect } from 'react';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { useGetDishes } from '~/hooks/dishes';
import { t } from '~/services/localization/localization';
import { ActivityIndicator } from 'react-native-paper';
import { useStyle } from '~/styles';
import { themedStyles } from './styles';
import { FlatList, View, Text } from 'react-native';
// import { IDish } from '~/types/IDish';
import { DishListItem } from '~/components/DishesListItem';
import { Space } from '~/components/ui/Space';

export const Dishes = () => {
  const [styles] = useStyle(themedStyles);
  const { dishesIds, isLoading, isLoaded, fetchDishesData } = useGetDishes();
  const title = t('dishes.dishes');
  useEffect(() => {
    if (!isLoading && !isLoaded) {
      fetchDishesData();
    }
  }, [isLoading, isLoaded, fetchDishesData]);

  const renderItem = ({ item }: { item: string }) => (
    <DishListItem dishId={item} />
  );

  const renderEmptyComponent = () =>
    isLoading ? (
      <View style={styles.root}>
        <Space size={16} />
        <ActivityIndicator style={styles.root} animating size="small" />
        <Space size={16} />
      </View>
    ) : (
      <View style={styles.root}>
        <Text>{t('dishes.no_dishes_found')}</Text>
      </View>
    );
  const renderSeparator = () => <Space size={16} />;

  return (
    <SafeAreaBackground>
      <ScreenHeader title={title} hasBackButton />
      <FlatList
        keyExtractor={item => item.toLowerCase()}
        data={dishesIds}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaBackground>
  );
};
