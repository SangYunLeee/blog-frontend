import React, { useEffect, useState } from 'react';
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
  const token = localStorage.getItem('token');
  const [loopCheck, setLoopCheck] = useState(false);
  useEffect(() => {
    if (token === null) {
      setLoopCheck(false);
    } else if (token !== null) {
      setLoopCheck(true);
    }
  }, [token]);

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
      loop={loopCheck}
    >
      {token === null ? (
        <SwiperSlide>
          <Weather />
        </SwiperSlide>
      ) : (
        <>
          <SwiperSlide>
            <Grass />
          </SwiperSlide>
          <SwiperSlide>
            <Weather />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
};
export default Carousel;
