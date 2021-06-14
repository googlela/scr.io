import React, { useState, useEffect, useRef, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
import common from '../../constant/common'
const ENDPOINT = common.socket_base_url;
var socket: any;
interface CanvasProps {
	width: number;
	height: number;
}

type Coordinate = {
	x: number;
	y: number;
};
const Canvas = ({ width, height }: CanvasProps) => {
	const [color, setcolor] = useState('#dddddd');
	const [seconds, setSeconds] = React.useState(10);
	const SketchRef = useRef('');
	const skRef = SketchRef.current;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isPainting, setIsPainting] = useState(false);
	const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

	const startPaint = useCallback((event: MouseEvent) => {
		const coordinates = getCoordinates(event);
		if (coordinates) {
			setMousePosition(coordinates);
			setIsPainting(true);
		}
	}, []);
	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		canvas.addEventListener('mousedown', startPaint);
		return () => {
			canvas.removeEventListener('mousedown', startPaint);
		};
	}, [startPaint]);

	const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isPainting, mousePosition]
    );

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		canvas.addEventListener('mousemove', paint);
		return () => {
			canvas.removeEventListener('mousemove', paint);
		};
	}, [paint]);
	const exitPaint = useCallback(() => {
		setIsPainting(false);
		setMousePosition(undefined);
	}, []);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const canvas: HTMLCanvasElement = canvasRef.current;
		canvas.addEventListener('mouseup', exitPaint);
		canvas.addEventListener('mouseleave', exitPaint);
		return () => {
			canvas.removeEventListener('mouseup', exitPaint);
			canvas.removeEventListener('mouseleave', exitPaint);
		};
	}, [exitPaint]);

	const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		let data = {
			x: event.pageX - canvas.offsetLeft,
			y: event.pageY - canvas.offsetTop,
		};

		socket.emit('mouse', data);
		return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
	};

	const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
		if (!canvasRef.current) {
			return;
		}

		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext('2d');
		if (context) {
			context.strokeStyle = 'blue';
			context.lineJoin = 'round';
			context.lineWidth = 5;

			context.beginPath();
			context.moveTo(originalMousePosition.x, originalMousePosition.y);
			context.lineTo(newMousePosition.x, newMousePosition.y);
			context.closePath();

			context.stroke();
		}
	};

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
			clearcanvas()
			setTimeout(() => setSeconds(30), 5000);
		}
	}, [seconds, skRef]);

	useEffect(() => {
		socket = socketIOClient(ENDPOINT);
		socket.on('mouse', function (data: any) {
			console.log('data :>> ', data);
			if (!canvasRef.current) {
				return;
			}

			const canvas: HTMLCanvasElement = canvasRef.current;
			const context = canvas.getContext('2d');
			if (context) {
				// const img = Canvas.
				context.beginPath();
				context.strokeStyle = 'blue';
				context.fillStyle = 'blue';
				context.lineWidth = 5;
				context.rect(data.x, data.y, 1, 1);
				context.fill();
				context.stroke();
			}
		});
	}, [color]);
	function clearcanvas() {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context1 = canvas.getContext('2d');
		if (context1) context1.clearRect(0, 0, canvas.width, canvas.height);
	}
	return (
		<div>
			{seconds}
			<div>
				Current color: {color}
				<div
					className="inline-block w-4 h-4 p-3 px-5"
					style={{
						backgroundColor: color,
						border: '1px solid #272727',
					}}
				/>
			</div>
			<canvas ref={canvasRef} height={height} width={width} />
		</div>
	);
};

Canvas.defaultProps = {
	width: 400,
	height: 400,
};
export default Canvas;
