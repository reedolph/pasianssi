import React from 'react';
import { DropTarget } from 'react-dnd';

import Card from './Card.js';
import DraggableCard from './DraggableCard.js';

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
	const {
		id, canDrop, isOver, connectDropTarget,
		handleClick, handleDoubleClick
	} = props;

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

		if (isDraggable) {
			return (
				<DraggableCard
					location={id}
					key={rank + suit}
					rank={rank}
					suit={suit}
					isFaceUp={isFaceUp}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		} else {
			return (
				<Card
					location={id}
					key={rank + suit}
					rank={rank}
					suit={suit}
					isFaceUp={isFaceUp}
					isDraggable={false}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		}
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
