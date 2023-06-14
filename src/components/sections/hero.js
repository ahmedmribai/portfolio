import React from "react";

import styled from "styled-components";
import { email } from "../../config";

const StyledHeroSection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	align-items: flex-start;
	min-height: 100vh;

	h1 {
		margin: 0 0 30px 4px;
		color: #64ffda;
		font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
			monospace;
		font-size: clamp(14px, 5vw, 16px);
		font-weight: 400;

		@media (max-width: 480px) {
			margin: 0 0 20px 2px;
		}
	}

	h3 {
		margin-top: 10px;
		color: #8892b0;
		line-height: 0.9;
	}

	p {
		margin: 20px 0 0;
		max-width: 500px;
	}

	.email-link {
		color: #64ffda;
		background-color: transparent;
		border: 1px solid #64ffda;
		border-radius: 4px;
		padding: 1.25rem 1.75rem;
		font-size: 14px;
		font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
			monospace;
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
		&:hover,
		&:focus,
		&:active {
			background-color: rgba(200, 255, 218, 0.31);
		}
		&:after {
			display: none !important;
		}
		margin-top: 50px;
	}
`;

const Hero = () => {
	return (
		<StyledHeroSection>
			<h1>Hi, my name is</h1>
			<h2 className='big-heading'>Ahmed Mribai.</h2>
			<h3 className='big-heading'>I build web Applications.</h3>
			<p>
				I'm a full stack web developper based in Beja, Tunisia
				specializing in building (and occasionally designing)
				exceptional websites, applications, and everything in between.
			</p>
			<a href={`mailto:${email}`} className='email-link'>
				Get In Touch
			</a>
		</StyledHeroSection>
	);
};

export default Hero;
