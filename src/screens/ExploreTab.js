import React, { Component } from 'react';
import { StatusBar, ScrollView, Alert, ActivityIndicator, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components';

import {
  Wrapper,
  HeaderText,
  HeaderTextFront,
  TopSpacer,
  PlaceHolderTextGrey,
  FlatListSpacer,
} from '../components/styled';
import { SpotlightCarousel, ChallengeCard } from '../components/challenge';
import { Colors } from '../constants';
import { ChallengeServices } from '../services';

// Styled components
const ChallengeTypeWrapper = styled.View`
  margin-bottom: 20;
`;
const ChallengeCardWrapper = styled.View`
  margin-right: 15;
  padding-vertical: 15; // For shadow
`;

class ExploreTab extends Component {
  static navigationOptions = {
    header: null,
    title: 'ค้นหา',
    tabBarIcon: ({ focused }) => (
      <FontAwesome
        name="search"
        color={focused ? Colors.main : Colors.textGreyLighter}
        size={25}
      />
    ),
  }

  state = {
    isLoading: true,
    isFail: false,
    types: [],
    spotlight: [],
  }

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    // Get user me
    // ProfileServices.getMe()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    try {
      const { data } = await ChallengeServices.getExplore();
      this.setState({
        isFail: false,
        spotlight: data.spotlight,
        types: data.types,
      });
    } catch (err) {
      this.setState({ isFail: true });
      Alert.alert('Error', 'Network\'s problem. Please check your internet connection.');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  renderChallengeTypes = () => {
    return this.state.types.map(type => (
      <ChallengeTypeWrapper key={type.type_id}>
        <HeaderText>
          <HeaderTextFront>ภารกิจ</HeaderTextFront>{' '}{type.type_title}
        </HeaderText>
        <FlatList
          data={[
            { flatListSpacer: true, id: 'spacer-front' },
            ...type.challenges,
            { flatListSpacer: true, id: 'spacer-back' },
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            item.flatListSpacer ?
              <FlatListSpacer />
              :
              <ChallengeCardWrapper>
                <ChallengeCard
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  bannerImageUrl={item.banner_image_url}
                  locationLabel={item.location_label}
                  rating={item.rating}
                  rewardId={item.reward_id}
                  rewardGifePoints={item.reward_gife_points}
                  durationTitle={item.duration_title}
                />
              </ChallengeCardWrapper>
          )}
          horizontal
        />
      </ChallengeTypeWrapper>
    ));
  }

  render() {
    return (
      <Wrapper bgColor={Colors.bgGrey}>
        <ScrollView>
          <TopSpacer />
          {this.state.isLoading &&
            <ActivityIndicator />
          }
          {!this.state.isLoading && this.state.isFail &&
            <PlaceHolderTextGrey>Oops, Something Went Wrong! 😭</PlaceHolderTextGrey>
          }
          {!this.state.isLoading && !this.state.isFail &&
            <React.Fragment>
              {/* Spotlight */}
              <HeaderText>
                <HeaderTextFront>ภารกิจ</HeaderTextFront>{' '}โดดเด่นและแนะนำ
              </HeaderText>
              <SpotlightCarousel
                challenges={this.state.spotlight}
              />
              {/* Challenge types */}
              {this.renderChallengeTypes()}
            </React.Fragment>
          }
        </ScrollView>
      </Wrapper>
    );
  }
}

export default ExploreTab;
