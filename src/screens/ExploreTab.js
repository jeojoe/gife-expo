import React, { Component } from 'react';
import { Text, StatusBar, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';

import { Wrapper, HeaderText, HeaderTextFront, TopSpacer } from '../components/styled';
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
    nearby: [],
    sections: [],
    spotlight: [],
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    // Get user me
    // ProfileServices.getMe()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // ChallengeServices.getExplore()
    //   .then((res) => {
    //     this.setState({
    //       nearby: res.body.nearby,
    //       sections: res.body.sections,
    //       spotlight: res.body.spotlight,
    //     });
    //   })
    //   .catch(err => console.error('Error: getExplore in ExploreTab', err));
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <Wrapper bgColor={Colors.bgGrey}>
        <ScrollView>
          <TopSpacer />
          <HeaderText>
            ภารกิจ
            {' '}
            <HeaderTextFront>
              โดดเด่นและแนะนำ
            </HeaderTextFront>
          </HeaderText>
          <SpotlightCarousel
            challenges={[
              1, 2, 3, 4, 5,
            ]}
          />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default ExploreTab;
