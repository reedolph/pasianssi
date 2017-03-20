import React from 'react';

import Card from './Card.js';

// import './Waste.css';

const Waste = (props) => {
	const { handleDoubleClick } = props;

	const cards = props.cards.map((card, index, arr) => {
		const { rank, suit, isFaceUp, isSpread } = card;

		let isLast = false;
		if (index === arr.length - 1) {
			isLast = true;
		}

		let isDraggable = false;
		let isDoubleClickable = false;
		if (isLast) {
			isDraggable = true;
			isDoubleClickable = true;
		}

		return (
			<Card
				location="waste"
				key={rank + suit}
				rank={rank}
				suit={suit}
				isFaceUp={isFaceUp}
				isSpread={isSpread}
				isDraggable={isDraggable}
				isDoubleClickable={isDoubleClickable}
				handleDoubleClick={handleDoubleClick}
			/>
		);
	});

	return (
		<div className="waste area">
			{cards}
		</div>
	);
}

export default Waste;
