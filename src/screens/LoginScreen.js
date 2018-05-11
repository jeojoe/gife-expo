import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform, StatusBar, Image } from 'react-native';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { WrapperImage, Wrapper, Logo as LogoBase } from '../components/styled';
import { AssetUtils } from '../utils';
import { BaseActions, AuthActions } from '../actions';

// Styled cmp
const ScrollWrapper = Wrapper.extend`
  padding-top: 40%;
  justify-content: center;
`;
const Logo = LogoBase.extend`
  margin-bottom: 20;
`;
const HeaderText = styled.Text`
  color: #fff;
  font-family: 'th-fancy-regular';
`;

// Cmp
class LoginScreen extends Component {
  eiei = () => {
    console.log('lol');
  }

  renderInvitation = () => {
    return (
      <KeyboardAwareScrollView>
        <ScrollWrapper padHoriz="thick">
          <Logo height={70} />
          <HeaderText>หกสดา่หาก่ด</HeaderText>
        </ScrollWrapper>
      </KeyboardAwareScrollView>
    );
  }

  renderLogin = () => {
    return <Text>Login</Text>;
  }

  render() {
    return (
      <WrapperImage
        source={AssetUtils.randomBg()}
      >
        <StatusBar
          translucent
          animated
          barStyle="light-content"
        />
        {!this.props.invitationCode
          ? this.renderInvitation()
          : this.renderLogin()
        }
      </WrapperImage>
    );
  }
}

// Redux
function mapStateToProps(state) {
  return {
    invitationCode: state.invitationCode,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setInvitationCode: code => dispatch(AuthActions.setInvitationCode(code)),
    isLoading: bool => dispatch(BaseActions.isLoading(bool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
