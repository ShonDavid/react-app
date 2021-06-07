import './BingMap.css';
import { ReactBingmaps } from 'react-bingmaps';
import { useEffect, useState } from 'react';
function BingMap(props) {
	const [pushPins, setPushPins] = useState([]);
	const [polyline, setPolyLine] = useState([]);

	useEffect(() => {
		setPushPins(props.pins);
		setPolyLine([
			{
				locations:
					props.pins.length === 0
						? []
						: props.pins.map((pin) => {
								let toRet = {
									latitude: pin.location[0],
									longitude: pin.location[1],
								};
								return toRet;
						  }),
				options: {
					strokeColor: 'red',
					visible: true,
				},
			},
		]);
	}, [props.pins]);

	useEffect(() => {
		console.log('polyline=', polyline);
	}, [polyline]);

	return (
		<div className='BingMap'>
			<ReactBingmaps
				bingmapKey='AlLIyQyHrjClUlcXVt9dEdP6amZeKI13YhnNY9qbmasERZ5537U-Vb7TU-9a6887'
				center={
					pushPins.length === 0
						? [10.0827, 70.2707]
						: pushPins[pushPins.length - 1].location
				}
				// pushPins={[
				// 	{
				// 		location: [13.0827, 80.2707],
				// 		option: { color: 'red' },
				// 	},
				// ]}
				PolyLine={polyline}
				pushPins={pushPins}
			></ReactBingmaps>
		</div>
	);
}

export default BingMap;
