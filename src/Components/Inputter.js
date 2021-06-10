import './Inputter.css';
import { Fragment, useState } from 'react';

function Inputter(props) {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const onClickOptionOne = (e) => {
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

	const firstOption = () => {
		return (
			<Fragment>
				<input
					type='text'
					className='input'
					placeholder='add latitude'
					name='latitude'
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
				/>
				<div className='spacer' />
				<input
					type='text'
					className='input'
					placeholder='add longitude'
					name='longitude'
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
				/>
				<div className='spacer' />
				<button onClick={onClickOptionOne} className='button-style'>
					Add to map
				</button>
			</Fragment>
		);
	};

	return <div className='Inputter'>{firstOption()}</div>;
}

export default Inputter;
