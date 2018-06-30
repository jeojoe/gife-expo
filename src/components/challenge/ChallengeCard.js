import React from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { Colors } from '../../constants';
import { RatingLabel, TimerLabel, LocationLabel } from '../base';

const cardWidth = 180;

// Styled components
const WrapperTop = styled.ImageBackground`
  width: ${cardWidth};
  height: ${cardWidth * 0.9};
  border-radius: 8;
  overflow: hidden;
  justify-content: flex-end;
  background-color: ${Colors.textGrey};
  margin-bottom: 10;
`;
const WrapperBottom = styled.View`
  width: ${cardWidth};
  padding-horizontal: 4;
`;
const BottomRowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const TimerWrapper = styled.View`
  position: absolute;
  top: 7;
  right: 7;
`;
const TitleText = styled.Text`
  font-size: 16;
  margin-bottom: 5;
  font-weight: 500;
`;
const RewardWrapper = styled(LinearGradient)`
  height: 32;
  padding-horizontal: 5%;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
`;
const RewardIcon = styled(FontAwesome)`
  margin-right: 4;
`;
const RewardText = styled.Text`
  color: #fff;
  font-size: 13;
  font-weight: bold;
`;

const ChallengeCard = ({
  id: challengeId,
  title,
  bannerImageUrl,
  locationLabel,
  rating,
  rewardId,
  rewardTitle,
  rewardGifePoints,
  durationTitle,
  navigation,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Challenge', { challengeId })}
      disabled={disabled}
    >
      <View
        style={Platform.select({
          ios: {
            shadowColor: Colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.6,
            shadowRadius: 5,
          },
          android: {
            elevation: 10,
          },
        })}
      >
        <WrapperTop
          source={{ uri: bannerImageUrl }}
        >
          <TimerWrapper>
            <TimerLabel durationTitle={durationTitle} small />
          </TimerWrapper>
          <RewardWrapper
            colors={[Colors.rewardBgLeft, Colors.rewardBgRight]}
            start={[0, 0.5]} end={[1, 0.5]}
          >
            <RewardIcon name="gift" color="#fff" size={16} />
            <RewardText>
              {rewardId ? rewardTitle : `รับ ${rewardGifePoints} GIFE POINTS!`}
            </RewardText>
          </RewardWrapper>
        </WrapperTop>
      </View>
      {/* Detail */}
      <WrapperBottom>
        <TitleText>{title}</TitleText>
        <BottomRowWrapper>
          <LocationLabel
            text={locationLabel}
            color={Colors.textGrey}
          />
          <RatingLabel
            rating={rating}
          />
        </BottomRowWrapper>
      </WrapperBottom>
    </TouchableOpacity>
  );
};

export default withNavigation(ChallengeCard);
