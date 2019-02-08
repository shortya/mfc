import React, { Component } from 'react';
import { primary, secondaryLight } from '../utils/colors';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import * as API from '../utils/api';

class Quiz extends Component {

  state = {
    deck: {},
    currentQuestion: 0,
    score: 0,
    display: 'Question',
  }

  toggleQnA = () => {
    this.setState({
      display: this.state.display === 'Question' ? 'Answer' : 'Question'
    })
  };

  onCorrect = () => {
    this.setState(currentState => ({
      currentQuestion: currentState.currentQuestion+1,
      score: currentState.score+1,
      display: 'Question'
    }))
    if (this.state.currentQuestion === this.props.navigation.state.params.count) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  onIncorrect = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion+1,
      display: 'Question',
    })
    if (this.state.currentQuestion === this.props.navigation.state.params.count) {
      clearLocalNotification().then(setLocalNotification);
    }
  }

  onPlayAgain = () => {
    this.setState({
      currentQuestion: 0,
      score: 0,
      display: 'Question',
    })
  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params
    API.getDeck(title)
      .then((deck) => {
        this.setState({ deck })
      })
  }

  render() {
    const { currentQuestion, display, score } = this.state
    const { count } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
      { count === 0
        ? <Text style={styles.header}> You need some cards if you wanna take a test!  Hit the back button and add some cards x</Text>
        : count === currentQuestion
        ?
        <View>
        <Text style={styles.header}> {`${score} / ${count}`}</Text>
        <View style={styles.decksContainer}>
          <TouchableOpacity style={styles.decks} onPress={this.onPlayAgain} >
            <Text style={[styles.subHeader, { color: 'black' }]}>
              Play Again!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.decks} onPress={()=> this.props.navigation.navigate('DeckView', {deckID: deck.title})} >
            <Text style={[styles.subHeader, { color: 'black' }]}>
              Back to Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
        :
        <View>
          <Text style={styles.header}> {display === 'Question' ? `${deck.questions[currentQuestion].question}` : `${deck.questions[currentQuestion].answer}`}</Text>
          <View style={styles.decksContainer}>
            <TouchableOpacity style={styles.decks} onPress={this.toggleQnA} >
              <Text style={[styles.subHeader, { color: 'black' }]}>
                {display === 'Question' ? 'Show Answer' : 'Show Question'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.decks} onPress={this.onCorrect} >
              <Text style={[styles.subHeader, { color: 'black' }]}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.decks} onPress={this.onIncorrect} >
              <Text style={[styles.subHeader, { color: 'black' }]}>
                Incorrect
              </Text>
            </TouchableOpacity>
            <Text>Score {score} Question No. {currentQuestion+1}/{count}</Text>
          </View>
        </View>}
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

export default Quiz;
