import React from 'react';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Icon = styled(FontAwesome)`
  margin-right: 7;
`;
const Text = styled.Text`
  color: ${props => props.color};
  font-size: 19;
  padding-top: 3;
`;

const BackButton = ({
  color = '#fff',
  text = 'Back',
  onPress,
}) => {
  return (
    <Wrapper
      onPress={onPress}
    >
      <Icon
        color={color}
        size={36}
        name="angle-left"
      />
      <Text color={color}>{text}</Text>
    </Wrapper>
  );
};

export default BackButton;
