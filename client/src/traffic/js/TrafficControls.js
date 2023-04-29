import { React, useEffect, useState } from "react";
import "../css/TrafficControls.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faCar,
	faRoad,
	faGear,
	faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";

export default function TrafficControls({ drawIntersection }) {
	const [roadsExpanded, setRoadsExpanded] = useState(false);
	const [roadDirection, setRoadDirection] = useState("x");
	const [xNumLanes, setXNumLanes] = useState(6);
	const [yNumLanes, setYNumLanes] = useState(4);
	const [xLeftTurns, setXLeftTurns] = useState(1);
	const [yLeftTurns, setYLeftTurns] = useState(0);
	const [xRightTurns, setXRightTurns] = useState(1);
	const [yRightTurns, setYRightTurns] = useState(0);
	const [xBike, setXBike] = useState(false);
	const [yBike, setYBike] = useState(true);
	const [xMedian, setXMedian] = useState(true);
	const [yMedian, setYMedian] = useState(false);
	const [vehiclesExpanded, setVehiclesExpanded] = useState(false);
	const [intersectionExpanded, setIntersectionExpanded] = useState(false);
	const [crosswalks, setCrosswalks] = useState(true);
	const [settingsExpanded, setSettingsExpanded] = useState(false);

	useEffect(() => {
		const opts = { x: {}, y: {} };
		opts.x.numLanes = xNumLanes;
		opts.x.leftTurns = xLeftTurns;
		opts.x.rightTurns = xRightTurns;
		opts.x.bike = xBike;
		opts.x.median = xMedian;
		opts.y.numLanes = yNumLanes;
		opts.y.leftTurns = yLeftTurns;
		opts.y.rightTurns = yRightTurns;
		opts.y.bike = yBike;
		opts.y.median = yMedian;
		opts.crosswalks = crosswalks;
		drawIntersection(opts);
	});

	return (
		<div className="traffic-controls">
			<h1>Traffic Simulation</h1>
			<div className="traffic-control">
				<div
					className="title-bar"
					onClick={() => setRoadsExpanded(!roadsExpanded)}
				>
					<div>
						<FontAwesomeIcon icon={faRoad} size={"2x"} inverse />
						<h2>Roads</h2>
					</div>
					<FontAwesomeIcon
						icon={faAngleDown}
						size={"2x"}
						style={{
							transform: roadsExpanded ? "rotate(180deg)" : "rotate(0)",
						}}
						inverse
					/>
				</div>
				{roadsExpanded && (
					<div>
						<hr></hr>
						<div className="input-row-container">
							<div className="input-row">
								<label htmlFor="road-direction">Road direction</label>
								<FontAwesomeIcon
									icon={faRoad}
									onClick={() =>
										setRoadDirection(roadDirection === "x" ? "y" : "x")
									}
									size={"lg"}
									style={{
										transform:
											roadDirection === "x" ? "rotate(90deg)" : "rotate(0)",
									}}
									inverse
								/>
							</div>
							<div className="input-row">
								<label htmlFor="num-lanes">Travel lanes</label>
								<select
									id="num-lanes"
									name="num-lanes"
									onChange={(e) =>
										roadDirection === "x"
											? setXNumLanes(parseInt(e.target.value))
											: setYNumLanes(parseInt(e.target.value))
									}
									value={roadDirection === "x" ? xNumLanes : yNumLanes}
								>
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							<div className="input-row">
								<label htmlFor="left-turns">Left turn lanes</label>
								<select
									id="left-turns"
									name="left-turns"
									onChange={(e) =>
										roadDirection === "x"
											? setXLeftTurns(parseInt(e.target.value))
											: setYLeftTurns(parseInt(e.target.value))
									}
									value={roadDirection === "x" ? xLeftTurns : yLeftTurns}
								>
									{Array.from(
										Array(
											(roadDirection === "x"
												? yNumLanes / 2 - xRightTurns
												: xNumLanes / 2 - yRightTurns) + 1
										).keys()
									).map((i) => (
										<option value={`${i}`}>{i}</option>
									))}
								</select>
							</div>
							<div className="input-row">
								<label htmlFor="right-turns">Right turn lanes</label>
								<select
									id="right-turns"
									name="right-turns"
									onChange={(e) =>
										roadDirection === "x"
											? setXRightTurns(parseInt(e.target.value))
											: setYRightTurns(parseInt(e.target.value))
									}
									value={roadDirection === "x" ? xRightTurns : yRightTurns}
								>
									{Array.from(
										Array(
											(roadDirection === "x"
												? yNumLanes / 2 - xLeftTurns
												: xNumLanes / 2 - yLeftTurns) + 1
										).keys()
									).map((i) => (
										<option value={`${i}`}>{i}</option>
									))}
								</select>
							</div>
							<div className="input-row">
								<label htmlFor="bike">Bike lane</label>
								<input
									checked={roadDirection === "x" ? xBike : yBike}
									id="bike"
									name="bike"
									onChange={(e) =>
										roadDirection === "x" ? setXBike(!xBike) : setYBike(!yBike)
									}
									type="checkbox"
								></input>
							</div>
							<div className="input-row">
								<label htmlFor="median">Median</label>
								<input
									checked={roadDirection === "x" ? xMedian : yMedian}
									id="median"
									name="median"
									onChange={(e) =>
										roadDirection === "x"
											? setXMedian(!xMedian)
											: setYMedian(!yMedian)
									}
									type="checkbox"
								></input>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="traffic-control">
				<div
					className="title-bar"
					onClick={() => setVehiclesExpanded(!vehiclesExpanded)}
				>
					<div>
						<FontAwesomeIcon icon={faCar} size={"2x"} inverse />
						<h2>Vehicles</h2>
					</div>
					<FontAwesomeIcon
						icon={faAngleDown}
						size={"2x"}
						style={{
							transform: vehiclesExpanded ? "rotate(180deg)" : "rotate(0)",
						}}
						inverse
					/>
				</div>
			</div>
			<div className="traffic-control">
				<div
					className="title-bar"
					onClick={() => setIntersectionExpanded(!intersectionExpanded)}
				>
					<div>
						<FontAwesomeIcon icon={faTrafficLight} size={"2x"} inverse />
						<h2>Intersection</h2>
					</div>
					<FontAwesomeIcon
						icon={faAngleDown}
						size={"2x"}
						style={{
							transform: intersectionExpanded ? "rotate(180deg)" : "rotate(0)",
						}}
						inverse
					/>
				</div>
				{intersectionExpanded && (
					<div>
						<hr></hr>
						<div className="input-row-container">
							<div className="input-row">
								<label htmlFor="crosswalks">Crosswalks</label>
								<input
									checked={crosswalks}
									id="crosswalks"
									name="median"
									onChange={(e) => setCrosswalks(!crosswalks)}
									type="checkbox"
								></input>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="traffic-control">
				<div
					className="title-bar"
					onClick={() => setSettingsExpanded(!settingsExpanded)}
				>
					<div>
						<FontAwesomeIcon icon={faGear} size={"2x"} inverse />
						<h2>Settings</h2>
					</div>
					<FontAwesomeIcon
						icon={faAngleDown}
						size={"2x"}
						style={{
							transform: settingsExpanded ? "rotate(180deg)" : "rotate(0)",
						}}
						inverse
					/>
				</div>
			</div>
		</div>
	);
}
