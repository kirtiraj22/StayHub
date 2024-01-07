import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
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
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
