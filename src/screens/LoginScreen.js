import React, { Component } from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import styled from 'styled-components';

import { randomBg } from '../libs/assets';

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
        source={randomBg()}
        resizeMode="cover"
      >
      </Wrapper>
    );
  }
}

export default LoginScreen;
