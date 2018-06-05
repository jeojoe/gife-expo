import React from 'react';
import { Provider, connect } from 'react-redux';
import { AppLoading, Asset, Font } from 'expo';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components';

import { RootNavigator } from './navigation';
import { SpinnerOverlay } from './components/base';
import { AuthServices, UserServices } from './services';
import { LoginScreen } from './screens';
import { AuthActions, BaseActions, UserActions } from './actions';
import Store from './Store';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

class App extends React.Component {
  async componentDidMount() {
    await Asset.loadAsync([
      // require('./Global/assets/images/robot-dev.png'),
      // require('./Global/assets/images/robot-prod.png'),
      require('./assets/images/auth-bg-1.png'),
      require('./assets/images/auth-bg-2.png'),
      require('./assets/images/auth-bg-3.png'),
      require('./assets/images/gifedex.png'),
      require('./assets/images/logo-small.png'),
      require('./assets/images/logo-small-white.png'),
      require('./assets/images/logo-small-bw.png'),
      require('./assets/images/logo-white-trans.png'),
      require('./assets/images/icon.png'),
    ]);

    await Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...FontAwesome.font,
      ...MaterialIcons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      brand: require('./assets/fonts/Bangers-Regular.ttf'),
      'th-fancy-regular': require('./assets/fonts/NotoSansThaiUI-Regular.ttf'),
      'th-fancy-medium': require('./assets/fonts/NotoSansThaiUI-Medium.ttf'),
    });

    // Check invitation code
    const code = await AuthServices.getInvitationCode();
    if (code) {
      this.props.setInvitationCode(code);
      // Invited -> check current user
      const currentUser = await UserServices.getCurrentUser();
      this.props.setCurrentUser(currentUser);

      if (currentUser) {
        this.props.setIsLoggedIn(true);
      } else {
        this.props.setIsLoggedIn(false);
      }
    }

    console.log('Finish load resources async!');
    this.props.setAppReady(true);
  }

  render() {
    if (!this.props.isAppReady && !this.props.skipLoadingScreen) {
      return <AppLoading />;
    }

    return (
      <Wrapper>
        <SpinnerOverlay />
        {!this.props.isLoggedIn ?
          <LoginScreen />
          :
          <RootNavigator />
        }
      </Wrapper>
    );
  }
}

// Redux
function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    isAppReady: state.isAppReady,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: currentUser => dispatch(UserActions.setCurrentUser(currentUser)),
    setInvitationCode: code => dispatch(AuthActions.setInvitationCode(code)),
    setIsLoggedIn: bool => dispatch(AuthActions.setIsLoggedIn(bool)),
    setAppReady: bool => dispatch(BaseActions.setAppReady(bool)),
  };
}

const HydratedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const store = Store({});

export default () => (
  <Provider store={store}>
    <HydratedApp />
  </Provider>
);
