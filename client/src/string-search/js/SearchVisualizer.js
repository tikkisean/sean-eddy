import { React, useEffect, useState } from "react";
import PrefixTable from "./PrefixTable";
import "../css/SearchVisualizer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function SearchVisualizer({
	algo,
	sequence,
	string,
	showTable = true,
}) {
	const [id] = useState(Math.random().toString().slice(2));
	const [index, setIndex] = useState(-1);
	const [isSearchDone, setIsSearchDone] = useState(true);
	const [isSearching, setIsSearching] = useState(false);
	const [match, setMatch] = useState(false);
	const [offset, setOffset] = useState(0);
	const [prefixTable, setPrefixTable] = useState();
	const [timeoutId, setTimeoutId] = useState();

	function handleSearch() {
		if (isSearching) {
			// handle pause
			clearTimeout(timeoutId);
			setIsSearching(false);
			return;
		}
		if (isSearchDone) {
			// reset variables to starting state
			setIndex(algo === "Boyer-Moore" ? string.length - 1 : 0);
			setOffset(0);
			setIsSearchDone(false);
		}
		if (algo === "KMP") {
			// build KMP prefix table
			setPrefixTable(buildPrefixTable());
		}
		setIsSearching(true);
	}

	function buildPrefixTable() {
		// builds a table where each index is an index in the string and each value is the length
		// of the longest prefix which is also a suffix in the substring from i = 0 -> i
		const prefixTable = new Array(string.length);
		prefixTable[0] = 0;
		let i = 1;
		let len = 0;
		while (i < string.length) {
			if (string[i] === string[len]) {
				len++;
				prefixTable[i] = len;
				i++;
			} else {
				if (len === 0) {
					prefixTable[i] = 0;
					i++;
				} else {
					len = prefixTable[len - 1];
				}
			}
		}
		return prefixTable;
	}

	useEffect(() => {
		if (!isSearching) return;
		if (
			algo === "Boyer-Moore"
				? offset + string.length > sequence.length
				: offset + index === sequence.length
		) {
			// no match found, reset variables
			setIndex(algo === "Boyer-Moore" ? string.length - 1 : 0);
			setOffset(0);
			setIsSearchDone(true);
			setIsSearching(false);
			return;
		}
		setMatch(sequence[offset + index] === string[index]);
		setTimeoutId(
			setTimeout(() => {
				if (sequence[offset + index] === string[index]) {
					// characters match
					if (
						algo === "Boyer-Moore" ? index === 0 : index === string.length - 1
					) {
						// string found
						setIsSearchDone(true);
						setIsSearching(false);
						return;
					} else {
						// continue search at next index
						setIndex(index + (algo === "Boyer-Moore" ? -1 : 1));
					}
				} else {
					// mismatch
					if (algo === "naive") {
						// backtrack string, continue search at next index
						setIndex(0);
						setOffset(offset + 1);
					} else if (algo === "KMP") {
						// if mismatch at first char, next search must start at first char
						// else, next search starts at longest prefix which is also suffix
						// in substring preceding mismatch determined by prefix table
						const newIndex = index === 0 ? 0 : prefixTable[index - 1];
						setIndex(newIndex);
						// shift string by difference of index and new index, except when
						// index = 0, as algorithm must always move forward by at least 1
						setOffset(offset + index - (index === 0 ? -1 : newIndex));
					} else if (algo === "Boyer-Moore") {
						setIndex(string.length - 1);
						setOffset(
							offset + Math.max(...[getBadCharShift(), getGoodSuffixShift()])
						);
					}
				}
			}, 500)
		);
	}, [index, isSearching, offset]);

	function getBadCharShift() {
		// returns the shift determined by the bad character rule of the Boyer-Moore algorithm
		// for simplicity, this implementation calculates the shift each time a mismatch occurs
		// rather than using a preprocessed lookup table
		const badChar = sequence[offset + index];
		for (let i = index; i >= 0; i--) {
			if (string[i] === badChar) {
				return index - i;
			}
		}
		return index + 1;
	}

	function getGoodSuffixShift() {
		// returns the shift determined by the good suffix rule of the Boyer-Moore algorithm
		// for simplicity, this implementation calculates the shift each time a mismatch occurs
		// rather than using a preprocessed lookup table
		if (index === string.length - 1) {
			return 1;
		}
		const seq = sequence.slice(offset + index + 1, offset + string.length);
		let stringIndex = index - 1;
		while (stringIndex + seq.length - 1 >= 0) {
			for (
				let tmpStringIndex = stringIndex, seqIndex = 0;
				seqIndex < seq.length;
				tmpStringIndex++, seqIndex++
			) {
				if (tmpStringIndex < 0) {
					continue;
				} else if (string[tmpStringIndex] != seq[seqIndex]) {
					break;
				} else if (seqIndex === seq.length - 1) {
					return index - stringIndex + 1;
				}
			}
			stringIndex--;
		}
		return index + 1;
	}

	return (
		<div
			className="search-visualizer-container"
			id={`search-visualizer-container-${id}`}
		>
			<div className="search-visualizer">
				{index !== -1 && (
					<style>
						{`${(algo === "Boyer-Moore"
							? Array.from(
									new Array(string.length - index),
									(x, i) => i + index
							  )
							: Array.from(new Array(index + 1).keys())
						).map(
							(i) =>
								`.a {}
							
							#search-visualizer-container-${id} .search-visualizer [class="sequence-${
									offset + i
								}"],
							#search-visualizer-container-${id} .search-visualizer [class="string-${i}"] {
								background-color: ${match ? "green" : "red"};
								${
									i === (algo === "Boyer-Moore" ? index : 0)
										? "border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem;"
										: ""
								}
								${
									i === (algo === "Boyer-Moore" ? string.length - 1 : index)
										? "border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem;"
										: ""
								}
								font-size: ${window.matchMedia("(min-width: 481px)").matches ? "2" : "1"}.25rem;
							}`
						)}

						#search-visualizer-container-${id} .search-visualizer .string {
							left: calc(((${
								document.getElementById(`sequence-${id}`).offsetWidth
							}px - 0.8rem) * ${offset} / ${sequence.length}));
							position: relative;
						}

						${
							!match &&
							index > 0 &&
							`#search-visualizer-container-${id} .prefix-table [class="string-${
								index - 1
							}"] {
								background-color: red;
							}`
						}
					`}
					</style>
				)}
				<div className="visualizer-container">
					{window.matchMedia("(min-width: 481px)").matches && (
						<div className="label-container">
							<div className="label">Sequence</div>
							<div className="label">Gene</div>
						</div>
					)}
					{window.matchMedia("(min-width: 481px)").matches && (
						<div className="vertical"></div>
					)}
					<div className="formatted-text-container">
						<code className={`formatted-text sequence`} id={`sequence-${id}`}>
							{sequence.split("").map((char, i) => (
								<span className={`sequence-${i}`} key={i}>
									{char}
								</span>
							))}
						</code>
						<code className="formatted-text string">
							{string.split("").map((char, i) => (
								<span className={`string-${i}`} key={i}>
									{char}
								</span>
							))}
						</code>
					</div>
					<div className="control-container">
						<FontAwesomeIcon
							icon={isSearching ? faPause : faPlay}
							onClick={handleSearch}
							style={{
								background: isSearching ? "red" : "green",
							}}
						/>
					</div>
				</div>
			</div>
			{showTable && prefixTable && (
				<PrefixTable prefixTable={prefixTable} string={string} />
			)}
		</div>
	);
}
