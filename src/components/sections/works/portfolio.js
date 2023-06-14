import React from "react";
import "./portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Sidebar from "../../../images/sidebar.png";
import Ecommerce from "../../../images/ecommerce.png";
import HOC from "../../../images/hoc.png";
import MusicApp from "../../../images/musicapp.png";

const Portfolio = () => {
	return (
		<div className='portfolio' id='portfolio'>
			{/* heading */}
			<span>Recent Projects</span>
			<span>Portfolio</span>

			{/* slider */}
			<Swiper
				spaceBetween={30}
				slidesPerView={3}
				grabCursor={true}
				className='portfolio-slider'
			>
				<SwiperSlide>
					<img src={Sidebar} alt='' />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Ecommerce} alt='' />
				</SwiperSlide>
				<SwiperSlide>
					<img src={MusicApp} alt='' />
				</SwiperSlide>
				<SwiperSlide>
					<img src={HOC} alt='' />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Portfolio;
