import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Alert, ListView, ActivityIndicator, StatusBar } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styled from 'styled-components';

import { BackButton, TimerLabel, LocationLabel, RatingLabel } from '../components/base';
import { ChallengeDurationLabel } from '../components/challenge';
import { PlaceHolderTextGrey } from '../components/styled';
import { ChallengeServices } from '../services';
import { Layout, Colors } from '../constants';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
// Styled components
const Row = styled.View`
  padding-horizontal: 5%;
  background-color: white;
  border-color: #ccc;
  border-bottom-width: 1;
  justify-content: center;
`;
const RowTitle = styled.Text`
  font-size: 20;
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

class Talks extends Component {
  static navigationOptions = {
    header: null,
  }
  state = {
    isLoading: true,
    isFail: false,
    challenge: null,
    dataSource: null,
  }

  async componentDidMount() {
    try {
      const { challengeId } = this.props.navigation.state.params;
      const { challenge } = await ChallengeServices.getChallenge(challengeId);
      if (!challenge) {
        this.setState({ isFail: true });
        return;
      }
      this.setState({
        challenge,
        dataSource: this.generateRows(challenge),
      });
    } catch (err) {
      this.setState({ isFail: true });
      setTimeout(() => Alert.alert('Error', 'Fail loading challenge data. Please check your internet connection!'));
    } finally {
      this.setState({ isLoading: false });
    }
  }

  generateRows = (challengeData) => {
    console.log(challengeData);
    return new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([
      {
        rowTitle: 'รางวัลเมื่อทำภารกิจสำเร็จ',
        rowContent: () => (
          <View>
            <Text>
              {challengeData.reward_id ?
                challengeData.reward_title
                :
                `รับ ${challengeData.reward_gife_points} GIFE POINTS!`
              }
            </Text>
          </View>
        ),
      },
      {
        rowTitle: 'ภารกิจที่ต้องทำ',
        rowContent: () => (
          <View>
            <Text>{challengeData.goal_description}</Text>
            <ChallengeDurationLabel
              durationText={challengeData.duration_title}
              endDate={challengeData.end_date}
            />
          </View>
        ),
      },
      {
        rowTitle: '',
        rowContent: () => (
          <View>
            <Text>Place Cards</Text>
          </View>
        ),
      },
      {
        rowTitle: 'รีวิวภารกิจ',
        rowContent: () => (
          <View>
            <Text>Reviews</Text>
          </View>
        ),
      },
    ]);
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    if (this.state.isFail) {
      return (
        <PlaceHolderTextGrey>
          Network error! Please try again
        </PlaceHolderTextGrey>
      );
    }

    const { challenge } = this.state;
    return (
      <ListViewWrapper
        backgroundColor={Colors.main}
        dataSource={this.state.dataSource}
        renderRow={({ rowTitle, rowContent }) => (
          <Row>
            <RowTitle>{rowTitle}</RowTitle>
            {rowContent()}
          </Row>
         )}
        renderScrollComponent={props => (
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Layout.window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
});

export default Talks;
