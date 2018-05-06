import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants';

class ExploreTab extends Component {
  static navigationOptions = {
    header: null,
    title: 'ค้นหา',
    tabBarIcon: ({ focused }) => (
      <FontAwesome
        name="search"
        color={focused ? Colors.main : Colors.textGreyLighter}
        size={25}
      />
    ),
  }

  render() {
    return (
      <View>
        <Text>ExploreTab</Text>
      </View>
    );
  }
}

export default ExploreTab;
