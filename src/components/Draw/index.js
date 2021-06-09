import React, { useState, useEffect} from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";

const Drawing = () => {
	const [color, setcolor] = useState('#dddddd');

	const [seconds, setSeconds] = React.useState(10);
	useEffect(() => {
		const interval = setInterval(() => {
			setcolor('#' + Math.floor(Math.random() * 16777215).toString(16));
		}, 2000);
		return () => clearInterval(interval);
	}, [color]);

	useEffect(() => {
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
		} else {
			setTimeout(() => setSeconds(10), 5000);
		}
	}, [seconds]);


	return (
		<div>
			{seconds}

			<div>
				Current color: {color}
				<div
					style={{
						display: 'inline-block',
						width: '24px',
						height: '24px',
						backgroundColor: color,
						border: '1px solid #272727',
						padding: '10px',
					}}
				/>
			</div>
			<ReactSketchCanvas
			className="border-gray-600 border-2 "
			width="600"
			height="400"
			strokeWidth={4}
			strokeColor="red"
		  />
		</div>
	);
};
export default Drawing;
