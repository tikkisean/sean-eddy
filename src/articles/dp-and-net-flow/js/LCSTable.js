import { useEffect, useState } from "react";
import "../css/LCSTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function LCSTable({ m, n }) {
	const [lens, setLens] = useState(
		Array.from(Array(n.length + 1), () => new Array(m.length + 1))
	);
	const [traces, setTraces] = useState(
		Array.from(Array(n.length), () => new Array(m.length))
	);
	const [lcs, setLcs] = useState("");

	function resetTable() {
		const lensCopy = [...lens];
		for (let i = 0; i <= n.length; i++) {
			for (let j = 0; j <= m.length; j++) {
				if (i === 0 || j === 0) {
					lensCopy[i][j] = 0;
				} else {
					lensCopy[i][j] = "";
				}
			}
		}
		setLens(lensCopy);
		setLcs("");
		setI(1);
		setJ(1);
	}

	useEffect(() => {
		setTimeout(() => resetTable(), 0);
	}, []);

	const [traceLoaded, setTraceLoaded] = useState(false);
	const [updateTrace, setUpdateTrace] = useState(false);
	const [traceI, setTraceI] = useState(-1);
	const [traceJ, setTraceJ] = useState(-1);

	function trace() {
		if (!traceLoaded) {
			setTraceLoaded(true);
			return;
		}
		setTimeout(() => {
			console.log(`${traceI} ${traceJ}`);
			let traceICopy = traceI;
			let traceJCopy = traceJ;
			if (traces[traceI][traceJ] === "↖") {
				setLcs(`${n[traceI]}${lcs}`);
				traceICopy--;
				traceJCopy--;
			} else if (traces[traceI][traceJ] === "↑") {
				traceICopy--;
			} else {
				traceJCopy--;
			}
			if (traceICopy >= 0 && traceJCopy >= 0) {
				setTraceI(traceICopy);
				setTraceJ(traceJCopy);
				setUpdateTrace(!updateTrace);
			} else {
				setTraceI(-1);
				setTraceJ(-1);
				setIsRunning(false);
			}
		}, 250);
	}
	useEffect(trace, [updateTrace]);

	const [iterateLoaded, setIterateLoaded] = useState(false);
	const [i, setI] = useState(1);
	const [j, setJ] = useState(1);
	useEffect(iterate, [j]);

	function iterate() {
		if (!iterateLoaded) {
			setIterateLoaded(true);
			return;
		}
		setTimeout(() => {
			const lensCopy = [...lens];
			const tracesCopy = [...traces];
			if (n[i - 1] === m[j - 1]) {
				lensCopy[i][j] = lens[i - 1][j - 1] + 1;
				traces[i - 1][j - 1] = "↖";
			} else if (lens[i - 1][j] >= lens[i][j - 1]) {
				lensCopy[i][j] = lens[i - 1][j];
				traces[i - 1][j - 1] = "↑";
			} else {
				lensCopy[i][j] = lens[i][j - 1];
				traces[i - 1][j - 1] = "←";
			}
			setLens(lensCopy);
			setTraces(tracesCopy);
			if (i === n.length && j === m.length) {
				setTraceI(i - 1);
				setTraceJ(j - 1);
				setUpdateTrace(!updateTrace);
				return;
			}
			setI(j >= m.length ? i + 1 : i);
			setJ(j >= m.length ? 1 : j + 1);
		}, 0);
	}

	const [isRunning, setIsRunning] = useState(false);

	function handleClick() {
		setIsRunning(true);
		if (i === n.length && j === m.length) {
			resetTable();
		} else {
			iterate();
		}
	}

	return (
		<div className="table">
			<div className="table-container">
				<div>
					<span>{lcs}</span>
					<FontAwesomeIcon
						icon={faPlay}
						onClick={handleClick}
						style={{
							cursor: isRunning ? "auto" : "pointer",
							pointerEvents: isRunning ? "none" : "auto",
						}}
					/>
				</div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th></th>
							{m.split("").map((char, j) => (
								<th key={`cost-table--1-${j}`}>{char}</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<th></th>
							<td>{lens[0][0]}</td>
							{m.split("").map((char, j) => (
								<td key={`cost-table-0-${j + 1}`}>{lens[0][j + 1]}</td>
							))}
						</tr>
						{n.split("").map((char, i) => (
							<tr key={`cost-table-${i + 1}`}>
								<th>{char}</th>
								<td>{lens[i + 1][0]}</td>
								{m.split("").map((char, j) => (
									<td
										key={`cost-table-${i + 1}-${j + 1}`}
										style={{
											backgroundColor:
												i === traceI && j === traceJ
													? "rgba(255, 255, 0, 0.6)"
													: traceI > 0 &&
													  traceJ > 0 &&
													  traces[traceI][traceJ] === "↖" &&
													  ((i === traceI && j < traceJ) ||
															(i < traceI && j === traceJ))
													? "rgba(255, 255, 0, 0.2)"
													: "",
										}}
									>
										{lens[i + 1][j + 1]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
