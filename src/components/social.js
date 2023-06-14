import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { socialMedia } from "../config";
import Side from "../components/side";
import Icon from "../components/icons/icon";

const StyledSocialList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
	padding: 0;
	list-style: none;

	&:after {
		content: "";
		display: block;
		width: 1px;
		height: 90px;
		margin: 0 auto;
		background-color: #a8b2d1;
	}

	li {
		padding: 10px;

		&:last-of-type {
			margin-bottom: 20px;
		}

		a {
			&:hover,
			&:focus {
				transform: translateY(-3px);
			}

			svg {
				width: 18px;
				height: 18px;
			}
		}
	}
`;

const Social = ({ isHome }) => (
	<Side isHome={isHome} orientation={"left"}>
		<StyledSocialList>
			{socialMedia &&
				socialMedia.map(({ url, name }, i) => (
					<li key={i}>
						<a href={url} aria-label={name}>
							<Icon name={name} />
						</a>
					</li>
				))}
		</StyledSocialList>
	</Side>
);

Social.propTypes = {
	isHome: PropTypes.bool,
};

export default Social;
