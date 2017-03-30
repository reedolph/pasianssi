import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';

import { Suits, SuitColors, Ranks } from './Constants.js';

import Stock from './Stock.js';
import Waste from './Waste.js';
import Foundation from './Foundation.js';
import Tableau from './Tableau.js';
import CustomDragLayer from './CustomDragLayer.js';

// import './Game.css';

class Game extends Component {
	constructor(props) {
		super(props);

		let cards = this.createCards();
		cards = this.shuffle(cards);
		this.deal(cards);
	}

	createCards() {
		let cards = [];
		Object.values(Suits).forEach(function(suit) {
			Object.values(Ranks).forEach(function(rank) {
				cards.push({
					rank: rank,
					suit: suit,
					isFaceUp: false
				});
			});
		});

		return cards;
	}

	// Fisher-Yates shuffle
	shuffle(cards) {
		let i, j, temp;

		for (i = cards.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1));
			temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}

		return cards;
	}

	deal(cards) {
		let board = {};

		for (let i = 0; i < 5; i++) {
			board[`foundation${i}`] = [];
		}

		let tableau;
		for (let i = 0; i < 7; i++) {
			tableau = [];

			for (let j = 0; j <= i; j++) {
				tableau.push(cards.pop());
				if (j === i) {
					tableau[j].isFaceUp = true;
				} else {
					tableau[j].isFaceUp = false;
				}
			}

			board[`tableau${i}`] = tableau;
		}

		board.stock = cards;

		board.stock.forEach((card) => {
			card.isFaceUp = false;
		});

		board.waste = [];

		this.state = {board: board};
	}

	turnCards() {
		let board = this.state.board;

		board.waste.forEach((card) => {
			card.isSpread = false;
		});

		let card;
		let num = Math.min(board.stock.length, 3);
		for (let i = 0; i < num; i++) {
			card = board.stock.pop();
			card.isFaceUp = true;
			card.isSpread = true;
			board.waste.push(card);
		}

		this.setState({
			board: board
		});
	}

	resetStock() {
		let board = this.state.board;

		board.waste.forEach((card) => {
			card.isFaceUp = false;
			card.isSpread = false;
		});

		board.stock = board.waste.reverse();
		board.waste = [];

		this.setState({
			board: board
		});
	}

	moveCards(cards, source, destination) {
		const board = this.state.board;

		board[source] = board[source].filter((card) => {
			for (let i = 0; i < cards.length; i++) {
				if (card.rank === cards[i].rank && card.suit === cards[i].suit) {
					return false;
				}
			}
			return true;
		});

		board[destination] = board[destination].concat(cards);

		if (destination.startsWith('foundation')) {
			let isVictory = true;
			for (let i = 0; i < 4; i++) {
				if (this.state.board[`foundation${i}`].length !== 14) {
					isVictory = false;
					break;
				}
			}
			if (isVictory) {
				this.triggerVictory();
			}
		}

		this.setState({
			board: board
		});
	}

	handleDrop(droppedCards, source, destination) {
		const board = this.state.board;

		let topDestinationCard;
		if (board[destination].length > 0) {
			topDestinationCard = board[destination][board[destination].length - 1];
		}

		if (destination.startsWith('foundation')) {
			if (droppedCards.length > 1) {
				return false;
			}

			const droppedCard = droppedCards[0];

			if (board[destination].length === 0) {
				if (droppedCard.rank !== 1) {
					return false;
				}
				this.moveCards(droppedCards, source, destination);
			} else {
				if (droppedCard.suit !== topDestinationCard.suit || droppedCard.rank !== topDestinationCard.rank + 1) {
					return false;
				}
				this.moveCards(droppedCards, source, destination);
			}
		} else if (destination.startsWith('tableau')) {
			const bottomDroppedCard = droppedCards[0];

			if (board[destination].length === 0) {
				if (bottomDroppedCard.rank !== Ranks.KING) {
					return false;
				}
				this.moveCards(droppedCards, source, destination);
			} else {
				if (SuitColors[bottomDroppedCard.suit] === SuitColors[topDestinationCard.suit]) {
					return false;
				}
				if (bottomDroppedCard.rank !== topDestinationCard.rank - 1) {
					return false;
				}
				this.moveCards(droppedCards, source, destination);
			}
		}
	}

	handleClick(e, location) {
		e.preventDefault();
		e.stopPropagation();

		if (location === 'stock') {
			if (this.state.board.stock.length > 0) {
				this.turnCards();
			} else {
				this.resetStock();
			}
		} else if (location.startsWith('tableau')) {
			let board = this.state.board;
			const lastCard = board[location][board[location].length - 1];

			lastCard.isFaceUp = true;

			this.setState({
				board: board
			});
		}
	}

	handleDoubleClick(e, location, card) {
		e.preventDefault();
		e.stopPropagation();

		const board = this.state.board;

		let lastCard;
		let foundationId;
		for (let i = 0; i < 4; i++) {
			foundationId = `foundation${i}`;

			if (board[foundationId].length === 0) {
				if (card.rank === Ranks.ACE) {
					this.moveCards([card], location, foundationId);
					break;
				}
			} else {
				lastCard = board[foundationId][board[foundationId].length - 1];

				if (card.suit === lastCard.suit && card.rank === lastCard.rank + 1) {
					this.moveCards([card], location, foundationId);
					break;
				}
			}
		}
	}

	triggerVictory() {
		console.log('VICTORY');
	}

	render() {
		const foundations = [];
		let id;
		for (let i = 0; i < 4; i++) {
			id = `foundation${i}`;

			foundations.push(
				<Foundation
					id={id}
					key={id}
					cards={this.state.board[id]}
					handleDrop={this.handleDrop.bind(this)}
				/>
			);
		}

		const tableaus = [];
		for (let i = 0; i < 7; i++) {
			id = `tableau${i}`;

			tableaus.push(
				<Tableau
					id={id}
					key={id}
					cards={this.state.board[id]}
					handleDrop={this.handleDrop.bind(this)}
					handleClick={this.handleClick.bind(this)}
					handleDoubleClick={this.handleDoubleClick.bind(this)}
				/>
			);
		}

		return (
			<div className="game" draggable="false">
				<div className="tableRow" draggable="false">
					<Stock id="stock" cards={this.state.board.stock}
						handleClick={this.handleClick.bind(this)}
					/>
					<Waste id="waste" cards={this.state.board.waste}
						handleDoubleClick={this.handleDoubleClick.bind(this)}
					/>
					{foundations}
				</div>
				<div className="tableRow" draggable="false">
					{tableaus}
				</div>
				<CustomDragLayer />
			</div>
		);
	}
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Game);
