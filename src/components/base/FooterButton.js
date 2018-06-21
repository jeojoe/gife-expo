import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from 'expo';

import { Colors, Layout } from '../../constants';
import { LogoSmallWhite } from '../styled';

const Wrapper = styled.View`
  height: 75;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-top-color: ${Colors.border};
  border-top-width: ${StyleSheet.hairlineWidth};
`;
const Button = styled(LinearGradient)`
  height: 55;
  width: ${Layout.window.width * 0.8};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10;
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
    <Wrapper>
      <TouchableOpacity
        onPress={onPress}
      >
        <Button
          colors={[Colors.buttonLeft, Colors.buttonRight]}
          start={[0, 0.5]} end={[1, 0.5]}
        >
          <IconWrapper>
            <LogoSmallWhite
              height={30}
            />
          </IconWrapper>
          <Text>{text}</Text>
        </Button>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default FooterButton;
