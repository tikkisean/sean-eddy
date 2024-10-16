import React from "react";
import "../css/Projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

export default function Projects() {
	return (
		<main className="projects main-container">
			<div className="page-container">
				<h1>Projects</h1>
				<div className="section">
					<img alt="" src="/sean-eddy/images/rail-for-less.png" />
					<div className="information">
						<h2>RailForLess.us</h2>
						<hr></hr>
						<p>
							Amtrak scraping service that finds the cheapest fares with
							flexible dates. Inspired by Google Flights, RailForLess helps
							hundreds of Amtrak travelers plan their trips everyday.
						</p>
						<hr></hr>
						<div className="button-container">
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
				<div className="section">
					<img alt="" src="/sean-eddy/images/algotrader.png" />
					<div className="information">
						<h2>Algotrader</h2>
						<hr></hr>
						<p>
							I have spent years studying and evaluating speculative trading
							strategies in the E-mini S&P 500 futures market. Read my latest
							research below.
						</p>
						<hr></hr>
						<div className="button-container">
							<a
								href="https://hdl.handle.net/10150/672852"
								rel="noreferrer"
								target="_blank"
							>
								<p>Read the paper</p>
							</a>
						</div>
					</div>
				</div>
				<div className="section">
					<iframe
						width="50%"
						height="100%"
						src="https://www.youtube.com/embed/ISuulysvbaI?autoplay=1&mute=1"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
					<div className="information">
						<h2>
							Project<span>DSM</span>
						</h2>
						<hr></hr>
						<p>
							A multi-year project meticulously recreating Downtown Des Moines,
							IA in Minecraft. Featured on several news outlets and the
							recipient of the WDMSSF Outstanding Honors Project Award.
						</p>
						<hr></hr>
						<div className="button-container">
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
				<div className="section">
					<div className="information">
						<h2>Computer Science Articles</h2>
						<hr></hr>
						<div className="multi-item-container">
							<div>
								<h3>String Searching</h3>
								<a
									href="/articles/string-search"
									rel="noreferrer"
									target="_blank"
								>
									<img alt="" src="/sean-eddy/images/string-search.png" />
								</a>
							</div>
							<div>
								<h3>DP and Network Flow</h3>
								<a
									href="/articles/dp-and-net-flow"
									rel="noreferrer"
									target="_blank"
								>
									<img alt="" src="/sean-eddy/images/dp-and-net-flow.png" />
								</a>
							</div>
							<div>
								<h3>Language Comparison</h3>
								<a
									href="/articles/lang-compare"
									rel="noreferrer"
									target="_blank"
								>
									<img alt="" src="/sean-eddy/images/lang-compare.png" />
								</a>
							</div>
						</div>
						<hr></hr>
						<p>
							A series of articles I have written covering various computer
							science topics, featuring interactive visualizations of algorithms
							and their time complexities.
						</p>
					</div>
				</div>
				<div className="section">
					<div className="information">
						<h2>Entrepreneurship Mockups</h2>
						<hr></hr>
						<div className="multi-item-container">
							<div>
								<h3>RoomMe</h3>
								<a href="/mockups/roomme" rel="noreferrer" target="_blank">
									<img alt="" src="/sean-eddy/images/roomme.png" />
								</a>
							</div>
							<div>
								<h3>Corinthian</h3>
								<a href="/mockups/corinthian" rel="noreferrer" target="_blank">
									<img alt="" src="/sean-eddy/images/corinthian.png" />
								</a>
							</div>
							<div>
								<h3>Bikes on Lock</h3>
								<a
									href="/mockups/bikes-on-lock"
									rel="noreferrer"
									target="_blank"
								>
									<img alt="" src="/sean-eddy/images/bikes-on-lock.png" />
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
				<div className="section">
					<div className="information">
						<h2>Digital Illustrations</h2>
						<hr></hr>
						<div id="illustrations">
							<img alt="" src="/sean-eddy/images/abby.png" />
							<img alt="" src="/sean-eddy/images/car.png" />
							<img alt="" src="/sean-eddy/images/headshot-illustration.png" />
							<img alt="" src="/sean-eddy/images/riviera-supper-club.png" />
						</div>
						<hr></hr>
						<p>Adobe Illustrator sketches of photos I have taken.</p>
					</div>
				</div>
			</div>
		</main>
	);
}
