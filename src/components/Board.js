import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const BOARDS_URL = 'https://inspiration-board.herokuapp.com/boards/marylamkin/cards';

const DELETE_URL = 'https://inspiration-board.herokuapp.com/boards/Ada-Lovelace/cards/';

const CARD_URL = 'https://inspiration-board.herokuapp.com/boards/:board_name/cards';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  deleteCard = (cardId) => {
    // console.log(card.id);
    axios.delete(`${DELETE_URL}${cardId}`)
      .then((response) => {
      console.log(response);
      for (let i = 0; i < this.state.cards.length; i++) {
        if (this.state.cards[i].card.id === cardId) {
          this.state.cards.splice(i, 1);
          this.setState({cards: this.state.cards});
          break;
        }
      }

      })
      .catch((error) => {
        this.setState({ error: error.message })
      })
  }

  componentDidMount() {
    axios.get(BOARDS_URL)
    .then((response)=> {
      console.log("waz happnin");
      console.log(response);

      const data = response.data.slice(0,100);
      this.setState({cards: data})
    })
    .catch((error) => {
      this.setState({ error: error.message})
    })
  }


  render() {
    console.log("I'm inside!");

    const attrCards = this.state.cards
    // const attr_cards = CARD_DATA["cards"]

    const cards = attrCards.map((cardInfo, index) => {
      console.log("inside card mapping");
      return <Card
      onDeleteCard={this.deleteCard}
      key={index}
      id={cardInfo.card.id}
      text={cardInfo.card.text} emoji={cardInfo.card.emoji} />
    });

    return (
      <div>
      Board

      { cards }

      </div>
    )
  }

}

Board.propTypes = {
  deleteCard: PropTypes.func.isRequired
};

export default Board;
