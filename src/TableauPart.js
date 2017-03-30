import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Card from './Card.js';

// import './TableauPart.css';

function tableauPartCollect(connect, monitor) {
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

const tableauPartSource = {
	canDrag(props) {
		if (props.hasOwnProperty('cards') && props.cards.length > 1 && props.cards[0].isFaceUp) {
			return true;
		} else {
			return false;
		}
	},

	beginDrag(props, monitor, component) {
		return {
			location: props.location,
			cards: props.cards,
			rect: findDOMNode(component).getBoundingClientRect()
		};
	}
};

class TableauPart extends Component {
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
		const { location, cards, handleClick, handleDoubleClick, connectDragSource } = this.props;

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
					<div
						id={id}
						className="tableauPart"
						style={getStyles(this.props)}
					>
						{firstCard}
						{tableauPart}
					</div>
				)
			);
		} else {
			return (
				<div
					id={id}
					className="tableauPart"
					style={getStyles(this.props)}
					draggable="false"
				>
					{firstCard}
					{tableauPart}
				</div>
			);
		}
	}
}

const DraggableTableauPart = DragSource('tableauPart', tableauPartSource, tableauPartCollect)(TableauPart);

export default DraggableTableauPart;
