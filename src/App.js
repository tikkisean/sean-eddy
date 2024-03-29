import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRouter from "./sean-eddy/js/AppRouter";
import BikesOnLock from "./mockups/bikes-on-lock/js/BikesOnLock";
import Corinthian from "./mockups/corinthian/js/Corinthian";
import DPNetworkFlow from "./dp-and-net-flow/js/DPNetworkFlow";
import LangCompare from "./lang-compare/js/LangCompare";
import Roomme from "./mockups/roomme/js/Roomme";
import StringSearch from "./string-search/js/StringSearch";
import Traffic from "./traffic/js/Traffic";
import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppRouter />} path="/*" />
				<Route element={<BikesOnLock />} path="/mockups/bikes-on-lock"></Route>
				<Route element={<Corinthian />} path="/mockups/corinthian"></Route>
				<Route element={<DPNetworkFlow />} path="/dp-and-net-flow"></Route>
				<Route element={<LangCompare />} path="/lang-compare"></Route>
				<Route element={<Roomme />} path="/mockups/roomme"></Route>
				<Route element={<StringSearch />} path="/string-search" />
				<Route element={<Traffic />} path="/traffic" />
			</Routes>
		</BrowserRouter>
	);
}
