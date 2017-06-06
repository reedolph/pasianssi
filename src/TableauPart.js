import React from 'react';

import Card from './Card.js';

// import './TableauPart.css';

const TableauPart = (props) => {
	const { location, cards, style } = props;

	let firstCard, tableauPart;

	if (cards.length > 0) {
		const { rank, suit, isFaceUp } = cards[0];

		firstCard = (
			<Card
				location={location}
				rank={rank}
				suit={suit}
				isFaceUp={isFaceUp}
			/>
		);
		if (cards.length > 1) {
			tableauPart = (
				<TableauPart
					location={location}
					cards={cards.slice(1)}
				/>
			);
		}
	}

	const id = `${location}${cards.length - 1}`;

	return (
		<div
			id={id}
			className="tableauPart"
			style={style}
		>
			{firstCard}
			{tableauPart}
		</div>
	);
}

export default TableauPart;
