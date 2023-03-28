import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Academics from "./Academics";
import Projects from "./Projects";
import "./AppRouter.css";

export default function AppRouter() {
	return (
		<main>
			<BrowserRouter>
				<Routes>
					<Route element={<Home />} path="/"></Route>
					<Route element={<Academics />} path="/academics"></Route>
					<Route element={<Projects />} path="/projects"></Route>
				</Routes>
			</BrowserRouter>
		</main>
	);
}
