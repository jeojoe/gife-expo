import React from 'react';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import styled from 'styled-components';

import { Colors } from '../../constants';
import { ChallengeCardJumbo } from '../challenge';

const Wrapper = styled(LinearGradient)`
  flex: 1;
`;
const Header = styled.Text`
  font-size: 56;
`;

const StartChallengeModal = ({
  challenge,
  isVisible
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}
    >
      <Wrapper
        colors={[Colors.mainGradientTopLeft, Colors.mainGradientBottomRight]}
        start={[0, 1]} end={[1, 0]}
      >
        <Header>Let's Gife</Header>
        {challenge &&
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
        }
      </Wrapper>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    isVisible: state.isStartChallengeModalVisible,
  };
}

export default connect(mapStateToProps)(StartChallengeModal);
