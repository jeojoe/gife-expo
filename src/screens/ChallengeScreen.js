import React, { Component } from 'react';
import { Image, StyleSheet, FlatList, View, Alert, ListView, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styled from 'styled-components';
import { LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons';

import { BackButton, TimerLabel, LocationLabel, RatingLabel, FooterButton } from '../components/base';
import { ChallengeDurationLabel, StartChallengeModal } from '../components/challenge';
import { PlaceCard } from '../components/place';
import { PlaceHolderTextGrey, FlatListSpacer } from '../components/styled';
import { ChallengeServices } from '../services';
import { Layout, Colors } from '../constants';
import { BaseActions, ChallengeActions } from '../actions';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
// Styled components
const Row = styled.View`
  padding-horizontal: 5%;
  background-color: white;
  border-bottom-color: ${Colors.border};
  border-bottom-width: ${props => (props.noBorderBottom ? 0 : StyleSheet.hairlineWidth)};
  margin-bottom: ${props => (props.noMarginBottom ? 0 : 20)};
  align-items: center;
`;
const RowTitle = styled.Text`
  font-size: 15;
  font-family: 'th-fancy-medium';
  margin-bottom: ${props => (props.noMarginBottom ? 0 : 10)};
  color: ${props => props.color || '#000'};
`;
const ListViewWrapper = styled.ListView`
  flex: 1;
  background-color: green;
`;
const ForegroundWrapper = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding-horizontal: 20;
`;
const ForegroundContentWrapper = styled.View`
  align-items: center;
`;
const ForegroundTitleText = styled.Text`
  color: #fff;
  font-size: 36;
  padding-vertical: 5;
  font-weight: bold;
  text-align: center;
`;
const FixedWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: ${STICKY_HEADER_HEIGHT};
  width: ${Layout.window.width};
  padding-bottom: 10;
  padding-horizontal: 12;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  background-color: transparent;
`;
const BottomRowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const GoalText = styled.Text`
  font-size: 22;
  margin-bottom: 15;
  text-align: center;
`;
const RewardRowWrapper = styled(LinearGradient)`
  padding-horizontal: 6%;
  padding-top: 15;
  padding-bottom: 20;
  margin-bottom: 20;
  align-items: center;
`;
const RewardRowTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10;
`;
const RewardText = styled.Text`
  color: #fff;
  font-size: 22;
  font-weight: bold;
`;
const RewardIconWrapper = styled.View`
  border-radius: 15;
  background-color: ${Colors.darkPink};
  height: 30; width: 30;
  align-items: center;
  justify-content: center;
  margin-right: 7;
  margin-top: 3;
`;
const PlaceCardWrapper = styled.View`
  margin-right: 15;
  padding-top: 7;
  padding-bottom: 30;
`;


class ChallengeScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  state = {
    isLoading: true,
    isFail: false,
    challenge: null,
    dataSource: null,
  }

  componentDidMount() {
    const { challengeId } = this.props.navigation.state.params;
    ChallengeServices.getChallenge(challengeId)
      .then(({ data: { challenge, places } }) => {
        if (!challenge) {
          this.setState({ isFail: true });
          return;
        }
        console.log(challenge.banner_image_url);
        this.setState({
          challenge,
          dataSource: this.generateRows(challenge, places),
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isFail: true });
        setTimeout(() => Alert.alert('Error', 'Fail loading challenge data. Please check your internet connection!'));
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  generateRows = (challengeData, placesData) => {
    console.log(challengeData);
    return new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([
      {
        rowTitle: 'รางวัลเมื่อทำภารกิจสำเร็จ',
        rowContent: () => (
          <RewardRowWrapper
            colors={[Colors.rewardBgLeft, Colors.rewardBgRight]}
            start={[0, 0.5]} end={[1, 0.5]}
          >
            <RewardRowTitleWrapper>
              <RewardIconWrapper>
                <FontAwesome name="gift" color="#fff" size={22} />
              </RewardIconWrapper>
              <RowTitle color="#fff" noMarginBottom>
                รางวัลเมื่อทำภารกิจสำเร็จ
              </RowTitle>
            </RewardRowTitleWrapper>
            <RewardText>
              {challengeData.reward_id ?
                challengeData.reward_title
                :
                `รับ ${challengeData.reward_gife_points} GIFE POINTS!`
              }
            </RewardText>
          </RewardRowWrapper>
        ),
      },
      {
        rowTitle: 'ภารกิจที่ต้องทำ',
        rowContent: () => (
          <View>
            <Row noMarginBottom noBorderBottom>
              <RowTitle>ภารกิจที่ต้องทำ</RowTitle>
              <GoalText>{challengeData.goal_description}</GoalText>
            </Row>
            {!!placesData &&
              <FlatList
                data={[
                  { flatListSpacer: true, id: 'spacer-front' },
                  ...placesData,
                  { flatListSpacer: true, id: 'spacer-back' },
                ]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  item.flatListSpacer ?
                    <FlatListSpacer />
                    :
                    <PlaceCardWrapper>
                      <PlaceCard
                        placeId={item.id}
                        name={item.name}
                        bannerImageUrl={item.banner_image_url}
                        subregion={item.subregion_name}
                        region={item.region_name}
                        province={item.province_name}
                        rating={item.rating}
                      />
                    </PlaceCardWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            }
            <Row>
              <View style={{ marginBottom: 30 }}>
                <ChallengeDurationLabel
                  durationText={challengeData.duration_title}
                  endDate={challengeData.end_date}
                />
              </View>
            </Row>
          </View>
        ),
      },
      {
        rowTitle: 'รีวิวภารกิจ',
        rowContent: () => (
          <Row>
            <RowTitle>Reviews</RowTitle>
          </Row>
        ),
      },
    ]);
  }

  startChallenge = (id, title) => {
    Alert.alert(
      'กำลังจะเริ่มภารกิจ!',
      `คุณต้องการเริ่มภารกิจ "${title}" ใช่หรือไม่?`,
      [{
        text: 'ยกเลิก',
        style: Platform.select({ ios: 'destructive', android: 'negative' }),
      }, {
        text: 'เริ่มเลย!',
        onPress: async () => {
          this.props.startLoading();
          try {
            // await ChallengeServices.startChallenge(id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setTimeout(() => this.props.showStartChallengeModal(), 500);
          } catch (err) {
            console.log(err);
            if (err.response.data && err.response.data.msg) {
              setTimeout(() => Alert.alert('Error', err.response.data.msg), 500);
            }
          } finally {
            this.props.endLoading();
          }
        },
      }],
    );
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;

    const { challenge } = this.state;
    if (this.state.isFail || !challenge) {
      return (
        <PlaceHolderTextGrey>
          Network error! Please try again
        </PlaceHolderTextGrey>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StartChallengeModal
          challenge={challenge}
        />
        <ListViewWrapper
          dataSource={this.state.dataSource}
          renderRow={({ rowContent }) => rowContent()}
          renderScrollComponent={() => (
            <ParallaxScrollView
              backgroundColor={Colors.main}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              renderBackground={() => (
                <View>
                  <Image
                    source={{
                      uri: challenge.banner_image_url,
                      width: Layout.window.width,
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: Layout.window.width,
                      backgroundColor: 'rgba(0,0,0,.4)',
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                </View>
              )}
              renderForeground={() => (
                <ForegroundWrapper>
                  <StatusBar barStyle="light-content" />
                  <ForegroundContentWrapper>
                    <View>
                      <TimerLabel daysLeft={2} />
                    </View>
                    <ForegroundTitleText>{challenge.title}</ForegroundTitleText>
                    <BottomRowWrapper>
                      <LocationLabel
                        text={challenge.location_label}
                        color="#fff"
                      />
                      {/* Spacer */}
                      <View style={{ width: 15 }} />
                      <RatingLabel
                        rating={challenge.rating}
                      />
                    </BottomRowWrapper>
                  </ForegroundContentWrapper>
                </ForegroundWrapper>
              )}
              renderStickyHeader={() => <View />} // For header background fade in
              renderFixedHeader={() => (
                <FixedWrapper>
                  <BackButton
                    onPress={() => this.props.navigation.goBack()}
                  />
                </FixedWrapper>
              )}
            />
          )}
        />
        <FooterButton
          text="เริ่มทำภารกิจ!"
          onPress={() => this.startChallenge(challenge.id, challenge.title)}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showStartChallengeModal: () => dispatch(ChallengeActions.showStartChallengeModal()),
    hideStartChallengeModal: () => dispatch(ChallengeActions.hideStartChallengeModal()),
    startLoading: () => dispatch(BaseActions.startLoading()),
    endLoading: () => dispatch(BaseActions.endLoading()),
  };
}

export default connect(undefined, mapDispatchToProps)(ChallengeScreen);
