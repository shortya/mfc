import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableHighlight } from 'react-native';
import { purple, secondaryLight, secondaryDark, primaryDark } from '../utils/colors';
import * as API from '../utils/api';

class AddDeck extends Component {
  state = {
    title: ''
  }

  onSubmitDeck = () => {
      const { title } = this.state
      API.saveDeckTitle(title)
        .then(() => {
        this.props.navigation.navigate('DeckView',{ deckID: title }
      )})
  }

  render() {
  
    const { title } = this.state;

    return (
      <View style={styles.container} >
        <KeyboardAvoidingView behavior="padding" >
            <Text style={styles.titleText} >What do you wanna call your new deck? </Text>
            <TextInput
              onChangeText={text => this.setState({title: text})}
              style={styles.input}
              value={title}
              placeholder='Deck Title'
              placeholderTextColor={secondaryDark} />
          <TouchableHighlight
            underlayColor={'grey'}
            style={styles.androidSubmitBtn}
            onPress={this.onSubmitDeck}>
            <Text style={styles.submitBtnText}>+  ADD</Text>
          </TouchableHighlight>
        </ KeyboardAvoidingView >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: secondaryLight,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    alignItems: 'center',
    textAlign: 'center',
    margin: 20,
  },
  iosSubmitBtn:{
    backgroundColor: purple, 
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: primaryDark, 
    padding: 10,
    borderRadius: 5,
    height: 45,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'center',
    margin: 20,
    width: 200,
  },
  submitBtnText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: secondaryDark,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  }
});

export default AddDeck;
