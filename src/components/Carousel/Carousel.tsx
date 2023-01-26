import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css';
import './Carousel.scss';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import Grass from '../Grass/Grass';
import Weather from '../Weather/Weather';

const Carousel = () => {
  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, EffectFade, Pagination, Autoplay]}
      loop={true}
    >
      {/* <SwiperSlide>
        <Grass />
      </SwiperSlide> */}
      <SwiperSlide>
        <Weather />
      </SwiperSlide>
    </Swiper>
  );
};
export default Carousel;
