import React from 'react';
import { Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { Colors } from '../../constants';
import { ChallengeCardJumbo } from '../challenge';
import { Button } from '../base';
import { TopSpacer, LogoSmall } from '../styled';
import { ChallengeActions } from '../../actions';

const Wrapper = styled(LinearGradient)`
  flex: 1;
`;
const Header = styled.Text`
  padding-top: 20;
  padding-right: 10;
  margin-bottom: 4;
  font-size: 56;
  font-family: 'brand';
  color: white;
`;
const SubHeader = styled.Text`
  font-size: 18;
  font-family: 'th-fancy-medium';
  color: white;
  margin-bottom: 20;
`;
const ChallengeWrapper = styled.View`
  margin-bottom: 30;
`;
const ButtonWrapper = styled.View`
  margin-bottom: 10;
`;

const StartChallengeModal = ({
  challenge,
  isVisible,
  navigation,
  hideStartChallengeModal,
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
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <TopSpacer />
          <Header>Let's Gife !</Header>
          <SubHeader>คุณเริ่มทำภารกิจนี้แล้ว!</SubHeader>
          {challenge &&
            <ChallengeWrapper>
              <ChallengeCardJumbo
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                bannerImageUrl={challenge.banner_image_url}
                locationLabel={challenge.location_label}
                rating={challenge.rating}
                rewardId={challenge.reward_id}
                rewardGifePoints={challenge.reward_gife_points}
                disabled
              />
            </ChallengeWrapper>
          }
          <ButtonWrapper>
            <Button
              text="ไปที่หน้าภารกิจของฉัน"
              bgColor="white"
              icon={<LogoSmall height={30} />}
              dropShadow
              onPress={() => {
                hideStartChallengeModal();
                // TODO : too-dumb-to-be-real navigation
                setTimeout(() => navigation.goBack(), 300);
                setTimeout(() => navigation.navigate('GifeTab'), 2000);
              }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              text="เลือกภารกิจอื่นต่อ"
              bgColor="main"
              icon={<FontAwesome color="#fff" size={32} name="angle-left" />}
              dropShadow
              onPress={() => {
                hideStartChallengeModal();
              }}
            />
          </ButtonWrapper>
        </ScrollView>
      </Wrapper>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    isVisible: state.isStartChallengeModalVisible,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    hideStartChallengeModal: () => dispatch(ChallengeActions.hideStartChallengeModal()),
  };
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(StartChallengeModal));
