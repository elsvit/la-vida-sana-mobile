import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '~/components/haptic-tab';
import { EIconSymbolName, IconSymbol } from '~/components/ui/icon-symbol';
import { Colors } from '~/constants/theme';
import { useColorScheme } from '~/hooks/use-color-scheme';
import { t } from "i18next";
import { EMainTabs } from '~/types/INavigation';
import HomeIcon from '~/assets/svg/mainTabs/home.svg';
import HomeActiveIcon from '~/assets/svg/mainTabs/home-active.svg';
import MenuIcon from '~/assets/svg/mainTabs/menu.svg';
import MenuActiveIcon from '~/assets/svg/mainTabs/menu-active.svg';
import MoreIcon from '~/assets/svg/mainTabs/more.svg';
import MoreActiveIcon from '~/assets/svg/mainTabs/more-active.svg';
import ShoppingIcon from '~/assets/svg/mainTabs/shopping.svg';
import ShoppingActiveIcon from '~/assets/svg/mainTabs/shopping-active.svg';
import StorageIcon from '~/assets/svg/mainTabs/storage.svg';
import StorageActiveIcon from '~/assets/svg/mainTabs/storage-active.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const MAIN_TABS = [
    {
      name: EMainTabs.Home,
      // iconName: EIconSymbolName.home,
      // iconName: 'home',
      Icon: HomeIcon,
      ActiveIcon: HomeActiveIcon,
      title: t('home.title') || 'Home',
    },
    {
      name: EMainTabs.Menu,
      // iconName: EIconSymbolName.menu,
      // iconName: 'menu',
      Icon: MenuIcon,
      ActiveIcon: MenuActiveIcon,
      title: t('menu.title') || 'Menu',
    },
    {
      name: EMainTabs.Shopping,
      // iconName: EIconSymbolName.shopping,
      // iconName: 'shopping',
      Icon: ShoppingIcon,
      ActiveIcon: ShoppingActiveIcon,
      title: t('shopping.title') || 'Shopping',
    },
    {
      name: EMainTabs.Storage,
      // iconName: EIconSymbolName.storage,
      // iconName: 'storage',
      Icon: StorageIcon,
      ActiveIcon: StorageActiveIcon,
      title: t('storage.title') || 'Storage',
    },
    {
      name: EMainTabs.More,
      // iconName: 'more-horiz',
      // iconName: MAPPING.more,
      // iconName: EIconSymbolName.more,
      // iconName: 'more',
      Icon: MoreIcon,
      ActiveIcon: MoreActiveIcon,
      title: t('more.title') || 'More',
    },
  ];

  console.log('TEST_69 EIconSymbolName:' , EIconSymbolName);


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Debug: ensure inactive icons are visible and rule out custom button interference
        tabBarInactiveTintColor: '#8e8e93',
        headerShown: false,
        tabBarButton: HapticTab, // temporarily disable to rule out any interference
      }}>
      {MAIN_TABS.map(({ name, Icon, ActiveIcon, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            // tabBarIcon: ({ color }) => (
            //   <IconSymbol size={28} name={iconName} color={color} />
            // ),
            tabBarIcon: ({ focused }) => {
              return focused ? <ActiveIcon /> : <Icon />;
            },
          }}
        />
      ))}
    </Tabs>

  );
}
