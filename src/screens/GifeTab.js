import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Logo } from '../components/base';

class GifeTab extends Component {
  static navigationOptions = {
    header: null,
    title: 'ทำภารกิจ!',
    tabBarIcon: ({ focused }) => (
      <Logo
        type={focused ? 'normal' : 'grey'}
        size={25}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text>GifeTab</Text>
      </View>
    );
  }
}

export default GifeTab;
