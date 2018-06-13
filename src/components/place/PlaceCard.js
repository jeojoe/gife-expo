import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from 'expo';
import { withNavigation } from 'react-navigation';

import { LocationLabel, RatingLabel } from '../base';
import { Colors, Style } from '../../constants';
import { PlaceUtils } from '../../utils';

const cardWidth = 240;
// Styled components
const Wrapper = styled.ImageBackground`
  width: ${cardWidth};
  height: ${cardWidth * Style.placeCardRatio};
  border-radius: 10;
  overflow: hidden;
  justify-content: flex-end;
  background-color: ${Colors.textGrey};
`;
const BottomRowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const GradientWrapper = styled(LinearGradient)`
  padding-top: 50;
  padding-bottom: 15;
  padding-horizontal: 6%;
`;
const TitleText = styled.Text`
  color: #fff;
  font-size: 27;
  margin-bottom: 5;
  font-weight: bold;
`;

const PlaceCard = ({
  placeId,
  bannerImageUrl,
  name,
  subregion,
  region,
  province,
  rating,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Place', { placeId })}
    >
      <Wrapper
        source={{ uri: bannerImageUrl }}
      >
        <GradientWrapper
          colors={['transparent', 'rgba(0,0,0,.9)']}
          start={[0.5, 0]} end={[0.5, 1]}
        >
          <TitleText>{name}</TitleText>
          <BottomRowWrapper>
            <LocationLabel
              text={PlaceUtils.getLocationLabel(province, region, subregion)}
              color="#fff"
            />
            <RatingLabel
              rating={rating}
            />
          </BottomRowWrapper>
        </GradientWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default withNavigation(PlaceCard);
