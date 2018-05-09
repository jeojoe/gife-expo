import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform, StatusBar } from 'react-native';
import styled from 'styled-components';

import { AssetUtils } from '../utils';
import { BaseActions, AuthActions } from '../actions';

const Wrapper = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding-horizontal: 10%;
`;

class LoginScreen extends Component {
  eiei = () => {
    console.log('lol');
  }

  render() {
    return (
      <Wrapper
        source={AssetUtils.randomBg()}
        resizeMode="cover"
      >
        <StatusBar
          translucent
          animated
          barStyle="light-content"
        />

      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
