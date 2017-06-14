import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = (props) => {
	const {
		location, rank, suit, isFaceUp, isSpread, style,
		handleClick, handleDoubleClick,
		isDraggable
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

	const onClick = (e) => handleClick(e, location, card);
	const onDoubleClick = (e) => handleDoubleClick(e, location, card);

	return <img
		className={'card' + (isSpread ? ' spread' : '')}
		src={image}
		alt={rank + suit}
		onClick={onClick}
		onDoubleClick={onDoubleClick}
		style={style}
		draggable={isDraggable || false}
	/>;
};

Card.propTypes = {
	location: PropTypes.string,
	rank: PropTypes.number.isRequired,
	suit: PropTypes.string.isRequired,
	isFaceUp: PropTypes.bool,
	isSpread: PropTypes.bool,
	style: PropTypes.object,
	handleClick: PropTypes.func,
	handleDoubleClick: PropTypes.func,
	isDraggable: PropTypes.bool
}

export default Card;
