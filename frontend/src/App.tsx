import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<p>Home page</p>
						</Layout>
					}
				/>
				<Route
					path="/search"
					element={
						<Layout>
							<p>Search page</p>
						</Layout>
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
