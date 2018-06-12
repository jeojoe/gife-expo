import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Colors } from '../../constants';

const Wrapper = styled.View`
  border-radius: 10;
  border-color: ${Colors.border};
  border-width: 2;
  align-self: flex-start;
  overflow: hidden;
  max-width: 200;
`;
const WrapperTop = styled.View`
  border-bottom-width: 1;
  border-bottom-color: ${Colors.border};
  padding-horizontal: 10;
  padding-vertical: 8;
  background-color: ${Colors.featherMain};
`;
const WrapperBottom = styled.View`
  padding-horizontal: 10;
  padding-vertical: 8;
`;
const Text = styled.Text`
  font-size: 14;
  text-align: center;
  font-weight: bold;
  color: ${props => props.color || '#000'};
`;

const ChallengeDurationLabel = ({
  durationText,
  startDate,
  endDate,
}) => {
  return (
    <Wrapper>
      <WrapperTop>
        <Text color={Colors.main}>ต้องทำให้สำเร็จภายใน {durationText} นับตั้งแต่เริ่มทำภารกิจ</Text>
      </WrapperTop>
      <WrapperBottom>
        <Text>หมดเขต {moment(endDate).format('DD/MM/YYYY')}</Text>
      </WrapperBottom>
    </Wrapper>
  );
};

export default ChallengeDurationLabel;
