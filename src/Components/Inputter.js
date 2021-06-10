import './Inputter.css';
import { Fragment, useState } from 'react';
import axios from 'axios';

function Inputter(props) {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [radioButton, setRadioButton] = useState('cordinates');
	const apiSearch = axios.create({
		baseURL: `http://dev.virtualearth.net/REST/v1/`,
	});

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

	const onSearchInput = async (e) => {
		let value = e.target.value;
		setSearchInput(value);
		if (value.length === 0 || value.length === 1) {
			setSuggestions([]);
		} else {
			const config = {
				params: {
					query: value,
					maxResults: 10,
					key: process.env.REACT_APP_BING_KEY,
				},
				crossdomain: true,
			};
			const res = await apiSearch.get('Locations', config);
			if (
				res.data.statusCode === 200 &&
				res.data.resourceSets &&
				res.data.resourceSets[0] &&
				res.data.resourceSets[0].resources
			) {
				setSuggestions(
					res.data.resourceSets[0].resources.map((option) => option.name)
				);
			}
		}
	};

	const onClickInput = async () => {
		if (searchInput.length === 0 || searchInput.length === 1) {
			//do nothing
			return;
		} else {
			const config = {
				params: {
					query: searchInput,
					maxResults: 1,
					key: process.env.REACT_APP_BING_KEY,
				},
				crossdomain: true, //FIX: CORS PROBLEM
			};
			const res = await apiSearch.get('Locations', config);
			if (
				res.data.statusCode === 200 &&
				res.data.resourceSets &&
				res.data.resourceSets[0] &&
				res.data.resourceSets[0].resources &&
				res.data.resourceSets[0].resources.length > 0 &&
				res.data.resourceSets[0].resources[0].point &&
				res.data.resourceSets[0].resources[0].point.coordinates
			) {
				const pinToPush = {
					location: res.data.resourceSets[0].resources[0].point.coordinates,
					option: { color: 'red' },
				};
				props.addPin(pinToPush);
			} else {
				//TODO: print an error to the user
			}
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

	const secondOption = () => {
		return (
			<Fragment>
				<div className='input-auto-complete-container'>
					<input
						type='text'
						className='input'
						placeholder='search a place'
						name='search'
						value={searchInput}
						onChange={(e) => onSearchInput(e)}
						autoComplete='off'
					/>
					{suggestions.length > 0 && (
						<div className='autocomplete'>
							{suggestions.map((suggestion) => (
								<div
									className='one-suggestion'
									onClick={() =>
										setSearchInput(suggestion) || setSuggestions([])
									}
								>
									{suggestion}
								</div>
							))}
						</div>
					)}
				</div>

				<div className='spacer' />
				<button className='button-style' onClick={onClickInput}>
					Add to map
				</button>
			</Fragment>
		);
	};

	return (
		<div className='Inputter'>
			<div>
				<input
					type='radio'
					onChange={(e) => setRadioButton(e.target.name)}
					checked={radioButton === 'cordinates'}
					name='cordinates'
					key='cordinates'
				/>
				Add cordinates
				<input
					type='radio'
					key='location'
					onChange={(e) => setRadioButton(e.target.name)}
					checked={radioButton === 'location'}
					name='location'
				/>
				Search location
			</div>
			<div className='spacer' />
			{radioButton === 'cordinates' && firstOption()}
			{radioButton === 'location' && secondOption()}
		</div>
	);
}

export default Inputter;
