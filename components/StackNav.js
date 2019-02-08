import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNav from './TabNav';
import { purple, primaryDark } from '../utils/colors';
import DeckList from './DeckList';
import DeckView from './DeckView';
import Quiz from './Quiz';
import AddCard from './AddCard';

const RootStack = createStackNavigator({
  
  Home: {
    screen: TabNav,
    navigationOptions: {
      title: 'Home',
      headerTintColor: 'black', 
      headerStyle: {
        backgroundColor: primaryDark, 
      }
    }
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Deck List',
      headerTintColor: primaryDark, 
      headerStyle: {
        backgroundColor: purple, 
      }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck',
      headerTintColor: 'black', 
      headerStyle: {
        backgroundColor: primaryDark, 
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: 'black', 
      headerStyle: {
        backgroundColor: primaryDark, 
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: 'black', 
      headerStyle: {
        backgroundColor: primaryDark, 
      }
    }
  },
}, {
  navigationOptions: {
    header: null
  }
}
);

const StackNav = createAppContainer(RootStack)

export default StackNav;
