import React from 'react';
import { DropTarget } from 'react-dnd';

import DraggableTableauPart from './DraggableTableauPart.js';
import TableauPart from './TableauPart.js';

import './Tableau.css';

const tableauTarget = {
	canDrop(props) {
		return true;
	},

	drop(props, monitor) {
		switch (monitor.getItemType()) {
			case 'card':
				const card = monitor.getItem();
				props.handleDrop([{
					rank: card.rank,
					suit: card.suit,
					isFaceUp: card.isFaceUp
				}], card.location, props.id);
				break;
			case 'tableauPart':
				const tableauPart = monitor.getItem();
				const cards = tableauPart.cards;
				props.handleDrop(cards, tableauPart.location, props.id);
				break;
			default:
				break;
		}

		return { id: props.id };
	}
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

const Tableau = (props) => {
	const { id, cards, canDrop, isOver, handleClick, handleDoubleClick, connectDropTarget } = props;

	const isActive = canDrop && isOver;

	let firstTableauPart;
	if (cards.length > 1 && cards[0].isFaceUp) {
		firstTableauPart = <DraggableTableauPart
			key={`${id}${cards.length - 1}`}
			location={id}
			cards={cards}
			handleClick={handleClick}
			handleDoubleClick={handleDoubleClick}
		/>
	} else if (cards.length <= 1 || !cards[0].isFaceUp) {
		firstTableauPart = <TableauPart
			key={`${id}${cards.length - 1}`}
			location={id}
			cards={cards}
			handleClick={handleClick}
			handleDoubleClick={handleDoubleClick}
		/>
	}

	return (
		connectDropTarget(
			<div id={id} className={'tableau area' + (isActive ? ' active' : '')}>
				{firstTableauPart}
			</div>
		)
	);
}

export default DropTarget(['card', 'tableauPart'], tableauTarget, collect)(Tableau);
