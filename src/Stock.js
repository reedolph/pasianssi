import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.js';

import './Stock.css';

const Stock = props => {
	const { cards, handleClick, handleDoubleClick } = props;

	const renderedCards = cards.map((card, index, arr) => {
		const { rank, suit, isFaceUp } = card;

		return (
			<Card
				location="stock"
				key={rank + suit}
				rank={rank}
				suit={suit}
				isFaceUp={isFaceUp}
				handleClick={handleClick}
				handleDoubleClick={handleDoubleClick}
			/>
		);
	});

	return (
		<div
			className="stock area"
			onClick={e => {
				handleClick(e, 'stock');
			}}
		>
			{renderedCards}
		</div>
	);
};

Stock.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	handleClick: PropTypes.func,
	handleDoubleClick: PropTypes.func
};

export default Stock;
