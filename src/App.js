import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Hero from "./components/sections/hero";

import Layout from "./components/layout";
import styled from "styled-components";
import About from "./components/sections/about";

import Portfolio from "./components/sections/works/portfolio";

import Contact from "./components/sections/contact/contact";

const StyledMainContainer = styled.main`
	counter-reset: section;
`;

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<StyledMainContainer className='fillHeight'>
					<Hero />

					<About />
					<Portfolio />
				</StyledMainContainer>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
