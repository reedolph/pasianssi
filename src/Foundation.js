import React from 'react';
import { DropTarget } from 'react-dnd';

import Card from './Card.js';

import './Foundation.css';

const foundationTarget = {
	canDrop(props) {
		return true;
	},

	drop(props, monitor) {
		const card = monitor.getItem();
		props.handleDrop([{
			rank: card.rank,
			suit: card.suit,
			isFaceUp: card.isFaceUp
		}], card.location, props.id);
		return { id: props.id };
	}
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

const Foundation = (props) => {
	const { id, canDrop, isOver, connectDropTarget } = props;

	const cards = props.cards.map((card, index, arr) => {
		const { rank, suit, isFaceUp } = card;

		let isLast = false;
		if (index === arr.length - 1) {
			isLast = true;
		}

		let isDraggable = false;
		if (isLast) {
			isDraggable = true;
		}

		return (
			<Card
				location={id}
				key={rank + suit}
				rank={rank}
				suit={suit}
				isFaceUp={isFaceUp}
				isDraggable={isDraggable}
			/>
		);
	});

	const isActive = canDrop && isOver;

	return (
		connectDropTarget(
			<div id={id} className={'foundation area' + (isActive ? ' active' : '')}>
				{cards}
			</div>
		)
	);
}

export default DropTarget('card', foundationTarget, collect)(Foundation);
