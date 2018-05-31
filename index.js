import Expo from 'expo';
import { YellowBox } from 'react-native';
import App from './src/App';

// IsMounted work around
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

Expo.registerRootComponent(App);
