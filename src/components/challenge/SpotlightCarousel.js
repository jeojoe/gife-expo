import React from 'react';
import { Dimensions, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import ChallengeCardJumbo from './ChallengeCardJumbo';

const { width: windowWidth } = Dimensions.get('window');

function renderItems(items, index) {
  return <ChallengeCardJumbo />;
}

const SpotlightCarousel = ({ challenges }) => {
  return (
    <Carousel
      data={challenges}
      renderItem={renderItems}
      sliderWidth={windowWidth}
      itemWidth={windowWidth * 0.865}
      containerCustomStyle={{ marginBottom: 30 }}
    />
  );
}

export default SpotlightCarousel;
