import React from 'react';
import { DragSource } from 'react-dnd';

import './Card.css';

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

const cardSource = {
	canDrag: function(props, monitor) {
		return props.isDraggable;
	},

	beginDrag(props) {
		return {
			location: props.location,
			rank: props.rank,
			suit: props.suit,
			isFaceUp: props.isFaceUp,
			handleClick: props.handleClick,
			handleDoubleClick: props.handleDoubleClick
		};
	}
};

const Card = (props) => {
	const {
		location, rank, suit, isFaceUp, isSpread,
		isDraggable, isClickable, isDoubleClickable,
		handleClick, handleDoubleClick,
		connectDragSource, isDragging
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

	if (isDraggable) {
		if (isClickable && isDoubleClickable) {
			return (
				connectDragSource(
					<img
					className={'card' + (isSpread ? ' spread' : '')}
					src={image}
					alt={rank + suit}
					style={{opacity: isDragging ? 0.9 : 0.98}}
					onClick={(e) => { handleClick(e, location, card); }}
					onDoubleClick={(e) => { handleDoubleClick(e, location, card); }}
					/>
				)
			);
		} else if (isClickable) {
			return (
				connectDragSource(
					<img
					className={'card' + (isSpread ? ' spread' : '')}
					src={image}
					alt={rank + suit}
					style={{opacity: isDragging ? 0.9 : 0.98}}
					onClick={(e) => { handleClick(e, location, card); }}
					/>
				)
			);
		} else if (isDoubleClickable) {
			return (
				connectDragSource(
					<img
					className={'card' + (isSpread ? ' spread' : '')}
					src={image}
					alt={rank + suit}
					style={{opacity: isDragging ? 0.9 : 0.98}}
					onDoubleClick={(e) => { handleDoubleClick(e, location, card); }}
					/>
				)
			);
		} else {
			return (
				connectDragSource(
					<img
					className={'card' + (isSpread ? ' spread' : '')}
					src={image}
					alt={rank + suit}
					style={{opacity: isDragging ? 0.9 : 0.98}}
					/>
				)
			);
		}
	} else if (isClickable && isDoubleClickable) {
		return (
			<img
			className={'card' + (isSpread ? ' spread' : '')}
			src={image}
			alt={rank + suit}
			style={{opacity: isDragging ? 0.9 : 1}}
			onClick={(e) => { handleClick(e, location, card); }}
			onDoubleClick={(e) => { handleDoubleClick(e, location, card); }}
			draggable={false}
			/>
		);
	} else if (isClickable) {
		return (
			<img
			className={'card' + (isSpread ? ' spread' : '')}
			src={image}
			alt={rank + suit}
			style={{opacity: isDragging ? 0.9 : 1}}
			onClick={(e) => { handleClick(e, location, card); }}
			draggable={false}
			/>
		);
	} else if (isDoubleClickable) {
		return (
			<img
			className={'card' + (isSpread ? ' spread' : '')}
			src={image}
			alt={rank + suit}
			style={{opacity: isDragging ? 0.9 : 1}}
			onDoubleClick={(e) => { handleDoubleClick(e, location, card); }}
			draggable={false}
			/>
		);
	} else {
		return (
			<img
			className={'card' + (isSpread ? ' spread' : '')}
			src={image}
			alt={rank + suit}
			style={{opacity: isDragging ? 0.9 : 1}}
			draggable={false}
			/>
		);
	}
};

export default DragSource('card', cardSource, collect)(Card);
