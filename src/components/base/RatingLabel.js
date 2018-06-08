import React from 'react';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants';

// Styled components
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Icon = styled(FontAwesome)`
  margin-right: 4;
`;
const Text = styled.Text`
  font-size: 13;
  color: ${props => props.color || Colors.rating};
  font-weight: bold;
`;

const RatingLabel = ({ rating, color }) => {
  return (
    <Wrapper>
      <Icon name="star" color={Colors.rating} size={14} />
      <Text color={color}>{rating}</Text>
    </Wrapper>
  );
};

export default RatingLabel;
