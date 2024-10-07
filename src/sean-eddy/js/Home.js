import React from "react";
import "../css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
	return (
		<div className="home">
			<div id="landing">
				<img alt="" id="headshot" src="/sean-eddy/images/headshot.png" />
				<div id="text">
					<h1>Hey! My name is Sean.</h1>
				</div>
			</div>
			<FontAwesomeIcon icon={faAngleDown} size={"5x"} />
			<div id="separator">
				<hr />
				<h2>Get to know me</h2>
				<hr />
			</div>
			<div className="main-container" id="about">
				<div className="page-container">
					<div id="collage">
						<div className="row">
							<img alt="" src="/sean-eddy/images/cycling.jpg" />
							<img alt="" src="/sean-eddy/images/mural.jpg" />
						</div>
						<div className="row">
							<img alt="" src="/sean-eddy/images/lego-house.jpg" />
							<img alt="" src="/sean-eddy/images/hike.jpg" />
						</div>
					</div>
					<p>
						I am currently a graduate student studying computer science at the
						University of Arizona. Throughout my educational journey, I have
						devoted thousands of hours to personal projects ranging from
						algorithmic trading to Amtrak fare scraping. I have worked as a
						teaching assistant in four separate courses, and I am pursuing a job
						in web development after graduation.
					</p>
					<div id="learn-more">
						<h2>Learn more</h2>
						<FontAwesomeIcon icon={faArrowRight} size={"2x"} />
					</div>
					<a id="academics-container" href="/academics/">
						<h2>Academics</h2>
					</a>
					<a id="projects-container" href="/projects/">
						<h2>Projects</h2>
					</a>
				</div>
			</div>
		</div>
	);
}
