import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import Card from './Card.js';
import TableauPart from './TableauPart.js';
import { ItemTypes } from './Constants.js';

function collect(monitor) {
	return {
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	};
}

function getStyles(props) {
	const { item, currentOffset } = props;

	if (!currentOffset) {
		return {
			display: 'none'
		};
	}

	const { x, y } = currentOffset;
	const transform = `translate(${x}px, ${y}px)`;

	const { rect } = item;
	const { width, height } = rect;

	return {
		position: 'absolute',
		left: 0,
		top: 0,
		width: width + 'px',
		height: height + 'px',
		pointerEvents: 'none',
		transform: transform,
		WebkitTransform: transform
	};
}

const CustomDragLayer = props => {
	const { isDragging, item, itemType } = props;

	if (!isDragging) {
		return null;
	}

	switch (itemType) {
		case ItemTypes.CARD:
			const { rank, suit, isFaceUp } = item;

			return (
				<div style={getStyles(props)}>
					<Card rank={rank} suit={suit} isFaceUp={isFaceUp} />
				</div>
			);
		case ItemTypes.TABLEAUPART:
			const { cards } = item;

			return (
				<div style={getStyles(props)}>
					<TableauPart cards={cards} />
				</div>
			);
		default:
			break;
	}
};

CustomDragLayer.propTypes = {
	item: PropTypes.object,
	itemType: PropTypes.string,
	currentOffset: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}),
	isDragging: PropTypes.bool.isRequired
};

export default DragLayer(collect)(CustomDragLayer);
