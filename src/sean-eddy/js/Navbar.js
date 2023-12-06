import React from "react";
import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
	return (
		<header className="sean-eddy-navbar">
			<nav>
				<div className="sean-eddy-logo">
					<a href="/">
						<img alt="" src="/sean-eddy/images/logo.png" />
					</a>
					<h3>
						<a href="/">Sean Eddy</a>
					</h3>
				</div>
				<div id="links">
					<div id="page-links">
						<h3>
							<a href="/academics/">Academics</a>
						</h3>
						<h3>
							<a href="/projects/">Projects</a>
						</h3>
					</div>
					<div id="icons">
						<a
							href="https://www.linkedin.com/in/sean-eddy-6326051ba"
							rel="noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faLinkedin} size={"2x"} />
						</a>
						<a
							href="https://github.com/tikkisean"
							rel="noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faGithubSquare} size={"2x"} />
						</a>
						<a href="mailto:sean@seaneddy.com">
							<FontAwesomeIcon icon={faEnvelope} size={"2x"} />
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}
