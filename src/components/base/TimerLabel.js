import React from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

// Styled components
const Wrapper = styled.View`
  border-radius: 12;
  background-color: #000;
  height: 24;
  align-items: center;
  padding-horizontal: 12;
  flex-direction: row;
  align-self: flex-start;
`;
const Text = styled.Text`
  color: #fff;
  font-weight: 600;
`;
const Icon = styled(MaterialIcons)`
  margin-right: 4;
`;

const TimerLabel = ({ daysLeft }) => (
  <Wrapper>
    <Icon name="timer" size={18} color="#fff" />
    <Text>เหลือ { daysLeft } วัน</Text>
  </Wrapper>
);

export default TimerLabel;
