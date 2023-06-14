import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../components/icons";
import { socialMedia } from "../config";

const StyledFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: auto;
	min-height: 70px;
	padding: 15px;
	text-align: center;
`;

const StyledSocialLinks = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: block;
		width: 100%;
		max-width: 270px;
		margin: 0 auto 10px;
		color: #a8b2d1;
	}

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		margin: 0;
		list-style: none;

		a {
			padding: 10px;
			svg {
				width: 20px;
				height: 20px;
			}
		}
	}
`;

const StyledCredit = styled.div`
	color: #a8b2d1;
	font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono",
		monospace;
	font-size: 12px;
	line-height: 1;

	a {
		padding: 10px;
	}

	.github-stats {
		margin-top: 10px;

		& > span {
			display: inline-flex;
			align-items: center;
			margin: 0 7px;
		}
		svg {
			display: inline-block;
			width: auto;
			height: 15px;
			margin-right: 5px;
		}
	}
`;

const Footer = () => {
	const [githubInfo, setGitHubInfo] = useState({
		stars: null,
		forks: null,
	});

	useEffect(() => {
		if (process.env.NODE_ENV !== "production") {
			return;
		}
		fetch("https://api.github.com/repos/bchiang7/v4")
			.then((response) => response.json())
			.then((json) => {
				const { stargazers_count, forks_count } = json;
				setGitHubInfo({
					stars: stargazers_count,
					forks: forks_count,
				});
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<StyledFooter>
			<StyledSocialLinks>
				<ul>
					{socialMedia &&
						socialMedia.map(({ name, url }, i) => (
							<li key={i}>
								<a href={url} aria-label={name}>
									<Icon name={name} />
								</a>
							</li>
						))}
				</ul>
			</StyledSocialLinks>

			<StyledCredit tabindex='-1'>
				<a href='https://github.com/ahmedmribai'>
					<div>Designed &amp; Built by Ahmed Mribai</div>

					{githubInfo.stars && githubInfo.forks && (
						<div className='github-stats'>
							<span>
								<Icon name='Star' />
								<span>{githubInfo.stars.toLocaleString()}</span>
							</span>
							<span>
								<Icon name='Fork' />
								<span>{githubInfo.forks.toLocaleString()}</span>
							</span>
						</div>
					)}
				</a>
			</StyledCredit>
		</StyledFooter>
	);
};

Footer.propTypes = {
	githubInfo: PropTypes.object,
};

export default Footer;
