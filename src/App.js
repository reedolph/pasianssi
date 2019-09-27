import React from 'react';

import Game from './Game';

import './App.css';

const App = props => {
	return (
		<div className="app" draggable="false">
			<Game />
		</div>
	);
};

export default App;
