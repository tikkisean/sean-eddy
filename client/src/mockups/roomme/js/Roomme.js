import React from "react";
import "../css/Roomme.css";

export default function Roomme() {
	document.querySelector("link[rel~='icon']").href =
		"/mockups/roomme/images/favicon.png";
	document.title = "Roomme";

	return (
		<div className="roomme">
			<header>
				<div className="logo">
					<img alt="" src="/mockups/roomme/images/favicon-white.png" />
					<h3>RoomMe</h3>
				</div>
				<button>Sign in</button>
			</header>
			<main>
				<div id="hero-container">
					<div className="text-container">
						<div className="text">
							<h1>You deserve affordable housing.</h1>
							<h2>
								Finding the perfect roommate has never been easier. Use our
								tailored algorithm to split rent with other students and browse
								available properties.
							</h2>
						</div>
					</div>
					<img
						alt="Student holding smartphone"
						src="/mockups/roomme/images/hero-image.jpg"
					/>
				</div>
				<div id="about">
					<h1>We're committed to helping students afford housing nationwide</h1>
					<h2>
						Student housing is more expensive than ever, and we're here to help.
						Lower your costs by rooming with other students through our
						platform.
					</h2>
				</div>
				<h1 id="transition">Start using RoomMe in 3 easy steps</h1>
				<div className="text-and-image-container" id="step-1">
					<img alt="Sign in screen" src="/mockups/roomme/images/mock-1.png" />
					<div className="text-container">
						<div className="text">
							<h1>Sign up with your school email</h1>
							<h2>
								We protect your privacy. Unlike our competitors, users must
								verify their student status to use our service.
							</h2>
						</div>
					</div>
				</div>
				<div className="text-and-image-container" id="step-2">
					<div className="text-container">
						<div className="text">
							<h1>Tell us what you're looking for</h1>
							<h2>
								We collect information about your preferences to help make our
								algorithm as accurate as possible.
							</h2>
						</div>
					</div>
					<img
						alt="Preferences screen"
						src="/mockups/roomme/images/mock-3.png"
					/>
				</div>
				<div className="text-and-image-container" id="step-3">
					<img alt="Profiles screen" src="/mockups/roomme/images/mock-4.png" />
					<div className="text-container">
						<div className="text">
							<h1>That's it!</h1>
							<h2>
								Start browsing other RoomMe profiles in your area. You can
								always return to profiles you're interested in.
							</h2>
						</div>
					</div>
				</div>
				<h1 id="transition">Need a recap? Watch the video below.</h1>
				<iframe
					height="400px"
					src="/mockups/roomme/videos/roomme-website-reel.mp4"
					title="roomme"
					width="80%"
				></iframe>
			</main>
			<footer>
				<div className="logo">
					<img alt="" src="/mockups/roomme/images/favicon-white.png" />
					<h3>RoomMe ©2022</h3>
					<h3>| info@roomme.com</h3>
				</div>
			</footer>
		</div>
	);
}
