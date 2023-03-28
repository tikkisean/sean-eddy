import React from "react";
import "./Projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

export default function Projects() {
	return (
		<main class="main-container">
			<div class="page-container" id="projects-page">
				<h1>Projects</h1>
				<div class="section">
					<img alt="" src="/images/rail-for-less.png" />
					<div class="information">
						<h2>RailForLess.us</h2>
						<hr></hr>
						<p>
							Amtrak scraping service that finds the cheapest fares over a given
							period. Requests open a Chrome browser on a remote server where
							data is carefully scraped without detection through rotating
							proxies. Application uses a React front-end and Python back-end.
						</p>
						<hr></hr>
						<div class="button-container">
							<a href="https://railforless.us" rel="noreferrer" target="_blank">
								<p>Visit railforless.us</p>
							</a>
							<a
								href="https://railforless.us/about"
								rel="noreferrer"
								target="_blank"
							>
								<p>Learn more</p>
							</a>
							<a
								href="https://github.com/tikkisean/rail-for-less"
								rel="noreferrer"
								target="_blank"
							>
								<FontAwesomeIcon icon={faGithubSquare} size={"3x"} />
							</a>
						</div>
					</div>
				</div>
				<div class="section">
					<iframe
						width="50%"
						height="100%"
						src="https://www.youtube.com/embed/ISuulysvbaI?autoplay=1&mute=1"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
					<div class="information">
						<h2>
							Project<span>DSM</span>
						</h2>
						<hr></hr>
						<p>
							A multi-year project meticulously recreating Downtown Des Moines
							in Minecraft. Featured on multiple news outlets and the recipient
							of the WDMSSF Outstanding Honors Project Award.
						</p>
						<hr></hr>
						<div class="button-container">
							<a href="https://projectdsm.org" rel="noreferrer" target="_blank">
								<p>Visit projectdsm.org</p>
							</a>
							<a
								href="https://www.desmoinesregister.com/story/news/local/2019/08/21/downtown-des-moines-has-been-recreated-minecraft-stunning-detail-sean-eddy-801-grand-video-game/2072936001/"
								rel="noreferrer"
								target="_blank"
							>
								<p>Read an article</p>
							</a>
						</div>
					</div>
				</div>
				<div class="section">
					<div class="information">
						<h2>Entrepreneurship Mockups</h2>
						<hr></hr>
						<div id="mockups-container">
							<div>
								<h3>RoomMe</h3>
								<a href="https://roomme.seaneddy.com" target="_blank">
									<img alt="" src="/images/roomme.png" />
								</a>
							</div>
							<div>
								<h3>Corinthian</h3>
								<a href="https://corinthian.seaneddy.com" target="_blank">
									<img alt="" src="/images/corinthian.png" />
								</a>
							</div>
							<div>
								<h3>Bikes on Lock</h3>
								<a href="https://bikes-on-lock.seaneddy.com" target="_blank">
									<img alt="" src="/images/bikes-on-lock.png" />
								</a>
							</div>
						</div>
						<hr></hr>
						<p>
							Websites created as minimum viable prototypes for various
							entrepreneurship classes.
						</p>
					</div>
				</div>
				<div class="section">
					<div class="information">
						<h2>Digital Illustrations</h2>
						<hr></hr>
						<div id="illustrations">
							<img alt="" src="/images/abby.png" />
							<img alt="" src="/images/car.png" />
							<img alt="" src="/images/headshot-illustration.png" />
							<img alt="" src="/images/riviera-supper-club.png" />
						</div>
						<hr></hr>
						<p>Adobe Illustrator sketches of photos I have taken.</p>
					</div>
				</div>
			</div>
		</main>
	);
}
