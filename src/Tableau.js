import React from 'react';
import { DropTarget } from 'react-dnd';

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

	return (
		connectDropTarget(
			<div id={id} className={'tableau area' + (isActive ? ' active' : '')}>
				<TableauPart
					key={`${id}${cards.length - 1}`}
					location={id}
					cards={cards}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			</div>
		)
	);
}

export default DropTarget(['card', 'tableauPart'], tableauTarget, collect)(Tableau);
