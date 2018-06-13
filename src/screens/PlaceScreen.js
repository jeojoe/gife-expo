import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Alert, ListView, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styled from 'styled-components';
import { WebBrowser, MapView } from 'expo';
import openMap from 'react-native-open-maps';

import { BackButton, LocationLabel, RatingLabel } from '../components/base';
import { PlaceHolderTextGrey } from '../components/styled';
import { PlaceServices } from '../services';
import { Layout, Colors } from '../constants';
import { PlaceUtils } from '../utils';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Row = styled.View`
  padding-horizontal: 5%;
  background-color: white;
  border-bottom-color: ${Colors.border};
  border-bottom-width: ${props => (props.noBorderBottom ? 0 : StyleSheet.hairlineWidth)};
  padding-vertical: 20;
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
  flex: 1;
  padding-horizontal: 20;
  padding-bottom: 20;
  justify-content: flex-end;
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
const HighlightItem = styled.View`
  padding-vertical: 12;
  padding-horizontal: 7;
`;
const ReviewWrapper = styled.TouchableOpacity`
  margin-bottom: 10;
`;
const ReviewTitle = styled.Text`
  font-size: 16;
  color: rgb(11, 112, 230);
`;

class PlaceScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    isLoading: true,
    isFail: false,
    place: null,
    dataSource: null,
  }

  async componentDidMount() {
    try {
      const { placeId } = this.props.navigation.state.params;
      const { place, reviews } = await PlaceServices.getPlace(placeId);
      if (!place) {
        this.setState({ isFail: false });
        return;
      }
      this.setState({
        place,
        dataSource: this.generateRows(place, reviews),
      });
    } catch (err) {
      this.setState({ isFail: true });
      setTimeout(() => Alert.alert('Error', 'Fail loading challenge data. Please check your internet connection!'));
    } finally {
      this.setState({ isLoading: false });
    }
  }

  generateRows = (placeData, reviewsData) => {
    return new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([
      {
        rowTitle: 'About',
        rowContent: () => (
          <Row>
            <RowTitle>เกี่ยวกับสถานที่</RowTitle>
            <Text>{placeData.about}</Text>
          </Row>
        ),
      },
      {
        rowTitle: 'Review',
        rowContent: () => (
          reviewsData &&
          <Row>
            <RowTitle>รีวิว</RowTitle>
            {reviewsData.map(review => (
              <ReviewWrapper
                key={review.id}
                onPress={() => WebBrowser.openBrowserAsync(review.site_url)}
              >
                <ReviewTitle>{review.title}</ReviewTitle>
                <Text>By {review.author_name}, {review.site_name}</Text>
              </ReviewWrapper>
            ))}
          </Row>
        ),
      },
      {
        rowTitle: 'Price',
        rowContent: () => (
          placeData.price_min &&
          <Row>
            <RowTitle>ราคาต่อคน</RowTitle>
            <Text>฿{placeData.price_min || ''} - {placeData.price_max}</Text>
          </Row>
        ),
      },
      {
        rowTitle: 'Map',
        rowContent: () => (
          <View style={{ paddingTop: 15 }}>
            <View style={{ paddingHorizontal: '5%', marginBottom: 5 }}>
              <RowTitle>ตำแหน่ง</RowTitle>
            </View>
            <TouchableOpacity
              onPress={() => openMap({
                latitude: placeData.latitude,
                longitude: placeData.longitude,
                provider: 'google',
              })}
            >
              <MapView
                provider="google"
                style={{ height: 200 }}
                initialRegion={{
                  latitude: placeData.latitude,
                  longitude: placeData.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                zoomEnabled={false}
                zoomControlEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
                cacheEnabled
              >
                <MapView.Marker
                  coordinate={{
                    latitude: placeData.latitude,
                    longitude: placeData.longitude,
                  }}
                />
              </MapView>
            </TouchableOpacity>
          </View>
        ),
      },
      {
        rowTitle: 'Open Hours',
        rowContent: () => (
          placeData.open_hours &&
          <Row>
            <RowTitle>เวลาเปิด-ปิด</RowTitle>
            <Text>{placeData.open_hours}</Text>
          </Row>
        ),
      },
      {
        rowTitle: 'Address',
        rowContent: () => (
          placeData.address &&
          <Row>
            <RowTitle>ที่อยู่</RowTitle>
            <Text>{placeData.address}</Text>
          </Row>
        ),
      },
      {
        rowTitle: 'Phone',
        rowContent: () => (
          placeData.contact &&
          <Row>
            <RowTitle>ติดต่อ</RowTitle>
            <Text>{placeData.contact}</Text>
          </Row>
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

    const { place } = this.state;
    return (
      <Wrapper>
        <ListViewWrapper
          dataSource={this.state.dataSource}
          renderRow={({ rowContent }) => rowContent()}
          renderScrollComponent={props => (
            <ParallaxScrollView
              backgroundColor={Colors.main}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={5}
              renderBackground={() => (
                <View>
                  <Image
                    source={{
                      uri: place.banner_image_url,
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
                  <ForegroundTitleText>{place.name}</ForegroundTitleText>
                  <BottomRowWrapper>
                    <LocationLabel
                      text={PlaceUtils.getLocationLabel(
                        place.province_name,
                        place.region_name,
                        place.subregion_name,
                      )}
                      color="#fff"
                    />
                    {/* Spacer */}
                    <View style={{ width: 15 }} />
                    <RatingLabel
                      rating={place.rating}
                    />
                  </BottomRowWrapper>
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
      </Wrapper>
    );
  }
}

export default PlaceScreen;
