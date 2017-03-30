import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import './Card.css';

function cardCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

function getStyles(props) {
	const { isDragging } = props;

	return {
		// IE fallback: hide the real node using CSS when dragging
		// because IE will ignore our custom "empty image" drag preview.
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	}
}

const cardSource = {
	canDrag: function(props, monitor) {
		return props.isDraggable;
	},

	beginDrag(props, monitor, component) {
		return {
			location: props.location,
			rank: props.rank,
			suit: props.suit,
			isFaceUp: props.isFaceUp,
			handleClick: props.handleClick,
			handleDoubleClick: props.handleDoubleClick,
			rect: findDOMNode(component).getBoundingClientRect()
		};
	}
};

class Card extends Component {
	componentDidMount() {
		// Use empty image as a drag preview so browsers don't draw it
		// and we can draw whatever we want on the custom drag layer instead.
		this.props.connectDragPreview(getEmptyImage(), {
			// IE fallback: specify that we'd rather screenshot the node
			// when it already knows it's being dragged so we can hide it with CSS.
			captureDraggingState: true
		});
	}

	render() {
		const {
			location, rank, suit, isFaceUp, isSpread,
			isDraggable, isClickable, isDoubleClickable,
			handleClick, handleDoubleClick,
			connectDragSource
		} = this.props;

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
						style={getStyles(this.props)}
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
						style={getStyles(this.props)}
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
						style={getStyles(this.props)}
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
						style={getStyles(this.props)}
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
				style={getStyles(this.props)}
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
				style={getStyles(this.props)}
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
				style={getStyles(this.props)}
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
				style={getStyles(this.props)}
				draggable={false}
				/>
			);
		}
	}
};

export default DragSource('card', cardSource, cardCollect)(Card);
