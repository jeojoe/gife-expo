import React from 'react';
import { Image } from 'react-native';

import logoSmall from '../../assets/images/logo-small.png';
import logoSmallWhite from '../../assets/images/logo-small-white.png';
import logoSmallBw from '../../assets/images/logo-small-bw.png';

const LogoSmall = ({ color, style, size }) => {
  let source = logoSmall;
  let imgSize = 26;

  if (color === 'grey') {
    source = logoSmallBw;
  } else if (color === 'white') {
    source = logoSmallWhite;
  }

  if (size) imgSize = size; // eslint-disable-line

  return (
    <Image
      source={source}
      style={[{ width: imgSize, height: imgSize }, style]}
    />
  );
};

export default LogoSmall;
