import React from 'react';
import Carousel from 'react-native-snap-carousel';

import ChallengeCardJumbo from './ChallengeCardJumbo';
import { Style, Layout } from '../../constants';

function renderChallenges({ item: challenge }) {
  return (
    <ChallengeCardJumbo
      key={challenge.id}
      title={challenge.title}
      bannerImageUrl={challenge.banner_image_url}
      locationLabel={challenge.location_label}
      rating={challenge.rating}
      rewardId={challenge.reward_id}
      rewardGifePoints={challenge.reward_gife_points}
    />
  );
}

const SpotlightCarousel = ({ challenges }) => {
  return (
    <Carousel
      data={challenges}
      renderItem={renderChallenges}
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
