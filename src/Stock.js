import React from 'react';

import Card from './Card.js';

import './Stock.css';

const Stock = (props) => {
	const { cards, handleClick } = props;

	const renderedCards = cards.map((card, index, arr) => {
		const { rank, suit, isFaceUp } = card;

		return (
			<Card
				location="stock"
				key={rank + suit}
				rank={rank}
				suit={suit}
				isFaceUp={isFaceUp}
			/>
		);
	});

	return (
		<div className="stock area" onClick={(e) => { handleClick(e, 'stock'); }}>
			{renderedCards}
		</div>
	);
}

export default Stock;
