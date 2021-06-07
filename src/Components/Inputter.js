import './Inputter.css';
import { useState } from 'react';

function Inputter(props) {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const onchangeLatitude = (e) => {
		setLatitude(e.target.value);
	};

	const onchangeLongitude = (e) => {
		setLongitude(e.target.value);
	};

	const onEnterPins = (e) => {
		if (e.key === 'Enter') {
			if (latitude.length !== 0 && longitude.length !== 0) {
				const pinToPush = {
					location: [parseFloat(latitude), parseFloat(longitude)],
				};
				props.addPin(pinToPush);
			}
		}
	};

	const onPressButton = (e) => {
		console.log('latitude=', latitude);
		console.log('longitude=', longitude);
		if (latitude.length !== 0 && longitude.length !== 0) {
			const pinToPush = {
				location: [parseFloat(latitude), parseFloat(longitude)],
				option: { color: 'red' },
			};
			props.addPin(pinToPush);
		}
	};

	return (
		<div className='Inputter'>
			<input
				type='text'
				className='input'
				placeholder='add latitude'
				name='latitude'
				value={latitude}
				onChange={onchangeLatitude}
			/>
			<div className='spacer' />
			<input
				type='text'
				className='input'
				placeholder='add longitude'
				name='longitude'
				value={longitude}
				onChange={onchangeLongitude}
				onKeyPress={onEnterPins}
			/>
			<div className='spacer' />
			<button onClick={onPressButton} className='button-style'>
				Add to map
			</button>
		</div>
	);
}

export default Inputter;
