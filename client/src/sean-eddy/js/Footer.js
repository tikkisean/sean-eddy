import React from "react";
import "../css/Footer.css";

export default function Footer() {
	return (
		<footer className="sean-eddy-footer">
			<div className="sean-eddy-logo">
				<a href="/">
					<img alt="" src="/sean-eddy/images/logo.png" />
				</a>
				<h3>
					<a href="/">Sean Eddy</a>
				</h3>
			</div>
			<h2>
				Custom site designed with React. Check out the source code on{" "}
				<a
					href="https://github.com/tikkisean/tikkisean.github.io"
					rel="noreferrer"
					target="_blank"
				>
					GitHub
				</a>
				.
			</h2>
		</footer>
	);
}
