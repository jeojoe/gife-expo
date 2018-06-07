import styled from 'styled-components';
import { Platform } from 'react-native';

import { Style, Colors } from '../constants';
import logoWhiteTrans from '../assets/images/logo-white-trans.png';

// Helpers
function getPadHoriz(padHoriz) {
  switch (padHoriz) {
    case 'base':
      return Style.padHoriz;
    case 'thick':
      return Style.padHorizThick;
    default:
      return 0;
  }
}

// Layout
export const TopSpacer = styled.View`
  height: ${props => props.height || Platform.select({
    ios: 30,
    android: 45,
  })};
`;
export const Wrapper = styled.View`
  flex: 1;
  /* Horizontal padding */
  padding-horizontal: ${props => getPadHoriz(props.padHoriz)};
  background-color: ${props => props.bgColor || 'transparent'}
`;

export const WrapperImage = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  /* Horizontal padding */
  padding-horizontal: ${props => getPadHoriz(props.padHoriz)};
`;

export const Logo = styled.Image.attrs({
  source: logoWhiteTrans,
})`
  width: ${props => props.height * 2.3957894737};
  height: ${props => props.height};
`;

// Text
export const BrandText = styled.Text`
  font-family: 'brand';
`;
export const BodyText = styled.Text`
  font-size: 16;
  color: ${props => props.color || '#222'};
  margin-bottom: ${props => props.marginBottom || 0};
`;
export const HeaderText = BodyText.extend`
  font-size: 24;
  padding-horizontal: 32;
  font-family: 'th-fancy-regular';
`;
export const HeaderTextFront = HeaderText.extend`
  color: ${Colors.textGrey};
  padding-horizontal: 0;
`;
export const PlaceHolderTextGrey = BodyText.extend`
  color: '#999';
`;

// Input
export const GifeInput = styled.TextInput.attrs({
  placeholderTextColor: Colors.textOnLightPink,
  underlineColorAndroid: 'transparent',
})`
  font-size: 16;
  padding-horizontal: 15;
  padding-vertical: 10;
  border-radius: 5;
  color: ${props => (props.textColor || '#fff')};
  background-color: ${props => (props.bgColor || Colors.lightPink)};
`;
