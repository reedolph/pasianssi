import React from 'react';
import { DragLayer } from 'react-dnd';

import Card from './Card.js';
import TableauPart from './TableauPart.js';

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
	const { rect } = item;
	const { width, height } = rect;

	if (!currentOffset) {
		return {
			display: 'none'
		};
	}

	const { x, y } = currentOffset;
	const transform = `translate(${x}px, ${y}px)`;

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

const CustomDragLayer = (props) => {
	const { isDragging, item, itemType } = props;

	if (!isDragging) {
		return null;
	}

	switch (itemType) {
		case 'card':
			const { rank, suit, isFaceUp } = item;

			return (
				<div style={getStyles(props)}>
					<Card rank={rank} suit={suit} isFaceUp={isFaceUp} />
				</div>
			);
		case 'tableauPart':
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

export default DragLayer(collect)(CustomDragLayer);
