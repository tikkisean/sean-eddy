import { React, useState } from "react";
import TrafficControls from "./TrafficControls";
import "../css/Traffic.css";

export default function Traffic() {
	document.title = "Traffic Simulation";

	const [scaleFactor, setScaleFactor] = useState(60);

	function zoom(e) {
		setScaleFactor(
			(e.wheelDelta ? e.wheelDelta > 0 : e.deltaY < 0)
				? scaleFactor !== 10
					? scaleFactor - 10
					: scaleFactor
				: scaleFactor !== 1000
				? scaleFactor + 10
				: scaleFactor
		);
	}

	function drawIntersection(opts) {
		const canvas = document.getElementsByTagName("canvas")[0];
		canvas.addEventListener("wheel", zoom);
		canvas.setAttribute(
			"width",
			`${
				document.getElementById("main-container").clientWidth -
				document.getElementsByClassName("traffic-controls")[0].clientWidth
			}px`
		);
		canvas.setAttribute(
			"height",
			`${
				document.getElementById("main-container").clientHeight /
				(window.innerWidth <= 480 ? 2 : 1)
			}px`
		);
		const width = canvas.width;
		const height = canvas.height;

		const rem = width / scaleFactor;

		const c = canvas.getContext("2d");

		const xMid = width / 2;
		const yMid = height / 2;
		const laneWidth = 4 * rem;
		const bikeWidth = (laneWidth * 4) / 10;
		const paintWidth = 0.3 * rem;
		const paintHeight = paintWidth * 15;
		const paintGap = paintHeight * 2;
		const medWidth = paintWidth * 3;
		const xWidth =
			medWidth +
			opts.x.leftTurns * laneWidth +
			opts.x.leftTurns * paintWidth +
			opts.x.numLanes * laneWidth +
			(opts.x.numLanes - 2) * paintWidth +
			(opts.x.bike ? paintWidth * 2 + bikeWidth * 2 : 0);
		const yWidth =
			medWidth +
			opts.y.leftTurns * laneWidth +
			opts.y.leftTurns * paintWidth +
			opts.y.numLanes * laneWidth +
			(opts.y.numLanes - 2) * paintWidth +
			(opts.y.bike ? paintWidth * 2 + bikeWidth * 2 : 0);
		const xLWidth = medWidth + opts.x.leftTurns * (laneWidth + paintWidth);
		const yLWidth = medWidth + opts.y.leftTurns * (laneWidth + paintWidth);
		const xRWidth = opts.x.rightTurns * (laneWidth + paintWidth);
		const yRWidth = opts.y.rightTurns * (laneWidth + paintWidth);
		const xStop =
			yWidth / 2 +
			yRWidth +
			laneWidth +
			(opts.crosswalks ? (3 / 8) * laneWidth : 0) +
			paintWidth * 2;
		const yStop =
			xWidth / 2 +
			xRWidth +
			laneWidth +
			(opts.crosswalks ? (3 / 8) * laneWidth : 0) +
			paintWidth * 2;

		// draw grass
		c.fillStyle = "darkgreen";
		c.fillRect(0, 0, width, height);

		// draw roads
		c.fillStyle = "black";
		c.fillRect(xMid - yWidth / 2 - yRWidth, 0, yWidth + yRWidth, yMid);
		c.fillRect(xMid, yMid - xWidth / 2 - xRWidth, xMid, xWidth + xRWidth);
		c.fillRect(xMid - yWidth / 2, yMid, yWidth + yRWidth, yMid);
		c.fillRect(0, yMid - xWidth / 2, xMid, xWidth + xRWidth);

		// draw crosswalks
		if (opts.crosswalks) {
			c.fillStyle = "white";
			c.fillRect(
				xMid - yWidth / 2 - yRWidth - laneWidth,
				yMid - xWidth / 2 - xRWidth - laneWidth,
				yWidth + (yRWidth + laneWidth) * 2,
				xWidth + (xRWidth + laneWidth) * 2
			);
			c.fillStyle = "black";
			c.fillRect(
				xMid - yWidth / 2 - yRWidth - laneWidth + paintWidth,
				yMid - xWidth / 2 - xRWidth - laneWidth + paintWidth,
				yWidth + (yRWidth + laneWidth - paintWidth) * 2,
				xWidth + (xRWidth + laneWidth - paintWidth) * 2
			);
			c.fillStyle = "white";
			c.fillRect(
				xMid - yWidth / 2 - yRWidth - paintWidth,
				yMid - xWidth / 2 - xRWidth - paintWidth,
				yWidth + (yRWidth + paintWidth) * 2,
				xWidth + (xRWidth + paintWidth) * 2
			);
			c.fillStyle = "black";
			c.fillRect(
				xMid - yWidth / 2 - yRWidth,
				yMid - xWidth / 2 - xRWidth,
				yWidth + yRWidth * 2,
				xWidth + xRWidth * 2
			);
		} else {
			c.fillStyle = "black";
			c.fillRect(
				xMid - yWidth / 2 - xRWidth - laneWidth,
				yMid - xWidth / 2 - yRWidth - laneWidth,
				yWidth + laneWidth * 2,
				xWidth + laneWidth * 2
			);
		}

		// draw stop lines
		c.fillStyle = "white";
		c.fillRect(
			xMid - yWidth / 2 - yRWidth,
			yMid - yStop,
			yWidth / 2 - yLWidth / 2 + yRWidth,
			paintWidth * 2
		);
		c.fillRect(
			xMid + xStop - paintWidth * 2,
			yMid - xWidth / 2 - xRWidth,
			paintWidth * 2,
			xWidth / 2 - xLWidth / 2 + xRWidth
		);
		c.fillRect(
			xMid + yLWidth / 2,
			yMid + yStop - paintWidth * 2,
			yWidth / 2 - yLWidth / 2 + yRWidth,
			paintWidth * 2
		);
		c.fillRect(
			xMid - xStop,
			yMid + xLWidth / 2,
			paintWidth * 2,
			xWidth / 2 - xLWidth / 2 + xRWidth
		);

		// draw left turn lanes
		/*
		c.fillStyle = "white";
		for (
			let x = xMid - medWidth / 2 - laneWidth - paintWidth;
			x >=
			xMid -
				medWidth / 2 -
				(laneWidth + paintWidth) * opts.y.leftTurns -
				paintWidth;
			x -= laneWidth + paintWidth
		) {
			c.fillRect(x, 0, paintWidth, yMid - yStop);
		}
		*/

		// draw lane markings
		c.fillStyle = "white";
		for (
			let y = yMid - xWidth / 2 - xRWidth - laneWidth - paintGap - paintHeight;
			y + paintHeight > 0;
			y -= paintHeight + paintGap
		) {
			for (
				let x = xMid - xLWidth / 2;
				x > xMid - yWidth / 2 + bikeWidth + paintWidth;
				x -= paintWidth + laneWidth
			) {
				c.fillRect(x, y, paintWidth, paintHeight);
			}
			continue;
			for (
				let x = xMid + medWidth / 2 + laneWidth;
				x < xMid + yWidth / 2;
				x += laneWidth + paintWidth
			) {
				c.fillRect(x, y, paintWidth, paintHeight);
			}
		}

		return;

		for (
			let x = xMid + yWidth / 2 + laneWidth + paintGap;
			x - paintHeight < width;
			x += paintHeight + paintGap
		) {
			for (
				let y = yMid - medWidth / 2 - laneWidth - paintWidth;
				y > yMid - xWidth / 2;
				y -= laneWidth + paintWidth
			) {
				c.fillRect(x, y, paintHeight, paintWidth);
			}
			for (
				let y = yMid + medWidth / 2 + laneWidth;
				y < yMid + xWidth / 2;
				y += laneWidth + paintWidth
			) {
				c.fillRect(x, y, paintHeight, paintWidth);
			}
		}

		for (
			let y = yMid + xWidth / 2 + laneWidth + paintGap;
			y - paintHeight < height;
			y += paintHeight + paintGap
		) {
			for (
				let x = xMid - medWidth / 2 - laneWidth - paintWidth;
				x > xMid - yWidth / 2;
				x -= paintWidth + laneWidth
			) {
				c.fillRect(x, y, paintWidth, paintHeight);
			}
			for (
				let x = xMid + medWidth / 2 + laneWidth;
				x < xMid + yWidth / 2;
				x += laneWidth + paintWidth
			) {
				c.fillRect(x, y, paintWidth, paintHeight);
			}
		}

		for (
			let x = xMid - yWidth / 2 - laneWidth - paintGap - paintHeight;
			x + paintHeight > 0;
			x -= paintHeight + paintGap
		) {
			for (
				let y = yMid - medWidth / 2 - laneWidth - paintWidth;
				y > yMid - xWidth / 2;
				y -= laneWidth + paintWidth
			) {
				c.fillRect(x, y, paintHeight, paintWidth);
			}
			for (
				let y = yMid + medWidth / 2 + laneWidth;
				y < yMid + xWidth / 2;
				y += laneWidth + paintWidth
			) {
				c.fillRect(x, y, paintHeight, paintWidth);
			}
		}

		// draw bike lanes
		if (opts.x.bike) {
			c.fillStyle = "white";
			c.fillRect(
				0,
				yMid - xWidth / 2 + bikeWidth,
				xMid - yWidth / 2 - laneWidth,
				paintWidth
			);
			c.fillRect(
				0,
				yMid + xWidth / 2 - bikeWidth - paintWidth,
				xMid - xStop,
				paintWidth
			);
			c.fillRect(
				xMid + xStop,
				yMid - xWidth / 2 + bikeWidth,
				xMid - xStop,
				paintWidth
			);
			c.fillRect(
				xMid + yWidth / 2 + laneWidth,
				yMid + xWidth / 2 - bikeWidth - paintWidth,
				xMid - yWidth / 2 - laneWidth,
				paintWidth
			);

			c.fillStyle = "green";
			c.fillRect(
				0,
				yMid - xWidth / 2,
				xMid - yWidth / 2 - laneWidth,
				bikeWidth
			);
			c.fillRect(0, yMid + xWidth / 2 - bikeWidth, xMid - xStop, bikeWidth);
			c.fillRect(xMid + xStop, yMid - xWidth / 2, xMid - xStop, bikeWidth);
			c.fillRect(
				xMid + yWidth / 2 + laneWidth,
				yMid + xWidth / 2 - bikeWidth,
				xMid - yWidth / 2 - laneWidth,
				bikeWidth
			);
		}
		if (opts.y.bike) {
			c.fillStyle = "white";
			c.fillRect(xMid - yWidth / 2 + bikeWidth, 0, paintWidth, yMid - yStop);
			c.fillRect(
				xMid + yWidth / 2 - bikeWidth - paintWidth,
				0,
				paintWidth,
				yMid - xWidth / 2 - laneWidth
			);
			c.fillRect(
				xMid - yWidth / 2 + bikeWidth,
				yMid + xWidth / 2 + laneWidth,
				paintWidth,
				yMid - xWidth / 2 - laneWidth
			);
			c.fillRect(
				xMid + yWidth / 2 - bikeWidth - paintWidth,
				yMid + yStop,
				paintWidth,
				yMid - xWidth / 2 - laneWidth
			);

			c.fillStyle = "green";
			c.fillRect(xMid - yWidth / 2, 0, bikeWidth, yMid - yStop);
			c.fillRect(
				xMid + yWidth / 2 - bikeWidth,
				0,
				bikeWidth,
				yMid - xWidth / 2 - laneWidth
			);
			c.fillRect(
				xMid - yWidth / 2,
				yMid + xWidth / 2 + laneWidth,
				bikeWidth,
				yMid - xWidth / 2 - laneWidth
			);
			c.fillRect(
				xMid + yWidth / 2 - bikeWidth,
				yMid + yStop,
				bikeWidth,
				yMid - xWidth / 2 - laneWidth
			);
		}

		// draw sidewalks
		c.fillStyle = "salmon";
		c.fillRect(
			0,
			yMid - xWidth / 2 - laneWidth,
			xMid - yWidth / 2 - laneWidth,
			laneWidth
		);
		c.beginPath();
		c.arc(
			xMid - yWidth / 2 - laneWidth,
			yMid - xWidth / 2 - laneWidth,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.fillRect(
			xMid - yWidth / 2 - laneWidth,
			0,
			laneWidth,
			yMid - xWidth / 2 - laneWidth
		);

		c.fillRect(xMid + yWidth / 2, 0, laneWidth, yMid - xWidth / 2 - laneWidth);
		c.beginPath();
		c.arc(
			xMid + yWidth / 2 + laneWidth,
			yMid - xWidth / 2 - laneWidth,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.fillRect(
			xMid + yWidth / 2 + laneWidth,
			yMid - xWidth / 2 - laneWidth,
			xMid - yWidth / 2 - laneWidth,
			laneWidth
		);

		c.fillRect(
			xMid + yWidth / 2 + laneWidth,
			yMid + xWidth / 2,
			xMid - yWidth / 2 - laneWidth,
			laneWidth
		);
		c.beginPath();
		c.arc(
			xMid + yWidth / 2 + laneWidth,
			yMid + xWidth / 2 + laneWidth,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.fillRect(
			xMid + yWidth / 2,
			yMid + xWidth / 2 + laneWidth,
			laneWidth,
			yMid - xWidth / 2 - laneWidth
		);

		c.fillRect(
			xMid - yWidth / 2 - laneWidth,
			yMid + xWidth / 2 + laneWidth,
			laneWidth,
			yMid - xWidth / 2 - laneWidth
		);
		c.beginPath();
		c.arc(
			xMid - yWidth / 2 - laneWidth,
			yMid + xWidth / 2 + laneWidth,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.fillRect(0, yMid + xWidth / 2, xMid - yWidth / 2 - laneWidth, laneWidth);

		// draw medians
		if (opts.x.median) {
			c.fillStyle = "salmon";
			c.fillRect(
				0,
				yMid - medWidth / 2,
				xMid -
					yWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				medWidth
			);
			c.fillRect(
				xMid +
					yWidth / 2 +
					laneWidth +
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				yMid - medWidth / 2,
				xMid -
					yWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				medWidth
			);
		} else {
			c.fillStyle = "yellow";
			c.fillRect(
				0,
				yMid - medWidth / 2,
				xMid -
					yWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				paintWidth
			);
			c.fillRect(
				0,
				yMid + medWidth / 2 - paintWidth,
				xMid -
					yWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				paintWidth
			);
			c.fillRect(
				xMid +
					yWidth / 2 +
					laneWidth +
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				yMid - medWidth / 2,
				xMid -
					yWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				paintWidth
			);
			c.fillRect(
				xMid +
					yWidth / 2 +
					laneWidth +
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				yMid + medWidth / 2 - paintWidth,
				xMid -
					yWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				paintWidth
			);
		}
		if (opts.y.median) {
			c.fillStyle = "salmon";
			c.fillRect(
				xMid - medWidth / 2,
				0,
				medWidth,
				yMid -
					xWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0)
			);
			c.fillRect(
				xMid - medWidth / 2,
				yMid +
					xWidth / 2 +
					laneWidth +
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				medWidth,
				yMid -
					xWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0)
			);
		} else {
			c.fillStyle = "yellow";
			c.fillRect(
				xMid - medWidth / 2,
				0,
				paintWidth,
				yMid -
					xWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0)
			);
			c.fillRect(
				xMid + medWidth / 2 - paintWidth,
				0,
				paintWidth,
				yMid -
					xWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0)
			);
			c.fillRect(
				xMid - medWidth / 2,
				yMid +
					xWidth / 2 +
					laneWidth +
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				paintWidth,
				yMid -
					xWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0)
			);
			c.fillRect(
				xMid + medWidth / 2 - paintWidth,
				yMid +
					xWidth / 2 +
					laneWidth +
					(opts.crosswalks ? (3 / 8) * laneWidth : 0),
				paintWidth,
				yMid -
					xWidth / 2 -
					laneWidth -
					(opts.crosswalks ? (3 / 8) * laneWidth : 0)
			);
		}

		c.fillStyle = "darkgreen";
		c.beginPath();
		c.arc(
			xMid - yWidth / 2 - laneWidth * 2,
			yMid - xWidth / 2 - laneWidth * 2,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.beginPath();
		c.arc(
			xMid + yWidth / 2 + laneWidth * 2,
			yMid - xWidth / 2 - laneWidth * 2,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.beginPath();
		c.arc(
			xMid + yWidth / 2 + laneWidth * 2,
			yMid + xWidth / 2 + laneWidth * 2,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();
		c.beginPath();
		c.arc(
			xMid - yWidth / 2 - laneWidth * 2,
			yMid + xWidth / 2 + laneWidth * 2,
			laneWidth,
			0,
			2 * Math.PI
		);
		c.fill();

		c.font = "16px Inter";
		c.fillStyle = "white";
		c.textAlign = "center";
		c.fillText("scroll to zoom", xMid, height - 10);
	}

	return (
		<div className="traffic">
			<main id="main-container">
				<TrafficControls drawIntersection={drawIntersection} />
				<canvas></canvas>
			</main>
			<footer>
				<h3>
					Site by{" "}
					<a href="/" rel="noopener noreferrer" target="_blank">
						Sean Eddy
					</a>
				</h3>
			</footer>
		</div>
	);
}
