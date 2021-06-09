import React, { useState, useEffect, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
const Drawing = () => {
	const [color, setcolor] = useState('#dddddd');

	const [seconds, setSeconds] = React.useState(10);
	const canvasRef = useRef(null);
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
			clear();
			setTimeout(() => setSeconds(10), 5000);
		}
	}, [seconds]);

	const clear = () => {
		const canvas=canvasRef.current;
        canvas.clear()
	};
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
			<CanvasDraw brushColor={color} ref={canvasRef} />
		</div>
	);
};
export default Drawing;
