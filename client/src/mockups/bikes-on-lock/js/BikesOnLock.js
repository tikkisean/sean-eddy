import React from "react";
import "../css/BikesOnLock.css";

export default function BikesOnLock() {
	document.querySelector("link[rel~='icon']").href =
		"/mockups/bikes-on-lock/images/arizona.png";
	document.title = "Bikes on Lock";

	return (
		<div className="bikes-on-lock">
			<header>
				<div className="bikes-on-lock-logo">
					<img alt="" src="/mockups/bikes-on-lock/images/arizona.png" />
					<h3>
						<span>Bikes on Lock</span>
					</h3>
				</div>
				<button>Survey</button>
			</header>
			<main>
				<div id="hero-container">
					<div id="hero-content-container">
						<img alt="" src="/mockups/bikes-on-lock/images/hero.png" />
						<div id="hero-text-container">
							<h1>Locking up doesn't have to suck.</h1>
							<h2>
								We're building the next generation of bicycle lockers for
								college campuses.
							</h2>
						</div>
					</div>
				</div>
				<h1 id="transition">We put bike racks to shame.</h1>
				<div id="card-container">
					<div className="card">
						<h1>Modern</h1>
						<img alt="" src="/mockups/bikes-on-lock/images/modern.png" />
						<p>
							Bikes on Lock partners with Bikeep to integrate smartphone access
							with our lockers. No physical key required.
						</p>
					</div>
					<div className="card">
						<h1>Secure</h1>
						<img alt="" src="/mockups/bikes-on-lock/images/secure.png" />
						<p>
							Theft is not a concern with our lockers. A fortified trapezoidal
							enclosure with no exposed keyway keeps away even the most
							determined thieves.
						</p>
					</div>
					<div className="card">
						<h1>Economical</h1>
						<img alt="" src="/mockups/bikes-on-lock/images/economical.jpg" />
						<p>
							College students shouldn't need to afford a yearly locker rental
							for secure bike storage. Our lockers offer hourly, daily, and
							monthly rates.
						</p>
					</div>
				</div>
				<iframe
					width="80%"
					height="630"
					src="https://www.youtube.com/embed/RC7V07thDsg"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</main>
			<footer>
				<div className="bikes-on-lock-logo">
					<img alt="" src="/mockups/bikes-on-lock/images/arizona.png" />
					<h3>
						<span>Bikes on Lock</span> ©2022
					</h3>
				</div>
			</footer>
		</div>
	);
}
