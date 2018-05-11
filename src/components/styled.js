import styled from 'styled-components';

import { Style } from '../constants';
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
export const Wrapper = styled.View`
  flex: 1;
  /* Horizontal padding */
  padding-horizontal: ${props => getPadHoriz(props.padHoriz)};
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
