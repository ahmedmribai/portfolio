import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { srConfig } from "../../config";
import sr from "../../utils/sr";
import Me from "../../images/me.jpg";

const StyledAboutSection = styled.section`
	max-width: 900px;

	.inner {
		display: grid;
		grid-template-columns: 3fr 2fr;
		grid-gap: 50px;

		@media (max-width: 768px) {
			display: block;
		}
	}
`;
const StyledText = styled.div`
	ul.skills-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(140px, 200px));
		padding: 0;
		margin: 20px 0 0 0;
		overflow: hidden;
		list-style: none;

		li {
			position: relative;
			margin-bottom: 10px;
			padding-left: 20px;
			font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
				monospace;
			font-size: 15px;

			&:before {
				content: "▹";
				position: absolute;
				left: 0;
				color: #64ffda;
				font-size: 17px;
				line-height: 12px;
			}
		}
	}
`;
const StyledPic = styled.div`
	position: relative;
	max-width: 300px;

	@media (max-width: 768px) {
		margin: 50px auto 0;
		width: 70%;
	}

	.wrapper {
		box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
		transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

		&:hover,
		&:focus {
			box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7);
		}
		display: block;
		position: relative;
		width: 100%;
		border-radius: 4px;
		background-color: #64ffda;

		&:hover,
		&:focus {
			background: transparent;
			outline: 0;

			&:after {
				top: 15px;
				left: 15px;
			}

			.img {
				filter: none;
				mix-blend-mode: normal;
			}
		}

		.img {
			position: relative;
			border-radius: 4px;
			mix-blend-mode: multiply;
			filter: grayscale(100%) contrast(1);
			transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
		}

		&:before,
		&:after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 4px;
			transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
		}

		&:before {
			top: 0;
			left: 0;
			background-color: #0a192f;
			mix-blend-mode: screen;
		}

		&:after {
			border: 2px solid #64ffda;
			top: 20px;
			left: 20px;
			z-index: -1;
		}
	}
`;

const About = () => {
	const revealContainer = useRef(null);

	useEffect(() => {
		sr.reveal(revealContainer.current, srConfig());
	}, []);

	const skills = [
		"JavaScript (ES6+)",
		"HTML & CSS",
		"React",
		"Node.js",
	];

	return (
		<StyledAboutSection id='about' ref={revealContainer}>
			<h2 className='numbered-heading'>About Me</h2>

			<div className='inner'>
				<StyledText>
					<div>
						<p>
							Hello! I'm Ahmed, a full stack web developper based in
							Beja, Tunisia.
						</p>

						<p>
							I enjoy creating and giving life to ideas that live on
							the internet, whether that be websites, applications, or
							anything in between. My goal is to always build products
							that provide a good view and performant experiences.
						</p>

						<p>
							Shortly after graduating from{" "}
							<a href='http://fst.rnu.tn/fr'>
								Faculty of science of Tunisia
							</a>
							, I changed from a Math teacher to learning about web
							developpement and new technologies that i found my
							passion in it
						</p>

						<p>
							Here are a few technologies I've been working with
							recently:
						</p>
					</div>

					<ul className='skills-list'>
						{skills &&
							skills.map((skill, i) => <li key={i}>{skill}</li>)}
					</ul>
				</StyledText>

				<StyledPic>
					<div className='wrapper'>
						<img src={Me} alt='Avatar' className='img' />
					</div>
				</StyledPic>
			</div>
		</StyledAboutSection>
	);
};

export default About;
