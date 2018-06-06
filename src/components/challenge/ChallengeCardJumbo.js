import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';

import { Style, Layout, Colors } from '../../constants';

const cardWidth = Layout.window.width * Style.spotlightScreenWidthRatio;

const Wrapper = styled.View`
  width: ${cardWidth};
  height: ${cardWidth};
  background-color: red;
  border-radius: 10;
`;

const ChallengeCardJumbo = () => {
  return (
    <TouchableOpacity
      style={Platform.select({
        ios: {
          shadowColor: Colors.shadow,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 10,
        },
        android: {
          elevation: 10,
        },
      })}
    >
      <Wrapper />
    </TouchableOpacity>
  );
};

export default ChallengeCardJumbo;
