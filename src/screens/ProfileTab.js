import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { Colors } from '../constants';

class ProfileTab extends Component {
  static navigationOptions = {
    header: null,
    title: 'โปรไฟล์',
    tabBarIcon: ({ focused }) => (
      <Image
        source={{ uri: 'https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.0-9/74990_1046920815350946_5019913966088668875_n.jpg?_nc_cat=0&oh=38e52d518c3d97625ef93f36236feb5f&oe=5B2EDCE7' }}
        style={[{
          borderRadius: 16,
          height: 32,
          width: 32,
        }, focused && {
          borderWidth: 2,
          borderColor: Colors.main,
        }]}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text>ProfileTab</Text>
      </View>
    );
  }
}

export default ProfileTab;
