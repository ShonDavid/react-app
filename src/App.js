import './App.css';
import BingMap from './Components/BingMap';
import { useState } from 'react';
import Inputter from './Components/Inputter';

function App() {
	const [pins, setPins] = useState([]);

	const addPin = (onePin) => {
		let pinsToAdd;
		console.log('onePin=', onePin);
		if (pins.length > 2) {
			pinsToAdd = pins.slice(1);
			pinsToAdd.push(onePin);
			setPins(pinsToAdd);
		} else {
			pinsToAdd = pins;
			pinsToAdd.push(onePin);
			setPins(pinsToAdd);
		}
	};

	return (
		<div className='App'>
			<Inputter addPin={addPin} />
			<BingMap pins={pins} />
		</div>
	);
}

export default App;
