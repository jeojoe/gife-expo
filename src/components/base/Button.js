import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components';

import { Colors } from '../../constants';

const Wrapper = styled(LinearGradient)`
  height: 52;
  border-radius: 5;
  overflow: hidden;
  padding-horizontal: 20;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 18;
  color: ${props => props.textColor || '#222'};
`;
const IconWrapper = styled.View`
  margin-right: 10;
`;

const Button = ({
  text, bgColor, onPress, icon, disabled, textStyle,
}) => {
  let leftColor = Colors.buttonLeft;
  let rightColor = Colors.buttonRight;
  let textColor = '#fff';

  if (bgColor === 'white') {
    leftColor = '#fff'; rightColor = '#fff'; textColor = Colors.main;
  } else if (bgColor === 'pink') {
    leftColor = Colors.main; rightColor = Colors.main; textColor = '#fff';
  }

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.6}
      disabled={disabled}
    >
      <Wrapper
        colors={[leftColor, rightColor]}
        style={Platform.select({
          ios: {
            shadowColor: Colors.buttonShadowOnPink,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 5,
          },
          android: {
            elevation: 10,
          },
        })}
        start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
      >
        {icon &&
          <IconWrapper>
            {icon}
          </IconWrapper>
        }
        <Text textColor={textColor} style={textStyle}>
          {text}
        </Text>
      </Wrapper>
    </TouchableOpacity>
  );
};

Button.defaltProps = {
  height: 40,
};

export default Button;
