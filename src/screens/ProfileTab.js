import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import { FooterButton } from '../components/base';
import { Colors } from '../constants';
import { AuthActions } from '../actions';

const UserIcon = styled.Image`
  borderRadius: 16;
  height: 32;
  width: 32;
  borderWidth: ${props => (props.focused ? 2 : 0)};
  borderColor: ${Colors.main};
`;

class ProfileTab extends Component {
  static navigationOptions = {
    header: null,
    title: 'โปรไฟล์',
    tabBarIcon: ({ focused }) => (
      <UserIcon
        source={{ uri: 'https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.0-9/74990_1046920815350946_5019913966088668875_n.jpg?_nc_cat=0&oh=38e52d518c3d97625ef93f36236feb5f&oe=5B2EDCE7' }}
        focused={focused}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text>ProfileTab</Text>
        <FooterButton
          text="Sign out"
          onPress={() => this.props.signOut()}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(AuthActions.signOut()),
  };
}

export default connect(null, mapDispatchToProps)(ProfileTab);
