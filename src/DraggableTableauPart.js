import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import TableauPart from './TableauPart.js';

import './TableauPart.css';

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
		console.log('DraggableTableauPart canDrag true');
		return true;
//		if (props.hasOwnProperty('cards') && props.cards.length > 1 && props.cards[0].isFaceUp) {
//			console.log('DraggableTableauPart canDrag true');
//			return true;
//		} else {
//			console.log('DraggableTableauPart canDrag false');
//			return false;
//		}
	},

	beginDrag(props, monitor, component) {
		console.log('DraggableTableauPart beginDrag');
		return {
			location: props.location,
			cards: props.cards,
			rect: findDOMNode(component).getBoundingClientRect()
		};
	}
};

class DraggableTableauPart extends Component {
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
		const { location, cards, handleClick, handleDoubleClick } = this.props;

		return (
			this.props.connectDragSource(
				<div className="draggableTableauPart">
					<TableauPart
						isDraggable={true}
						style={getStyles(this.props)}
						location={location}
						cards={cards}
						handleClick={handleClick}
						handleDoubleClick={handleDoubleClick}
					/>
				</div>
			)
		);
	}
}

export default DragSource('tableauPart', tableauPartSource, tableauPartCollect)(DraggableTableauPart);
