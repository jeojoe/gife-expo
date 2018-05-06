import React from 'react';
import { Image } from 'react-native';

import logoSmall from '../assets/images/logo-small.png';
import logoSmallWhite from '../assets/images/logo-small-white.png';
import logoSmallBw from '../assets/images/logo-small-bw.png';

const Logo = (props) => {
  let source = logoSmall;
  let size = 26;

  if (props.type === 'grey') {
    source = logoSmallBw;
  } else if (props.type === 'white') {
    source = logoSmallWhite;
  }

  if (props.size) size = props.size; // eslint-disable-line

  return (
    <Image
      source={source}
      style={[{ width: size, height: size }, props.style]}
    />
  );
};

export default Logo;
