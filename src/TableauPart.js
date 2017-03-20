import React from 'react';
import { DragSource } from 'react-dnd';

import Card from './Card.js';

// import './TableauPart.css';

function tableauPartCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

const tableauPartSource = {
	beginDrag(props) {
		return {
			location: props.location,
			cards: props.cards
		};
	},

	canDrag(props) {
		if (props.hasOwnProperty('cards') && props.cards.length > 1 && props.cards[0].isFaceUp) {
			return true;
		} else {
			return false;
		}
	}
};

const TableauPart = (props) => {
	const { location, cards, handleClick, handleDoubleClick, connectDragSource } = props;

	const id = `${location}${cards.length - 1}`;

	let firstCard, tableauPart;

	if (cards.length > 0) {
		const { rank, suit, isFaceUp } = cards[0];

		let isLast = false;
		if (cards.length === 1) {
			isLast = true;
		}

		let isClickable = false;
		let isDoubleClickable = false;
		let isDraggable = false;
		if (isLast) {
			if (isFaceUp) {
				isDraggable = true;
				isDoubleClickable = true;
			} else {
				isClickable = true;
			}
		}

		if (isLast) {
			firstCard = (
				<Card
					location={location}
					rank={rank}
					suit={suit}
					isFaceUp={isFaceUp}
					isDraggable={isDraggable}
					isClickable={isClickable}
					isDoubleClickable={isDoubleClickable}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		} else {
			firstCard = (
				<Card
					location={location}
					rank={rank}
					suit={suit}
					isFaceUp={isFaceUp}
					isDraggable={isDraggable}
					isClickable={isClickable}
					isDoubleClickable={isDoubleClickable}
				/>
			);
		}
		if (cards.length > 1) {
			tableauPart = (
				<DraggableTableauPart
					id={id}
					location={location}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
					cards={cards.slice(1)}
				/>
			);
		}
	}

	if (cards.length > 1 && cards[0].isFaceUp) {
		return (
			connectDragSource(
				<div id={id} className="tableauPart">
					{firstCard}
					{tableauPart}
				</div>
			)
		);
	} else {
		return (
			<div id={id} className="tableauPart" draggable="false">
				{firstCard}
				{tableauPart}
			</div>
		);
	}
}

const DraggableTableauPart = DragSource('tableauPart', tableauPartSource, tableauPartCollect)(TableauPart);

export default DraggableTableauPart;
