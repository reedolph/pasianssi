import React from 'react';

import './Card.css';

const CardDragPreview = (props) => {
	const { rank, suit, isFaceUp } = props;

	// console.log(isFaceUp);

	let rankLetter;
	switch (rank) {
		case 11: rankLetter = 'j'; break;
		case 12: rankLetter = 'q'; break;
		case 13: rankLetter = 'k'; break;
		default: rankLetter = rank + ''; break;
	}

	let image = '';
	if (isFaceUp) {
		image = require(`./images/fronts/${rankLetter}${suit}.svg`);
	} else {
		image = require('./images/backs/back1.svg');
	}

	return <img
		className="card"
		src={image}
		alt={rank + suit}
	/>;
};

export default CardDragPreview;
