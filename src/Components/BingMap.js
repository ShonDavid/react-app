import './BingMap.css';
import { ReactBingmaps } from 'react-bingmaps';
import { useState } from 'react';
function BingMap(props) {
	return (
		<div className='BingMap'>
			<ReactBingmaps
				bingmapKey='AlLIyQyHrjClUlcXVt9dEdP6amZeKI13YhnNY9qbmasERZ5537U-Vb7TU-9a6887'
				center={[13.0827, 80.2707]}
				// pushPins={[
				// 	{
				// 		location: [13.0827, 80.2707],
				// 		option: { color: 'red' },
				// 	},
				// ]}
				pushPins={props.pins}
			></ReactBingmaps>
		</div>
	);
}

export default BingMap;
