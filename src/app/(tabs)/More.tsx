import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import SettingsIcon from '~/assets/svg/more/settings.svg';
import SellersIcon from '~/assets/svg/more/sellers.svg';
import ProductsIcon from '~/assets/svg/more/products.svg';
// import MercadonaIcon from '~/assets/svg/sellers/mercadona.svg';
// import CarrefourIcon from '~/assets/svg/sellers/carrefour.svg';
import DishesIcon from '~/assets/svg/more/dishes.svg';
import ChevronDownIcon from '~/assets/svg/common/chevron-down.svg';
import ChevronUpIcon from '~/assets/svg/common/chevron-up.svg';
import UsersIcon from '~/assets/svg/more/users.svg';
import UserPlusIcon from '~/assets/svg/more/userPlus.svg';
import UserIcon from '~/assets/svg/more/user.svg';
import { ScreenHeader } from '~/components/blocks/ScreenHeader';
import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { EScreens } from '~/types/INavigation';
import { t } from '~/services';
import { useStyle } from '~/styles/hooks';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '~/store/users/selectors';
import { ESex } from '~/types/IUser';
import { palette, spacing, styleSheetFactory } from '~/styles';
import { useRouter } from 'expo-router';
import { SvgProps } from 'react-native-svg';
import { useGetAllSellersOptions } from '~/hooks/sellers';
import { SELLERS_ICONS } from '~/constants/sellers';

export interface IMoreItem {
  title: string;
  Icon: FC<SvgProps>;
  fill?: string; // Icon fill color
  navigateTo?: EScreens;
  navigateToParams?: any;
  onPress?: () => void;
  items?: IMoreItem[];
}

export default function More() {
  const router = useRouter();

  const [styles] = useStyle(themedStyles);

  const users = useSelector(selectAllUsers) || [];

  const formattedUsers = users.map(user => ({
    title: user.name,
    Icon: UserIcon,
    fill: user.sex === ESex.male ? palette.male : palette.female,
    navigateTo: EScreens.UserEdit,
    navigateToParams: { userId: user.id },
  }));

  const allSellersOptions = useGetAllSellersOptions();

  const formattedSellers = allSellersOptions.map(seller => ({
    title: seller.label,
    Icon: SELLERS_ICONS[seller.value],
    // navigateTo: EScreens.Seller,
    // navigateToParams: { seller },
  }));

  const MORE_ITEMS: IMoreItem[] = [
    {
      title: t('more.settings'),
      Icon: SettingsIcon,
      navigateTo: EScreens.Settings,
    },
    {
      title: t('more.users'),
      Icon: UsersIcon,
      items: [
        ...formattedUsers,
        {
          title: t('more.add_user'),
          Icon: UserPlusIcon,
          navigateTo: EScreens.UserAdd,
        },
      ],
    },

    {
      title: t('sellers.title'),
      Icon: SellersIcon,
      items: [
        ...formattedSellers,
      ],
    },

    {
      title: t('products.products'),
      Icon: ProductsIcon,
      navigateTo: EScreens.Products,
      // items: [
      //   {
      //     title: t('sellers.mercadona'),
      //     Icon: MercadonaIcon,
      //     navigateTo: EScreens.Products,
      //   },
      //   {
      //     title: t('sellers.carrefour'),
      //     Icon: CarrefourIcon,
      //     navigateTo: EScreens.Products,
      //   },
      // ],
    },
    {
      title: t('dishes.dishes'),
      Icon: DishesIcon,
      navigateTo: EScreens.Dishes,
    },
  ];
  const title = t('more.title');

  const handlePress = (
    navigateTo: EScreens | undefined,
    navigateToParams?: any,
  ) => {
    navigateTo &&
      router.push({
        pathname: `/${navigateTo}` as any,
        params: navigateToParams,
      });
  };

  const keyExtractor = (item: IMoreItem, index: number) =>
    `${item.title}-${index}`;

  return (
    <SafeAreaBackground hasTopInsets>
      <ScreenHeader title={title} />
      <ScrollView>
        <List.Section>
          {MORE_ITEMS.map((item, index) => {
            // If the item has nested items, use List.Accordion
            if (item.items) {
              return (
                <React.Fragment key={keyExtractor(item, index)}>
                  <List.Accordion
                    title={item.title}
                    left={props => (
                      <item.Icon
                        {...props}
                        style={styles.icon}
                        width={24}
                        height={24}
                        fill={item.fill}
                      />
                    )}
                    right={({ isExpanded }) =>
                      isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />
                    }
                    style={styles.item}
                    titleStyle={styles.title}
                  >
                    {item.items.map((subItem, subIndex) => (
                      <List.Item
                        key={keyExtractor(subItem, subIndex)}
                        title={subItem.title}
                        left={props => (
                          <subItem.Icon
                            {...props}
                            style={styles.icon}
                            width={24}
                            height={24}
                          />
                        )}
                        onPress={() =>
                          subItem.navigateTo && handlePress(
                            subItem.navigateTo,
                            subItem.navigateToParams,
                          )
                        }
                        style={styles.subItem}
                        titleStyle={styles.subtitle}
                      />
                    ))}
                  </List.Accordion>
                  <Divider />
                </React.Fragment>
              );
            }

            // Otherwise, render a regular List.Item
            return (
              <React.Fragment key={keyExtractor(item, index)}>
                <List.Item
                  title={item.title}
                  left={props => (
                    <item.Icon
                      {...props}
                      style={styles.icon}
                      width={24}
                      height={24}
                    />
                  )}
                  onPress={() => handlePress(item.navigateTo)}
                  style={styles.item}
                  titleStyle={styles.title}
                />
                <Divider />
              </React.Fragment>
            );
          })}
        </List.Section>
      </ScrollView>
    </SafeAreaBackground>
  );
}

const themedStyles = styleSheetFactory(palette => ({
  root: {
    flex: 1,
    backgroundColor: palette.background.primary,
    position: 'relative',
  },
  item: {
    height: 52,
    maxHeight: 52,
    paddingHorizontal: spacing(5),
    backgroundColor: palette.background.primary,
  },
  icon: {},
  title: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '700',
    color: palette.text.primary,
  },
  disabledTitle: {
    color: palette.text.disabled,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '400',
    color: palette.text.placeholder,
  },
  subItem: {
    height: 48,
    maxHeight: 48,
    paddingRight: spacing(),
    paddingLeft: spacing(8),
    backgroundColor: palette.background.primary,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: palette.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
  },
  logout: {
    marginBottom: 32,
  },
  logoutText: { fontSize: 16, fontWeight: '400' },
}));
