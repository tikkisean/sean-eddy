import { useEffect, useState } from "react";
import LCSTable from "./LCSTable";
import "../css/DPNetworkFlow.css";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function DPNetworkFlow() {
	document.title = "DP and Network Flow";

	const width = window.innerWidth <= 480 ? 300 : 600;
	const height = window.innerWidth <= 480 ? 300 : 600;

	function displayGraph(id, graph) {
		const curSVG = document.querySelector(`#${id} svg`);
		if (curSVG) {
			document.querySelector(`#${id} svg`).remove();
		}
		const svg = d3
			.select(`#${id}`)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g");
		const link = svg
			.selectAll(".link")
			.data(graph.links)
			.enter()
			.append("g")
			.attr("class", "link")
			.append("line")
			.style("stroke", (d) => (d.bfs ? "yellow" : "black"))
			.style("stroke-width", 2)
			.style("stroke-dasharray", (d) =>
				graph.nodes.length > 10 ? (d.cap ? "" : "5, 10") : ""
			)
			.style("transition", "opacity 1s");
		const node = svg
			.selectAll("circle")
			.data(graph.nodes)
			.join("circle")
			.attr("r", window.innerWidth <= 480 ? 15 : 20)
			.style("fill", "white")
			.style("transition", "opacity 1s");
		d3.forceSimulation(graph.nodes)
			.force(
				"link",
				d3
					.forceLink()
					.id((d) => d.id)
					.links(graph.links)
			)
			.on("tick", () => {
				link
					.attr("x1", (d) => d.source.x)
					.attr("y1", (d) => d.source.y)
					.attr("x2", (d) => d.target.x)
					.attr("y2", (d) => d.target.y);
				node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
			});
	}

	function buildGraph() {
		return {
			nodes: [...Array(5).keys()]
				.map((i) => {
					return {
						fx: width * 0.35,
						fy: height / 20 + (height * 0.9 * i) / 4,
						id: i,
					};
				})
				.concat(
					[...Array(5).keys()].map((i) => {
						return {
							fx: width * 0.65,
							fy: height / 20 + (height * 0.9 * i) / 4,
							id: i + 5,
						};
					})
				),
			links: [
				{ source: 0, target: 6, cap: 0 },
				{ source: 0, target: 7, cap: 0 },
				{ source: 1, target: 6, cap: 0 },
				{ source: 1, target: 7, cap: 0 },
				{ source: 1, target: 8, cap: 0 },
				{ source: 2, target: 5, cap: 0 },
				{ source: 2, target: 6, cap: 0 },
				{ source: 2, target: 7, cap: 0 },
				{ source: 2, target: 9, cap: 0 },
				{ source: 3, target: 7, cap: 0 },
				{ source: 4, target: 7, cap: 0 },
				{ source: 4, target: 8, cap: 0 },
				{ source: 4, target: 9, cap: 0 },
			],
		};
	}

	function buildGraphSourceSink() {
		const nodes = [...Array(5).keys()]
			.map((i) => {
				return {
					fx: width * 0.35,
					fy: height / 20 + (height * 0.9 * i) / 4,
					id: i,
				};
			})
			.concat(
				[...Array(5).keys()].map((i) => {
					return {
						fx: width * 0.65,
						fy: height / 20 + (height * 0.9 * i) / 4,
						id: i + 5,
					};
				})
			)
			.concat([
				{ fx: width * 0.05, fy: height / 2, id: 10 },
				{ fx: width * 0.95, fy: height / 2, id: 11 },
			]);

		const links = [
			{ source: 0, target: 6 },
			{ source: 0, target: 7 },
			{ source: 1, target: 6 },
			{ source: 1, target: 7 },
			{ source: 1, target: 8 },
			{ source: 2, target: 5 },
			{ source: 2, target: 6 },
			{ source: 2, target: 7 },
			{ source: 2, target: 9 },
			{ source: 3, target: 7 },
			{ source: 4, target: 7 },
			{ source: 4, target: 8 },
			{ source: 4, target: 9 },
		]
			.concat(
				[...Array(5).keys()].map((i) => {
					return { source: 10, target: i };
				})
			)
			.concat(
				[...Array(5).keys()].map((i) => {
					return { source: i + 5, target: 11 };
				})
			);
		for (const link of links) {
			link.bfs = false;
			link.cap = 0;
			link.maxCap = 1;
		}
		const residualLinks = [];
		for (const link of links) {
			if (link.maxCap === 1) {
				residualLinks.push({
					source: link.target,
					target: link.source,
					cap: 0,
					maxCap: 0,
					residual: link,
				});
				link.residual = residualLinks[residualLinks.length - 1];
			}
		}

		return {
			nodes: nodes,
			links: links.concat(residualLinks),
		};
	}

	const [graph, setGraph] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			displayGraph("graph", buildGraph());
			displayGraph("graph-max-flow", buildGraphSourceSink());
			const graph = buildGraphSourceSink();
			displayGraph("graph-max-flow-viz", graph);
			setGraph(graph);
		}, 0);
	}, []);

	function BFSStep(links, i, queue) {
		if (i === links.length) {
			if (queue.length) {
				const v = queue.shift();
				BFSStep(
					graph.links.filter((link) => link.source.id === v.id),
					0,
					queue
				);
			} else {
				fordFulkersonStep(false);
			}
		} else {
			const link = links[i];
			if (!link.target.visited && link.maxCap - link.cap > 0) {
				link.bfs = true;
				setTimeout(() => {
					displayGraph("graph-max-flow-viz", graph);
				}, 0);
				queue.push(link.target);
				link.target.visited = true;
				link.target.parentLink = link;
				if (link.target === graph.nodes[graph.nodes.length - 1]) {
					fordFulkersonStep(true);
				} else {
					setTimeout(() => {
						BFSStep(links, i + 1, queue);
					}, 250);
				}
			} else {
				BFSStep(links, i + 1, queue);
			}
		}
	}

	function BFS() {
		const queue = [];
		for (const v of graph.nodes) {
			v.visited = false;
		}
		graph.nodes[graph.nodes.length - 2].visited = true;
		queue.push(graph.nodes[graph.nodes.length - 2]);
		if (queue.length) {
			const v = queue.shift();
			BFSStep(
				graph.links.filter((link) => link.source.id === v.id),
				0,
				queue
			);
		}
	}

	function fordFulkersonStep(BFSBool) {
		for (const link of graph.links) {
			link.bfs = false;
		}
		if (BFSBool) {
			let v = graph.nodes[graph.nodes.length - 1],
				links = [],
				caps = [];
			while (v !== graph.nodes[graph.nodes.length - 2]) {
				links.push(v.parentLink);
				caps.push(v.parentLink.maxCap - v.parentLink.cap);
				v = v.parentLink.source;
			}
			const bottleneck = Math.min(...caps);
			for (const link of links) {
				link.cap += bottleneck;
				link.residual.cap -= bottleneck;
			}
			displayGraph("graph-max-flow-viz", graph);
			setTimeout(() => {
				BFS();
			}, 500);
		} else {
			d3.selectAll("#graph-max-flow-viz svg circle").style("opacity", (node) =>
				node.id > 9 ? 0 : 1
			);
			d3.selectAll("#graph-max-flow-viz svg line").style("opacity", (link) =>
				link.source.id < graph.nodes[graph.nodes.length - 2].id &&
				link.cap === 1 &&
				link.maxCap &&
				link.target.id < graph.nodes[graph.nodes.length - 2].id
					? 1
					: 0
			);
			const matches = [];
			for (const link of graph.links) {
				if (
					link.source.id < graph.nodes[graph.nodes.length - 2].id &&
					link.cap === 1 &&
					link.maxCap &&
					link.target.id < graph.nodes[graph.nodes.length - 2].id
				) {
					matches.push([link.source.id, link.target.id]);
				}
			}
			setIsRunning(false);
		}
	}

	function handleClick() {
		setIsRunning(true);
		const graph = buildGraphSourceSink();
		displayGraph("graph-max-flow-viz", buildGraphSourceSink());
		setGraph(graph);
		setTimeout(() => {
			BFS();
			displayGraph("graph-max-flow-viz", graph);
		}, 0);
	}

	const [isRunning, setIsRunning] = useState(false);

	return (
		<div className="dp-and-net-flow">
			<div id="background">
				<main id="main-container">
					<div>
						<h1>Dynamic Programming and Network Flow</h1>
						<h3>analyses & visualizations</h3>
					</div>
					<hr></hr>
					<h2>Introduction</h2>
					<div className="text-box">
						<p>
							In this article, we will explore common dynamic programming and
							network flow problems. For each topic, we will first provide a
							brief overview, discuss the problem, propose an implementation,
							visualize the solution, and finally discuss time complexity.
						</p>
					</div>
					<hr></hr>
					<h2>Dynamic Programming</h2>
					<div className="text-box">
						<p>
							The first kind of algorithms we will discuss are dynamic
							programming algorithms. Dynamic programming is an algorithmic
							paradigm which breaks apart a problem into subproblems whose
							solutions depend on the solutions of previous subproblems. This
							paradigm is similar to that of recursive algorithms, however
							dynamic programming approaches seek to improve upon recursive
							algorithms by working iteratively (avoiding the stack) and storing
							the solutions to already solved subproblems to avoid repeating
							work.
						</p>
					</div>
					<h3>Longest Common Subsequence (LCS)</h3>
					<div className="text-box">
						<p>
							The problem of finding the longest common subsequence of two
							strings is an ideal application of dynamic programming. In this
							problem, we are given two strings and need to find their longest
							common subsequence, that is, the longest string whose characters
							exist and appear in the same order (need not be consecutive) in
							both strings. For example, consider the strings{" "}
							<nobr>
								<code>m</code> = <code>ACCGGTCGAGTGCGCGGAAGCCGGCCGAA</code>
							</nobr>{" "}
							and{" "}
							<nobr>
								<code>n</code> = <code>GTCGTTCGGAATGCCGTTGCTCTGTAAA</code>
							</nobr>
							. In this example, the LCS of these two strings is{" "}
							<code>GTCGTCGGAAGCCGGCCGAA</code>.
						</p>
					</div>
					<h3>Implementation</h3>
					<div className="text-box">
						<p>
							In order to solve this problem we will construct a table{" "}
							<code>c</code> of dimensions <code>(len(n)+1)*(len(m)+1)</code>{" "}
							where <code>c[i,j]</code> represents the length of the LCS between
							substrings <code>n</code> from index <code>0</code> to{" "}
							<code>i</code> and <code>m</code> from index <code>0</code> to{" "}
							<code>j</code>. The table is one larger in both dimensions than
							the lengths of the strings because of an extra row and column
							initialized with zeros; this row and column act as the "base
							cases" of the algorithm. The length at cell{" "}
							<code>c[len(i),len(j)]</code> will contain the length of the LCS
							between <code>m</code> and <code>n</code> entirely, however we
							must work from the bottom up to calculate this answer as the
							length of cells depend on the lengths of previously calculated
							cells. For any arbitrary <code>c[i,j]</code> we can define a set
							of rules to calculate its length from previous values. If{" "}
							<code>n[i-1]</code> == <code>m[j-1]</code> (-1 accounts for extra
							row/column) then we know we have found an additional shared
							character to add to the subsequence. So, we set the length of the
							LCS at <code>c[i,j]</code> to be <code>c[i-1,j-1]+1</code>, where{" "}
							<code>c[i-1,j-1]</code> is the length of the LCS up to but not
							including the current shared character. Otherwise, we set{" "}
							<code>c[i,j]</code> to be <code>max(c[i-1,j],c[i,j-1])</code>,
							essentially finding the longer LCS of two combinations of{" "}
							<code>m</code> and <code>n</code> considering if the current
							character was removed from either string.
						</p>
					</div>
					<div className="text-box">
						<p>
							With just these two conditions we can fill the table. However, all
							this table currently tells us is the length of the LCS, not the
							characters it is composed of. To find the LCS itself, we need to
							begin at the last cell and retrace our steps, iteratively
							constructing the LCS in reverse by appending common characters
							from subproblems. Below is a visualization of the algorithm on the
							original input strings <code>m</code> and <code>n</code>.
						</p>
					</div>
					<LCSTable
						m="ACCGGTCGAGTGCGCGGAAGCCGGCCGAA"
						n="GTCGTTCGGAATGCCGTTGCTCTGTAAA"
					/>
					<h3>LCS Time Complexity</h3>
					<div className="text-box">
						<p>
							The dynamic programming approach to the LCS problem is O(<i>m</i>*
							<i>n</i>) as work is dependent on the size of the table. Note that
							this is a significant improvement upon a recursive solution with
							repeated subproblems; tabulation ensures the length of the LCS
							between two substrings is never calculated twice. Below is a graph
							of execution time with randomly-generated strings of the same
							increasing length. Note the quadratic nature of the graph, with
							strings of equal length <code>m</code>=<code>n</code> and so the
							time complexity can be written as O(<i>m*m</i>) or O(
							<i>
								m<sup>2</sup>
							</i>
							).
						</p>
					</div>
					<img
						alt="LCS time complexity graph showing quadratic curve."
						src="/dp-and-net-flow/images/lcs-time.png"
					/>
					<hr></hr>
					<h2>Network Flow</h2>
					<div className="text-box">
						<p>
							The second kind of algorithms we will discuss are network flow
							algorithms. This class of algorithms deals with problems involving
							flow through networks. Imagine a network with weighted edges and a
							designated source and sink vertex. One possible network flow
							problem is to model the maximum flow of the network, that is, the
							capacity of the network as a whole. The weight of each edge
							represents the capacity of that edge, and the source and sink
							vertices the start and end points of the flow, respectively. How
							can we find the maximum capacity of the network without exceeding
							any individual edge's capacity?
						</p>
					</div>
					<h3>Maximum Bipartite Matching</h3>
					<div className="text-box">
						<p>
							One application of network flow is the maximum bipartite matching
							problem. In this problem, given a bipartite graph we must find the
							maximum matching. Remember, a bipartite graph is a graph whose
							vertices can be divided into two disjoint and independent sets,
							and a maximum matching is the largest possible matching of a
							graph, where a matching is a subset of the edges of the graph
							without common vertices. Consider the bipartite graph below of
							size <code>m=n=5</code>. Suppose there are <code>m</code> job
							applicants and <code>n</code> open positions, finding a maximum
							matching could determine which applicants are assigned which jobs
							while maximizing the total number of job assignments. Let's try to
							solve this problem with a simple greedy approach&#8212;we'll
							iterate through each of the <code>m</code> candidates and assign
							them the first of their applied jobs which is available. Starting
							with <code>m</code>=<code>0</code>, we assign them their first
							choice of <code>n</code>=<code>6</code>. Then, <code>m</code>=
							<code>1</code> is assigned their second choice of <code>n</code>=
							<code>7</code> and <code>m</code>=<code>2</code> is assigned their
							third choice of <code>n</code>=<code>9</code>. However, applicant{" "}
							<code>3</code>'s sole choice of <code>n</code>=<code>7</code> has
							already been assigned to applicant <code>1</code>, and so this
							applicant is not matched with a job. So, the greedy approach does
							not match at least one applicant; can we do better?
						</p>
					</div>
					<div id="graph"></div>
					<div className="text-box">
						<p>
							We can improve upon the greedy algorithm by finding the max flow
							of the graph. To do this, we need to first convert the graph into
							a form which can be interpreted by a max flow algorithm. Let's
							create a source and sink node, and attach them to <code>m</code>{" "}
							and <code>n</code>, respectively. We will also assign all edges a
							capacity of 1 to ensure no edge is traversed more than once in the
							max flow. Finally, we need to create residual edges&#8212;reverse
							edges of capacity 0. Residual edges allow the max flow algorithm
							discussed in the next section to take away capacity from an
							already traversed path to find a more efficient one. Below is the
							graph after this transformation.
						</p>
					</div>
					<div id="graph-max-flow"></div>
					<div className="text-box">
						<p>
							Now we are ready to run our max flow algorithm; we'll use the
							Ford-Fulkerson algorithm in this example. This algorithm finds the
							maximum flow by finding augmenting paths and augmenting the flow
							until no more paths from the source to the sink can be found. An
							augmenting path is simply a path from the source to the sink which
							traverses edges of positive remaining capacity. Each time we find
							an augmenting path we determine the bottleneck capacity of the
							path and augment the flow by this amount. We also subtract the
							bottleneck flow from residual edges to allow future paths to
							traverse these edges and "undo" the flow if a more efficient path
							is found. Ford-Fuklerson does not specify how to find augmenting
							paths, we will use a specific implementation of Ford-Fuklerson
							called Edmonds-Karp which uses a breadth first search to improve
							efficiency. Below is a visualization of the Edmonds-Karp
							algorithm.
						</p>
					</div>
					<div id="graph-max-flow-viz-container">
						<div>
							{" "}
							<FontAwesomeIcon
								icon={faPlay}
								onClick={handleClick}
								style={{
									cursor: isRunning ? "auto" : "pointer",
									pointerEvents: isRunning ? "none" : "auto",
								}}
							/>
						</div>
						<div id="graph-max-flow-viz"></div>
					</div>
					<h3>MCBM Time Complexity</h3>
					<div className="text-box">
						<p>
							Using the Edmonds-Karp algorithm to find max flow the MCBM problem
							is O(V* E<sup>2</sup>). Edmonds-Karp improves upon the standard
							DFS approach to Ford-Fulkerson by finding the shortest augmenting
							paths with BFS. While BFS and DFS are both O(V + E), finding the
							shortest paths at each iteration reduces the maximum number of
							iterations needed from <code>E*f</code> to <code>V*E</code>, where{" "}
							<code>f</code> is the maximum flow of the network. This generally
							makes Edmonds-Karp the more efficient algorithm as runtime is not
							dependent on max flow, but rather the number of vertices and
							edges. Below is a graph of execution time with randomly-generated
							bipartite graphs where <code>m=n</code> and <code>V=E</code>. Note
							the cubic nature of the graph, given <code>V=E</code> in the test
							executions these instances are O(V<sup>3</sup>)/O(E<sup>3</sup>).
						</p>
					</div>
					<img
						alt="MCBM time complexity graph showing cubic curve."
						src="/dp-and-net-flow/images/mcbm-time.png"
					/>
				</main>
			</div>
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
