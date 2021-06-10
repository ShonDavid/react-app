import './App.css';
import BingMap from './Components/BingMap';
import { useState } from 'react';
import Inputter from './Components/Inputter';

function App() {
	const [pins, setPins] = useState([]);
	const [polyline, setPolyLine] = useState([]);

	const addPin = (onePin) => {
		let pinsToAdd = pins;
		pinsToAdd.push(onePin);
		setPins(pinsToAdd);
		setPolyLine(props.polyline);
	};

	return (
		<div className='App'>
			<Inputter addPin={addPin} />
			<BingMap pins={pins} polyline={polyline} />
		</div>
	);
}

export default App;
