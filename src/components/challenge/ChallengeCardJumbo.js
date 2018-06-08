import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';

import { Style, Layout, Colors } from '../../constants';
import { RatingLabel } from '../base';
import TimerLabel from './TimerLabel';
import LocationLabel from './LocationLabel';

const cardWidth = Layout.window.width * Style.spotlightScreenWidthRatio;

const Wrapper = styled.ImageBackground`
  width: ${cardWidth};
  height: ${cardWidth};
  border-radius: 15;
  overflow: hidden;
  justify-content: flex-end;
  background-color: ${Colors.textGrey}
`;
const ButtomRowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const TimerWrapper = styled.View`
  position: absolute;
  top: 10;
  right: 10;
`;
const GradientWrapper = styled(LinearGradient)`
  padding-top: 70;
  padding-bottom: 15;
  padding-horizontal: 6%;
`;
const HeaderText = styled.Text`
  color: #fff;
  font-size: 27;
  margin-bottom: 5;
  font-weight: bold;
`;
const RewardWrapper = styled(LinearGradient)`
  height: 43;
  background-color: red;
  padding-horizontal: 6%;
  align-items: center;
  flex-direction: row;
`;
const RewardIconWrapper = styled.View`
  border-radius: 16;
  background-color: ${Colors.darkPink};
  height: 32; width: 32;
  align-items: center;
  justify-content: center;
  margin-right: 7;
`;
const RewardText = styled.Text`
  color: #fff;
  font-size: 17;
  font-weight: bold;
`;

const ChallengeCardJumbo = ({
  title,
  bannerImageUrl,
  locationLabel,
  rating,
  rewardId,
  rewardTitle,
  rewardGifePoints,
}) => {
  return (
    <TouchableOpacity
      style={Platform.select({
        ios: {
          shadowColor: Colors.shadow,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 10,
        },
        android: {
          elevation: 10,
        },
      })}
    >
      <Wrapper
        source={{ uri: bannerImageUrl }}
      >
        <TimerWrapper>
          <TimerLabel daysLeft={2} />
        </TimerWrapper>
        <GradientWrapper
          colors={['transparent', 'rgba(0,0,0,.9)']}
          start={[0.5, 0]} end={[0.5, 1]}
        >
          <HeaderText>{title}</HeaderText>
          <ButtomRowWrapper>
            <LocationLabel
              text={locationLabel}
              color="#fff"
            />
            <RatingLabel
              rating={rating}
            />
          </ButtomRowWrapper>
        </GradientWrapper>
        <RewardWrapper
          colors={[Colors.rewardBgLeft, Colors.rewardBgRight]}
          start={[0, 0.5]} end={[1, 0.5]}
        >
          <RewardIconWrapper>
            <FontAwesome name="gift" color="#fff" size={22} />
          </RewardIconWrapper>
          <RewardText>
            {rewardId ? rewardTitle : `รับ ${rewardGifePoints} GIFE POINTS!`}
          </RewardText>
        </RewardWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default ChallengeCardJumbo;
