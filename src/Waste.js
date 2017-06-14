import React from 'react';
import PropTypes from 'prop-types';

import DraggableCard from './DraggableCard.js';
import Card from './Card.js';

import './Waste.css';

const Waste = (props) => {
	const { handleClick, handleDoubleClick } = props;

	const cards = props.cards.map((card, index, arr) => {
		const { rank, suit, isFaceUp, isSpread } = card;

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
					location="waste"
					key={rank + suit}
					rank={rank}
					suit={suit}
					isFaceUp={isFaceUp}
					isSpread={isSpread}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		} else {
			return (
				<Card
					location="waste"
					key={rank + suit}
					rank={rank}
					suit={suit}
					isFaceUp={isFaceUp}
					isSpread={isSpread}
					isDraggable={false}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		}
	});

	return (
		<div className="waste area">
			{cards}
		</div>
	);
}

Waste.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	handleClick: PropTypes.func,
	handleDoubleClick: PropTypes.func,
}

export default Waste;
