import React from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

// Styled components
const Wrapper = styled.View`
  border-radius: ${props => (props.small ? 10 : 12)};
  background-color: rgba(0,0,0,0.7);
  height: ${props => (props.small ? 20 : 24)};
  align-items: center;
  padding-horizontal: ${props => (props.small ? 7 : 12)};
  flex-direction: row;
  align-self: flex-start;
`;
const Text = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: ${props => (props.small ? 12 : 14)}
`;
const Icon = styled(MaterialIcons)`
  margin-right: ${props => (props.small ? 2 : 4)};
`;

const TimerLabel = ({ durationTitle, small }) => {
  return (
    <Wrapper small={small}>
      <Icon name="timer" size={small ? 15 : 18} color="#fff" small={small} />
      <Text small={small}>{!small && 'ภารกิจ '}{durationTitle}</Text>
    </Wrapper>
  );
};

export default TimerLabel;
