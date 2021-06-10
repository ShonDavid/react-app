import './BingMap.css';
import { ReactBingmaps } from 'react-bingmaps';
import { useEffect, useState } from 'react';
function BingMap(props) {
	const [pushPins, setPushPins] = useState([]);
	const [polyline, setPolyLine] = useState([]);

	useEffect(() => {
		setPushPins(props.pins);
	}, [props.pins]);

	useEffect(() => {
		setPolyLine(props.polyline);
	}, [props.polyline]);

	return (
		<div className='BingMap'>
			<ReactBingmaps
				bingmapKey={process.env.REACT_APP_BING_KEY}
				center={
					pushPins.length === 0
						? [10.0827, 70.2707]
						: pushPins[pushPins.length - 1].location
				}
				polyline={polyline}
				pushPins={pushPins}
			></ReactBingmaps>
		</div>
	);
}

export default BingMap;
