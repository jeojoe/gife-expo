import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  state = {
    isAppReady: false,
  };

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

    // Dummy : create
    // await AuthServices.setInvitationCode('lolcode');
    // await AuthServices.setToken('token');
    // Dummy : delete
    // await AuthServices.deleteInvitationCode();
    // await AuthServices.deleteToken();

    // const token = await AuthServices.getToken();
    // const code = await AuthServices.getInvitationCode();
    // console.log('token: ', token);
    // console.log('invitation code: ', code);

    // if (code) this.props.setInvitationCode(code);
    // if (token) {
    //   this.props.setIsLoggedIn(true);
    // } else {
    //   this.props.setIsLoggedIn(false);
    // }

    console.log('Finish load resources async!');
    this.setState({ isAppReady: true });
  }

  render() {
    if (!this.state.isAppReady && !this.props.skipLoadingScreen) {
      return (
        <AppLoading />
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <RootNavigation />
      </View>
    );
  }
}
