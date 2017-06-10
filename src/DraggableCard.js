import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Card from './Card.js';

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
	canDrag(props, monitor) {
		console.log('DraggableCard canDrag true');
		return true;
	},

	beginDrag(props, monitor, component) {
		console.log('DraggableCard beginDrag');
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

class DraggableCard extends Component {
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
			isClickable, isDoubleClickable,
			handleClick, handleDoubleClick
		} = this.props;

		return (
			this.props.connectDragSource(
				<div className="draggableCard">
					<Card
						location={location}
						rank={rank}
						suit={suit}
						isFaceUp={isFaceUp}
						isSpread={isSpread}
						isClickable={isClickable}
						isDoubleClickable={isDoubleClickable}
						handleClick={handleClick}
						handleDoubleClick={handleDoubleClick}
						isDraggable={true}
						style={getStyles(this.props)}
					/>
				</div>
			)
		);
	}
};

export default DragSource('card', cardSource, cardCollect)(DraggableCard);
