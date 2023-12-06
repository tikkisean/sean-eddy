import React from "react";
import "../css/Corinthian.css";

export default function Corinthian() {
	document.querySelector("link[rel~='icon']").href =
		"/mockups/corinthian/images/logo.png";
	document.title = "Corinthian";

	return (
		<div className="corinthian">
			<header>
				<div className="logo">
					<img alt="" src="/mockups/corinthian/images/logo.png" />
					<h3>
						<span>Corinthian</span>
					</h3>
				</div>
				<button>Pre-Order</button>
			</header>
			<main>
				<div id="hero-container">
					<div id="hero-content-container">
						<img alt="" src="/mockups/corinthian/images/helmet-back.png" />
						<h1>
							The helmet that saves your life even <em>after</em> impact.
						</h1>
						<img alt="" src="/mockups/corinthian/images/helmet-front.png" />
					</div>
				</div>
				<hr></hr>
				<h1 id="transition">More than just a modular helmet.</h1>
				<div id="card-container">
					<div className="card">
						<h1>Life-saving</h1>
						<img alt="" src="/mockups/corinthian/images/ambulance.png" />
						<p>
							Corinthian's modular design allows first-responders to easily
							remove your helmet in the event of a crash without worsening
							injuries.
						</p>
					</div>
					<div className="card">
						<h1>Portable</h1>
						<img alt="" src="/mockups/corinthian/images/backpack.png" />
						<p>
							Ever tried to fit a bulky helmet into a backpack and wished you
							could just split it in half? With Corinthian you have the freedom
							to take your helmet anywhere.
						</p>
					</div>
					<div className="card">
						<h1>Adjustable</h1>
						<img alt="" src="/mockups/corinthian/images/adjusting-helmet.png" />
						<p>
							Our helmet features a tensioning system enabled by the modular
							design. We can produce less sizes that fit more people, passing
							those savings to you.
						</p>
					</div>
				</div>
				<h1 id="transition">State-of-the-art safety.</h1>
				<img alt="" src="./resources/images/MIPS.jpg" />
				<h1 id="transition">Interested? Learn more below</h1>
				<iframe
					src="/mockups/corinthian/videos/corinthian-website-reel.mp4"
					height="500"
					title="corinthian"
					width="100%"
				></iframe>
			</main>
			<footer>
				<div className="logo">
					<img alt="" src="/mockups/corinthian/images/logo.png" />
					<h3>
						<span>Corinthian</span> ©2022
					</h3>
				</div>
			</footer>
		</div>
	);
}
