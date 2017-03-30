import React from 'react';

import CardDragPreview from './CardDragPreview';

// import './TableauPart.css';

const TableauPartDragPreview = (props) => {
	const { location, cards } = props;

	let firstCard, tableauPart;

	if (cards.length > 0) {
		const { rank, suit, isFaceUp } = cards[0];

		firstCard = (
			<CardDragPreview
				location={location}
				rank={rank}
				suit={suit}
				isFaceUp={isFaceUp}
			/>
		);
		if (cards.length > 1) {
			tableauPart = (
				<TableauPartDragPreview
					location={location}
					cards={cards.slice(1)}
				/>
			);
		}
	}

	return (
		<div className="tableauPart">
			{firstCard}
			{tableauPart}
		</div>
	);
}

export default TableauPartDragPreview;
