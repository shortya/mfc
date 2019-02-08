import React from 'react';
import { Platform } from 'react-native';
import AddDeck from './AddDeck';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { white, secondaryLight } from '../utils/colors';
import DeckList from './DeckList';

const RootTab = createBottomTabNavigator({

  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons 
        name={Platform.OS === 'ios' ? "ios-list" : "md-list"}
        size={30} 
        color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome 
        name='plus-square' 
        size={30} 
        color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? secondaryLight : '#00695c',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : '#eeeeee',
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
);

const TabNav = createAppContainer(RootTab)

export default TabNav;
