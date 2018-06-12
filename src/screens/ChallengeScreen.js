import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Alert, ListView, ActivityIndicator } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styled from 'styled-components';

import { BackButton, TimerLabel, LocationLabel, RatingLabel } from '../components/base';
import { PlaceHolderTextGrey } from '../components/styled';
import { ChallengeServices } from '../services';
import { Layout, Colors } from '../constants';

const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
// Styled components
const Row = styled.View`
  overflow: hidden;
  padding-horizontal: 10;
  height: ${ROW_HEIGHT};
  background-color: white;
  border-color: #ccc;
  border-bottom-width: 1;
  justify-content: center;
`;
const RowText = styled.Text`
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
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([
      'Simplicity Matters',
      'Hammock Driven Development',
      'Value of Values',
      'Are We There Yet?',
      'The Language of the System',
      'Design, Composition, and Performance',
      'Clojure core.async',
      'The Functional Database',
      'Deconstructing the Database',
      'Hammock Driven Development',
      'Value of Values',
    ]),
  }

  async componentDidMount() {
    try {
      const { challengeId } = this.props.navigation.state.params;
      const { challenge } = await ChallengeServices.getChallenge(challengeId);
      this.setState({ challenge });
    } catch (err) {
      this.setState({ isFail: true });
      setTimeout(() => Alert.alert('Error', 'Fail loading challenge data. Please check your internet connection!'));
    } finally {
      this.setState({ isLoading: false });
    }
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
        renderRow={rowData => (
          <Row>
            <RowText>{ rowData }</RowText>
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
