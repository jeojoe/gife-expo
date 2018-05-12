import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import { Facebook } from 'expo';

import { WrapperImage, Wrapper, Logo as LogoBase, BodyText, GifeInput } from '../components/styled';
import { Button } from '../components/base';
import { AssetUtils } from '../utils';
import { BaseActions, AuthActions } from '../actions';
import { AuthServices } from '../services';
import { AlertMessages, Colors } from '../constants';
import Config from '../../app.json';

const bg = AssetUtils.randomBg();

// Styled cmp
const ScrollWrapper = styled(Wrapper)`
  height: ${Dimensions.get('window').height};
  justify-content: center;
`;
const Logo = styled(LogoBase)`
  margin-bottom: 20;
`;
const InvitationInput = styled(GifeInput)`
  margin-bottom: 20;
`;
const LoginButton = styled(Button)`
  margin-bottom: 20;
`;

// Cmp
class LoginScreen extends Component {
  state = {
    invitationCode: '',
  }

  _verifyCode = () => {
    // Todo: modal bug
    this.props.startLoading();
    AuthServices.verifyInvitationCode(this.state.invitationCode)
      // Success
      .then(() => {
        this.props.endLoading();
        this.props.setInvitationCode(this.state.invitationCode);
      })
      // Error
      .catch((err) => {
        this.props.endLoading();
        console.warn(err);
        setTimeout(() => alert(AlertMessages.INVITATION_CODE_REJECTED), 500);
      });
  }

  _login = async () => {
    const { type, token: accessToken } = await Facebook.logInWithReadPermissionsAsync(Config.expo.facebookAppId, {
      permissions: ['public_profile', 'email', 'user_friends'],
    });

    if (type === 'success') {
      this.props.startLoading();
      try {
        const res = await AuthServices.loginOAuth(accessToken);
        console.log(res);
        this._loginSuccess('facebook', res.body.token);
      } catch (err) {
        console.warn(err);
        alert(AlertMessages.NETWORK_ERR);
      } finally {
        this.props.endLoading();
      }
    }
  }

  _loginSuccess = async (type, token) => {
    console.log(token);
    await AuthServices.setToken(token);
    if (type === 'facebook') {
      console.log('Logged in: FB');
    }
    this.props.setIsLoggedIn(true);
  }

  renderInvitation = () => {
    return (
      <KeyboardAwareScrollView>
        <ScrollWrapper padHoriz="thick">
          <Logo height={70} />
          <BodyText color="white" marginBottom={30}>
            Please insert invitation code for an
            access to beta testing
          </BodyText>
          <InvitationInput
            value={this.state.invitationCode}
            onChangeText={invitationCode => this.setState({ invitationCode })}
            placeholder="Invitation code.."
            keyboardType="numeric"
            maxLength={6}
          />
          <Button
            text="submit"
            onPress={this._verifyCode}
            disabled={!this.state.invitationCode}
            textStyle={{ fontWeight: '600' }}
          />
        </ScrollWrapper>
      </KeyboardAwareScrollView>
    );
  }

  renderLogin = () => {
    return (
      <ScrollView>
        <ScrollWrapper padHoriz="thick">
          <Logo height={70} />
          <BodyText color="white" marginBottom={30}>
            Welcome to beta testing! Complete travel challenges to get reward from us 🎁 Every feedbacks are appreciated!
          </BodyText>
          <LoginButton
            text="Login with Facebook"
            onPress={this._login}
            bgColor="white"
            icon={<FontAwesome name="facebook-square" color={Colors.main} size={22} />}
            textStyle={{ fontWeight: '600' }}
          />
        </ScrollWrapper>
      </ScrollView>
    );
  }

  render() {
    return (
      <WrapperImage
        source={bg}
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
    setIsLoggedIn: bool => dispatch(AuthActions.setIsLoggedIn(bool)),
    startLoading: () => dispatch(BaseActions.startLoading()),
    endLoading: () => dispatch(BaseActions.endLoading()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
