import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.View`
  border-radius: 5;
  background-color: #000;
  padding-horizontal: 12;
  padding-vertical: 10;
`;
const Text = styled.Text`
  color: #fff;
`;

const TimerLabel = ({ daysLeft }) => (
  <Wrapper><Text>{ daysLeft } Days Left</Text></Wrapper>
);

export default TimerLabel;
