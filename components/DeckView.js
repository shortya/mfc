import React, { Component } from 'react';
import { primary, secondaryLight } from '../utils/colors';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as API from '../utils/api';

class DeckView extends Component {
  state = {
    deck: {},
    count: 0,
  }

  static navigationOptions = ({ navigation }) => {
      title: `${navigation.state.params.deckID}`
  }

  // new feature:
  // onDelete = () => {
  //   const key = this.state.deck.title
  //   API.removeEntry(key)
  //   this.props.navigation.navigate('Home')
  // }

  componentDidMount() {
    const { deckID } = this.props.navigation.state.params
    API.getDeck(deckID)
      .then((deck) => {
        const questions = deck['questions'] ? Object.values(deck['questions']) : 0
        this.setState({
          deck,
          count: questions === 0 ? 0 : questions.length
        })
      })
  }

  render() {
    const { deck, count } = this.state
    const { deckID } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.header}> {deckID}! </Text>
        <View style={styles.decksContainer}>
          <TouchableOpacity style={styles.decks} onPress={()=> this.props.navigation.navigate('AddCard', {deckID: deckID, count: count})} >
            <Text style={[styles.subHeader, {color: 'black'}]}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.decks} onPress={()=> this.props.navigation.navigate('Quiz', {title: deck.title, count: count})} >
            <Text style={[styles.subHeader, {color: 'black'}]}>
              Start Quiz
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.decks} onPress={() => this.onDelete} >
            <Text style={[styles.subHeader, {color: 'black'}]}>
              Delete Deck 
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
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
export default DeckView;
