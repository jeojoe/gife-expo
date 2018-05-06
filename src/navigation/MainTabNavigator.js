import { TabNavigator, TabBarBottom } from 'react-navigation';

import { Colors } from '../constants';
import { ExploreTab, GifeTab, RewardTab, ProfileTab } from '../screens';


export default TabNavigator(
  {
    ExploreTab: {
      screen: ExploreTab,
    },
    GifeTab: {
      screen: GifeTab,
    },
    RewardTab: {
      screen: RewardTab,
    },
    ProfileTab: {
      screen: ProfileTab,
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: Colors.main,
      style: {
        borderTopWidth: 0,
        backgroundColor: '#fff',
      },
      allowFontScaling: true,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
