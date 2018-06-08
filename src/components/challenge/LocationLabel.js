import React from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Icon = styled(MaterialIcons)`
  margin-right: 4;
  padding-top: 2;
`;
const Text = styled.Text`
  font-size: 13;
  color: ${props => props.color || '#000'};
`;

const LocationLabel = ({ text, color }) => {
  return (
    <Wrapper>
      <Icon name="location-on" color={color} size={14} />
      <Text color={color}>{text}</Text>
    </Wrapper>
  );
};

export default LocationLabel;
