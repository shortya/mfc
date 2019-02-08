import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as API from '../utils/api';
import {  primary, secondaryLight } from '../utils/colors';

class DeckList extends Component {
  state = {
    decks: {},
    count: {},
  } 

  componentDidMount() {
    API.getDecks()
      .then((decks) => {
        Object.keys(decks).map((deck) => {
          const counter = decks[deck]['questions'] ? Object.keys(decks[deck]['questions']) : 0
          this.setState({
            decks,
            count: {
              ...this.state.count,
              [deck]: counter === 0 ? 0 : counter.length
            }
          })
        })
      })
  }

  render() {

    const { count, decks } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Your Decks</Text>
        <View style={styles.decksContainer}>
        {Object.keys(decks).map((deck) => (
          <TouchableOpacity style={styles.decks} key={deck} onPress={()=> this.props.navigation.navigate('DeckView', {deckID: deck, count: count})} >
            <Text style={[styles.subHeader, {color: 'black'}]}>
            {deck} has {count[deck]} {count[deck] !== 1 ? 'decks': 'deck' }
            </Text>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondaryLight
  },
  button: {
    padding: 10, 
    backgroundColor: primary,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 5
  },
  buttonText: {
    color: 'black',
    fontSize: 20
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50 
  },
  decksContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: primary,
    alignItems: 'stretch',
  },
  decks: {
    height: 50,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5, 
  },
});

export default DeckList