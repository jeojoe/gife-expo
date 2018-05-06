import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Colors } from '../constants';

class RewardTab extends Component {
  static navigationOptions = {
    header: null,
    title: 'รางวัล',
    tabBarIcon: ({ focused }) => (
      <FontAwesome
        name="gift"
        color={focused ? Colors.main : Colors.textGreyLighter}
        size={30}
      />
    ),
  }

  render() {
    return (
      <View>
        <Text>RewardTab</Text>
      </View>
    );
  }
}

export default RewardTab;
