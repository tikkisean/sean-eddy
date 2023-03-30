import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Academics from "./Academics";
import Projects from "./Projects";
import Footer from "./Footer";
import "../css/AppRouter.css";

export default function AppRouter() {
	return (
		<div className="sean-eddy">
			<Navbar />
			<main>
				<Routes>
					<Route element={<Home />} path="/"></Route>
					<Route element={<Academics />} path="/academics"></Route>
					<Route element={<Projects />} path="/projects"></Route>
				</Routes>
			</main>
			<Footer />
		</div>
	);
}
