import './App.css';
import BingMap from './Components/BingMap';
import { useState } from 'react';
import Inputter from './Components/Inputter';

function App() {
	const [pins, setPins] = useState([]);
	const [polyline, setPolyLine] = useState({});

	const addPin = (onePin) => {
		let pinsToAdd = pins;
		pinsToAdd.push(onePin);
		setPins(pinsToAdd);

		let polylineToAdd = {
			location: [
				...pinsToAdd.map((pin) => pin.location),
				pinsToAdd[0].location,
			],
			option: {
				//style of the line with polyline
				strokeColor: 'red',
				strokeThickness: 3,
			},
		};

		setPolyLine(polylineToAdd);
	};

	return (
		<div className='App'>
			<Inputter addPin={addPin} />
			<BingMap pins={pins} polyline={polyline} />
		</div>
	);
}

export default App;
