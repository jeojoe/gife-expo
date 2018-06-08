import React, { Component } from 'react';
import { StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Reactotron from 'reactotron-react-native';

import {
  Wrapper,
  HeaderText,
  HeaderTextFront,
  TopSpacer,
  PlaceHolderTextGrey,
  BodyText,
} from '../components/styled';
import { SpotlightCarousel } from '../components/challenge';
import { Colors } from '../constants';
import { ChallengeServices } from '../services';

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
      const res = await ChallengeServices.getExplore();
      this.setState({
        isFail: false,
        spotlight: res.spotlight,
        types: res.types,
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
              <HeaderText>
                Spotlight
                {' '}
                <HeaderTextFront>
                  Challenges
                </HeaderTextFront>
              </HeaderText>
              <SpotlightCarousel
                challenges={this.state.spotlight}
              />
              {this.state.types.map(type => (
                <Wrapper padHoriz="base" key={type.type_id}>
                  <PlaceHolderTextGrey>{type.type_title}</PlaceHolderTextGrey>
                </Wrapper>
              ))}
            </React.Fragment>
          }
        </ScrollView>
      </Wrapper>
    );
  }
}

export default ExploreTab;
