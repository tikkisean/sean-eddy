import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DPNetworkFlow from "./articles/dp-and-net-flow/js/DPNetworkFlow";
import LangCompare from "./articles/lang-compare/js/LangCompare";
import StringSearch from "./articles/string-search/js/StringSearch";
import AppRouter from "./sean-eddy/js/AppRouter";
import BikesOnLock from "./mockups/bikes-on-lock/js/BikesOnLock";
import Corinthian from "./mockups/corinthian/js/Corinthian";
import Roomme from "./mockups/roomme/js/Roomme";
import Traffic from "./traffic/js/Traffic";
import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<DPNetworkFlow />}
					path="/articles/dp-and-net-flow"
				></Route>
				<Route element={<LangCompare />} path="/articles/lang-compare"></Route>
				<Route element={<StringSearch />} path="/articles/string-search" />
				<Route element={<AppRouter />} path="/*" />
				<Route element={<BikesOnLock />} path="/mockups/bikes-on-lock"></Route>
				<Route element={<Corinthian />} path="/mockups/corinthian"></Route>
				<Route element={<Roomme />} path="/mockups/roomme"></Route>
				<Route element={<Traffic />} path="/traffic" />
			</Routes>
		</BrowserRouter>
	);
}
