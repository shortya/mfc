import React from 'react';
import { StyleSheet, Text, View, StatusBar  } from 'react-native';
import AddDeck from './components/AddDeck';
import { white, secondaryLight, background, primary, primaryDark } from './utils/colors';
import { Header } from 'react-native-elements';
import TabNav from './components/TabNav';
import StackNav from './components/StackNav';
import { Constants } from 'expo';

function DeckStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {



  render() {
    return (
      <View style={{flex: 1}}>
        <DeckStatusBar backgroundColor={primaryDark} barStyle="light-content" />
        <StackNav />

        {/* <TabNav /> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: secondaryLight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    padding: 20,
    backgroundColor: primary,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})