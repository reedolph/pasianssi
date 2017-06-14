import React from 'react';
import PropTypes from 'prop-types';

import DraggableTableauPart from './DraggableTableauPart.js';
import DraggableCard from './DraggableCard.js';
import Card from './Card.js';

// import './TableauPart.css';

const TableauPart = (props) => {
	const {
		location, cards, style,
		handleClick, handleDoubleClick,
		isDraggable
	} = props;

	let firstCard, tableauPart;

	if (cards.length > 0) {
		if (cards.length === 1 && cards[0].isFaceUp) {
			firstCard = (
				<DraggableCard
					location={location}
					rank={cards[0].rank}
					suit={cards[0].suit}
					isFaceUp={cards[0].isFaceUp}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		} else {
			firstCard = (
				<Card
					location={location}
					rank={cards[0].rank}
					suit={cards[0].suit}
					isFaceUp={cards[0].isFaceUp}
					handleClick={handleClick}
					handleDoubleClick={handleDoubleClick}
				/>
			);
		}

		if (cards.length > 1) {
			if (cards[1].isFaceUp) {
				tableauPart = (
					<DraggableTableauPart
						location={location}
						cards={cards.slice(1)}
						handleClick={handleClick}
						handleDoubleClick={handleDoubleClick}
					/>
				);
			} else {
				tableauPart = (
					<TableauPart
						location={location}
						cards={cards.slice(1)}
						handleClick={handleClick}
						handleDoubleClick={handleDoubleClick}
					/>
				);
			}
		}
	}

	const id = `${location}${cards.length - 1}`;

	return (
		<div
			id={id}
			className="tableauPart"
			style={style}
			draggable={isDraggable || false}
		>
			{firstCard}
			{tableauPart}
		</div>
	);
}

TableauPart.propTypes = {
	location: PropTypes.string.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object),
	handleClick: PropTypes.func,
	handleDoubleClick: PropTypes.func,
	style: PropTypes.object,
	isDraggable: PropTypes.bool,
}

export default TableauPart;
