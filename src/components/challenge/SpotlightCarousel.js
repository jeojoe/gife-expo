import React from 'react';
import Carousel from 'react-native-snap-carousel';

import ChallengeCardJumbo from './ChallengeCardJumbo';
import { Style, Layout } from '../../constants';

function renderItems(items, index) {
  return <ChallengeCardJumbo />;
}

const SpotlightCarousel = ({ challenges }) => {
  return (
    <Carousel
      data={challenges}
      renderItem={renderItems}
      sliderWidth={Layout.window.width}
      itemWidth={Layout.window.width * Style.spotlightScreenWidthRatio}
      containerCustomStyle={{
        marginBottom: 30,
        paddingTop: 15,
        paddingBottom: 25, /* For shadow */
      }}
    />
  );
};

export default SpotlightCarousel;
