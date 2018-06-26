import { createBottomTabNavigator } from 'react-navigation';

import { Colors } from '../constants';
import { ExploreTab, GifeTab, RewardTab, ProfileTab } from '../screens';

export default createBottomTabNavigator(
  {
    ExploreTab,
    GifeTab,
    RewardTab,
    ProfileTab,
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
    animationEnabled: true,
    swipeEnabled: false,
  },
);
