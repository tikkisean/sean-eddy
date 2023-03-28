import React from "react";
import Navbar from "./Navbar";
import AppRouter from "./AppRouter";
import Footer from "./Footer";
import "./App.css";

export default function App() {
	return (
		<div>
			<Navbar />
			<AppRouter />
			<Footer />
		</div>
	);
}
