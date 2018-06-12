import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import ChallengeCardJumbo from './ChallengeCardJumbo';
import { Style, Layout, Colors } from '../../constants';

class SpotlightCarousel extends Component {
  state = {
    activeIndex: 0,
  }

  get pagination() {
    const { challenges } = this.props;
    const { activeIndex } = this.state;
    return (
      <Pagination
        dotsLength={challenges.length}
        activeDotIndex={activeIndex}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 2,
            backgroundColor: Colors.main,
        }}
        inactiveDotStyle={{
            backgroundColor: '#000',
        }}
        containerStyle={{
          marginTop: -25,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  renderChallenges = ({ item: challenge }) => {
    return (
      <ChallengeCardJumbo
        key={challenge.id}
        id={challenge.id}
        title={challenge.title}
        bannerImageUrl={challenge.banner_image_url}
        locationLabel={challenge.location_label}
        rating={challenge.rating}
        rewardId={challenge.reward_id}
        rewardGifePoints={challenge.reward_gife_points}
      />
    );
  }

  render() {
    const { challenges } = this.props;
    return (
      <React.Fragment>
        <Carousel
          data={challenges}
          renderItem={this.renderChallenges}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width * Style.spotlightScreenWidthRatio}
          containerCustomStyle={{
            paddingTop: 20,
            paddingBottom: 20, /* For shadow */
          }}
          onSnapToItem={activeIndex => this.setState({ activeIndex })}
        />
        {this.pagination}
      </React.Fragment>
    );
  }
}

export default SpotlightCarousel;
