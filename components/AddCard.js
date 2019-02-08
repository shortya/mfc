import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import { purple, secondaryLight, primaryDark, secondaryDark } from '../utils/colors';
import * as API from '../utils/api';


class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  onSubmitDeck = () => {
    const { deckID } = this.props.navigation.state.params

    API.addCardToDeck(deckID, {
      question: this.state.question,
      answer: this.state.answer
    }).then(() => {
      this.props.navigation.navigate('DeckView',{ deckID: deckID }
    )})
  }

  render() {

    const { question, answer } = this.state;
    const { deckID } = this.props.navigation.state.params

    return (
      <View style={styles.container} >
        <KeyboardAvoidingView behavior="padding" >
            <Text style={styles.titleText} > What question do you wanna ask about {deckID}? </Text>
            <TextInput
              onChangeText={(text) => this.setState({question: text})}
              style={styles.input}
              value={question}
              placeholder='Type your question here'
              placeholderTextColor={secondaryDark} />
            <TextInput
              onChangeText={(text) => this.setState({answer: text})}
              style={styles.input}
              value={answer}
              placeholder='Type your answer here'
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

export default AddCard;
