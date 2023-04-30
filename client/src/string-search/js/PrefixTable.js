import React from "react";
import "../css/PrefixTable.css";

export default function PrefixTable({ prefixTable, string }) {
	return (
		<div className="table">
			<div className="table-container">
				<table>
					<thead>
						<tr>
							{string.split("").map((char) => (
								<th>{char}</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{Array.from(Array(prefixTable.length).keys()).map((i) => (
								<td className={`string-${i}`}>{prefixTable[i]}</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
