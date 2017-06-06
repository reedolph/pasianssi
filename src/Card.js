import React from 'react';

import './Card.css';

const Card = (props) => {
	const {
		location, rank, suit, isFaceUp, isSpread, style,
		isClickable, isDoubleClickable,
		handleClick, handleDoubleClick
	} = props;

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

	let card = {
		rank: rank,
		suit: suit,
		isFaceUp: isFaceUp,
		isSpread: isSpread
	};

	let onClick = null;
	if (isClickable) {
		onClick = (e) => handleClick(e, location, card);
	}

	let onDoubleClick = null;
	if (isDoubleClickable) {
		onDoubleClick = (e) => handleDoubleClick(e, location, card);
	}

	return <img
		className={'card' + (isSpread ? ' spread' : '')}
		src={image}
		alt={rank + suit}
		onClick={onClick}
		onDoubleClick={onDoubleClick}
		style={style}
	/>;
};

export default Card;
