import { AsyncStorage } from 'react-native';  

const FLASHCARDS_STORAGE_KEY = 'flashcards:decks'

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Cheese: {
    title: 'Cheese',
    questions: [
      {
        question: 'What is the best Cheese?',
        answer: 'Manchego'
      },
      {
        question: 'What do you call three cheeses in a bed?',
        answer: 'Fromage-a-trois'
      },
      {
        question: 'What is the secret society of Cheese?',
        answer: 'The Hallouminati'
      },
      {
        question: 'What is the friendliest Cheese?',
        answer: 'Hallooomi'
      },
      {
        question: 'What Cheese can you not have?',
        answer: 'Nacho cheese'
      }
    ]
  }
}

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,Y, JSON.stringify({
    [key]: entry, 
  }));      
}

export function removeEntry(key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,)
    .then(results => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    });
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      if (results === null) {
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
        return decks
      } else {
        return JSON.parse(results)
      }
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      return deck = JSON.parse(results)[title]
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []  //array or object?
    }
  }))
}

export function addCardToDeck(title, card) {
  console.log(title, card )
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      const decks = JSON.parse(results)
      console.log('results', decks )
      decks[title] = {
        title,
        questions: decks[title].questions.concat(card)
      }
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
      console.log('after', decks )
    })    
}