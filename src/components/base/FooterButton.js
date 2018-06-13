import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from 'expo';

import { Colors } from '../../constants';
import { LogoSmallWhite } from '../styled';

const Wrapper = styled(LinearGradient)`
  height: 75;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const IconWrapper = styled.View`
  margin-right: 10;
`;
const Text = styled.Text`
  color: #fff;
  font-family: 'th-fancy-medium';
  font-size: 23;
`;

const FooterButton = ({
  onPress,
  text,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Wrapper
        colors={[Colors.buttonLeft, Colors.buttonRight]}
        start={[0, 0.5]} end={[1, 0.5]}
      >
        <IconWrapper>
          <LogoSmallWhite
            height={30}
          />
        </IconWrapper>
        <Text>{text}</Text>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default FooterButton;
