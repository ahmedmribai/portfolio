import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
	CSSTransition,
	TransitionGroup,
} from "react-transition-group";
import styled, { css } from "styled-components";
import { navLinks } from "../config";
import { loaderDelay } from "../utils";
import { useScrollDirection } from "../hooks";
import Menu from "../components/menu";
import Logo from "../images/logo1.png";

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 11;
	padding: 0px 50px;
	width: 100%;
	height: 100px;
	background-color: #0a192f;
	filter: none !important;
	pointer-events: auto !important;
	user-select: auto !important;
	backdrop-filter: blur(10px);
	transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

	${(props) =>
		props.scrollDirection === "up" &&
		!props.scrolledToTop &&
		css`
			height: 70px;
			transform: translateY(0px);
			background-color: rgba(10, 25, 47, 0.85);
			box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
		`};

	${(props) =>
		props.scrollDirection === "down" &&
		!props.scrolledToTop &&
		css`
			height: 70px;
			transform: translateY(calc(70px * -1));
			box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
		`};

	@media (max-width: 1080px) {
		padding: 0 40px;
	}
	@media (max-width: 768px) {
		padding: 0 25px;
	}
`;

const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: 100%;
	color: #ccd6f6;
	font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
		monospace;
	counter-reset: item 0;
	z-index: 12;

	.logo {
		display: flex;
		justify-content: center;
		align-items: center;

		a {
			color: #64ffda;
			width: 120px;
			height: 120px;

			&:hover,
			&:focus {
				svg {
					fill: rgba(100, 255, 218, 0.1);
				}
			}

			svg {
				fill: none;
				transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
				user-select: none;
			}
		}
	}
`;

const StyledLinks = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}

	ol {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		margin: 0;
		list-style: none;

		li {
			margin: 0 5px;
			position: relative;
			counter-increment: item 1;
			font-size: 13px;
			text-decoration: none;

			a {
				padding: 10px;

				&:before {
					content: "0" counter(item) ".";
					margin-right: 7px;
					margin-left: -13px;
					color: #64ffda;
					font-size: 12;
					text-align: right;
				}
			}
		}
	}

	.resume-button {
		color: #64ffda;
		background-color: transparent;
		border: 1px solid #64ffda;
		border-radius: 4px;
		padding: 0.75rem 1rem;
		font-size: 13px;
		font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
			monospace;
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
		&:hover,
		&:focus,
		&:active {
			background-color: rgba(100, 255, 218, 0.1);
		}
		&:after {
			display: none !important;
		}
		margin-left: 15px;
		font-size: 13px;
	}
`;

const Nav = ({ isHome }) => {
	const [isMounted, setIsMounted] = useState(!isHome);
	const scrollDirection = useScrollDirection("down");
	const [scrolledToTop, setScrolledToTop] = useState(true);

	const handleScroll = () => {
		setScrolledToTop(window.pageYOffset < 50);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsMounted(true);
		}, 100);

		window.addEventListener("scroll", handleScroll);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const timeout = isHome ? loaderDelay : 0;
	const fadeClass = isHome ? "fade" : "";
	const fadeDownClass = isHome ? "fadedown" : "";

	return (
		<StyledHeader
			scrollDirection={scrollDirection}
			scrolledToTop={scrolledToTop}
		>
			<StyledNav>
				<TransitionGroup component={null}>
					{isMounted && (
						<CSSTransition classNames={fadeClass} timeout={timeout}>
							<div className='logo' tabIndex='-1'>
								{isHome ? (
									<a href='/' aria-label='home'>
										<img src={Logo} alt='logo' />
									</a>
								) : (
									<Link to='/' aria-label='home'>
										<img src={Logo} alt='logo' />
									</Link>
								)}
							</div>
						</CSSTransition>
					)}
				</TransitionGroup>

				<StyledLinks>
					<ol>
						<TransitionGroup component={null}>
							{isMounted &&
								navLinks &&
								navLinks.map(({ url, name }, i) => (
									<CSSTransition
										key={i}
										classNames={fadeDownClass}
										timeout={timeout}
									>
										<li
											key={i}
											style={{
												transitionDelay: `${isHome ? i * 100 : 0}ms`,
											}}
										>
											<Link to={url}>{name}</Link>
										</li>
									</CSSTransition>
								))}
						</TransitionGroup>
					</ol>

					<TransitionGroup component={null}>
						{isMounted && (
							<CSSTransition
								classNames={fadeDownClass}
								timeout={timeout}
							>
								<div
									style={{
										transitionDelay: `${
											isHome ? navLinks.length * 100 : 0
										}ms`,
									}}
								>
									<a href='/resume.pdf' className='resume-button'>
										Resume
									</a>
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</StyledLinks>

				<TransitionGroup component={null}>
					{isMounted && (
						<CSSTransition classNames={fadeClass} timeout={timeout}>
							<Menu />
						</CSSTransition>
					)}
				</TransitionGroup>
			</StyledNav>
		</StyledHeader>
	);
};

Nav.propTypes = {
	isHome: PropTypes.bool,
};

export default Nav;
