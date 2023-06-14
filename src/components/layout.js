import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "./loader";
import Nav from "./nav";
import Social from "./social";
import Email from "./email";
import Footer from "./footer";

const SkipToContentLink = styled.a`
	position: absolute;
	top: auto;
	left: -999px;
	width: 1px;
	height: 1px;
	overflow: hidden;
	z-index: -99;
	&:focus,
	&:active {
		top: 0;
		left: 0;
		width: auto;
		height: auto;
		padding: 18px 23px;
		outline: 0;
		border-radius: 4px;
		background-color: #172a45;
		color: #64ffda;
		font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
			monospace;
		font-size: 14px;
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		overflow: auto;
		transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
		z-index: 99;
	}
`;
const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const Layout = ({ children }) => {
	const location = {
		pathname: "/somewhere",
		state: { fromDashboard: true },
	};
	console.log(location);
	const isHome = location.pathname === "/";
	const [isLoading, setIsLoading] = useState(isHome);

	useEffect(() => {
		if (isLoading) {
			return;
		}
		if (location.hash) {
			const id = location.hash.substring(1); // location.hash without the '#'
			setTimeout(() => {
				const el = document.getElementById(id);
				if (el) {
					el.scrollIntoView();
					el.focus();
				}
			}, 0);
		}
	}, [isLoading]);

	return (
		<>
			<div id='root'>
				<SkipToContentLink href='#content'>
					Skip to Content
				</SkipToContentLink>

				{isLoading && isHome ? (
					<Loader finishLoading={() => setIsLoading(false)} />
				) : (
					<StyledContent>
						<Nav isHome={isHome} />
						<Social isHome={isHome} />
						<Email isHome={isHome} />

						<div id='content'>
							{children}
							<Footer />
						</div>
					</StyledContent>
				)}
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
