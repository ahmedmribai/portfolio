import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import {
	CSSTransition,
	TransitionGroup,
} from "react-transition-group";
import styled from "styled-components";
import { srConfig } from "../../config";
import sr from "../../utils/sr";
import { Icon } from "../../components/icons";

const StyledProjectsSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		font-size: clamp(24px, 5vw, 32px);
	}

	.archive-link {
		font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
			monospace;
		font-size: 14px;
		&:after {
			bottom: 0.1em;
		}
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 15px;
		position: relative;
		margin-top: 50px;

		@media (max-width: 1080px) {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}

	.more-button {
		color: #64ffda;
		background-color: transparent;
		border: 1px solid #64ffda;
		border-radius: 4px;
		font-size: 13px;
		font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
			monospace;
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
		padding: 1.25rem 1.75rem;

		&:hover,
		&:focus,
		&:active {
			background-color: rgba(100, 255, 218, 0.1);
			outline: none;
		}
		&:after {
			display: none !important;
		}
		margin: 80px auto 0;
	}
`;

const StyledProject = styled.div`
	cursor: default;
	transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

	&:hover,
	&:focus {
		outline: 0;
		.project-inner {
			transform: translateY(-5px);
		}
	}

	.project-inner {
		box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
		transition: var(--transition);

		&:hover,
		&:focus {
			box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7);
		}
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		height: 100%;
		padding: 2rem 1.75rem;
		border-radius: 4px;
		background-color: #172a45;
		transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.project-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;

		.folder {
			color: #64ffda;
			svg {
				width: 40px;
				height: 40px;
			}
		}

		.project-links {
			margin-right: -10px;
			color: #a8b2d1;

			a {
				padding: 5px 10px;

				svg {
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	.project-title {
		margin: 0 0 10px;
		color: #ccd6f6;
		font-size: 22px;
	}

	.project-description {
		color: #a8b2d1;
		font-size: 17px;

		a {
			display: inline-block;
			text-decoration: none;
			text-decoration-skip-ink: auto;
			position: relative;
			transition: var(--transition);
			cursor: pointer;
			color: var(--green);
			&:hover,
			&:focus,
			&:active {
				color: var(--green);
				outline: 0;
				&:after {
					width: 100%;
				}
				& > * {
					color: var(--green) !important;
					transition: var(--transition);
				}
			}
			&:after {
				content: "";
				display: block;
				width: 0;
				height: 1px;
				position: relative;
				bottom: 0.37em;
				background-color: var(--green);
				transition: var(--transition);
				opacity: 0.5;
			}
		}
	}

	.project-tech-list {
		display: flex;
		align-items: flex-end;
		flex-grow: 1;
		flex-wrap: wrap;
		padding: 0;
		margin: 20px 0 0 0;
		list-style: none;

		li {
			font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
				monospace;
			font-size: 12px;
			line-height: 1.75;

			&:not(:last-of-type) {
				margin-right: 15px;
			}
		}
	}
`;

const Projects = () => {
	const data = useStaticQuery(graphql`
		query {
			projects: allMarkdownRemark(
				filter: {
					fileAbsolutePath: { regex: "/projects/" }
					frontmatter: { showInProjects: { ne: false } }
				}
				sort: { fields: [frontmatter___date], order: DESC }
			) {
				edges {
					node {
						frontmatter {
							title
							tech
							github
							external
						}
						html
					}
				}
			}
		}
	`);

	const [showMore, setShowMore] = useState(false);
	const revealTitle = useRef(null);
	const revealArchiveLink = useRef(null);
	const revealProjects = useRef([]);

	useEffect(() => {
		sr.reveal(revealTitle.current, srConfig());
		sr.reveal(revealArchiveLink.current, srConfig());
		revealProjects.current.forEach((ref, i) =>
			sr.reveal(ref, srConfig(i * 100))
		);
	}, []);

	const GRID_LIMIT = 6;
	const projects = data.projects.edges.filter(({ node }) => node);
	const firstSix = projects.slice(0, GRID_LIMIT);
	const projectsToShow = showMore ? projects : firstSix;

	return (
		<StyledProjectsSection>
			<h2 ref={revealTitle}>Other Noteworthy Projects</h2>

			<Link
				className='inline-link archive-link'
				to='/archive'
				ref={revealArchiveLink}
			>
				view the archive
			</Link>

			<TransitionGroup className='projects-grid'>
				{projectsToShow &&
					projectsToShow.map(({ node }, i) => {
						const { frontmatter, html } = node;
						const { github, external, title, tech } = frontmatter;

						return (
							<CSSTransition
								key={i}
								classNames='fadeup'
								timeout={
									i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300
								}
								exit={false}
							>
								<StyledProject
									key={i}
									ref={(el) => (revealProjects.current[i] = el)}
									tabIndex='0'
									style={{
										transitionDelay: `${
											i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0
										}ms`,
									}}
								>
									<div className='project-inner'>
										<header>
											<div className='project-top'>
												<div className='folder'>
													<Icon name='Folder' />
												</div>
												<div className='project-links'>
													{github && (
														<a href={github} aria-label='GitHub Link'>
															<Icon name='GitHub' />
														</a>
													)}
													{external && (
														<a
															href={external}
															aria-label='External Link'
														>
															<Icon name='External' />
														</a>
													)}
												</div>
											</div>

											<h3 className='project-title'>{title}</h3>

											<div
												className='project-description'
												dangerouslySetInnerHTML={{ __html: html }}
											/>
										</header>

										<footer>
											{tech && (
												<ul className='project-tech-list'>
													{tech.map((tech, i) => (
														<li key={i}>{tech}</li>
													))}
												</ul>
											)}
										</footer>
									</div>
								</StyledProject>
							</CSSTransition>
						);
					})}
			</TransitionGroup>

			<button
				className='more-button'
				onClick={() => setShowMore(!showMore)}
			>
				Show {showMore ? "Less" : "More"}
			</button>
		</StyledProjectsSection>
	);
};

export default Projects;
