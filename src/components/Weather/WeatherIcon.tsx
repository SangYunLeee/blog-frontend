import React, { useState, useEffect } from 'react';
import { WeatherDataInterface } from './Weather';
import css from './WeatherIcon.module.scss';

const WeatherIcon = ({
  setSnow,
  setRain,
  time,
  weatherData,
}: WeatherDataInterface) => {
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    if (time === 'night') {
      if (weatherData === 'Clear') {
        setIcon('./image/night/clear sky.png');
      } else if (weatherData === 'Clouds') {
        setIcon('./image/night/few clouds.png');
      } else if (weatherData === 'Drizzle') {
        setIcon('./image/night/shower rain.png');
        setRain(true);
      } else if (weatherData === 'Rain') {
        setIcon('./image/night/rain.png');
        setRain(true);
      } else if (weatherData === 'Thunderstorm') {
        setIcon('./image/night/thunderstorm.png');
      } else if (weatherData === 'Snow') {
        setIcon('./image/night/snow.png');
        setSnow(true);
      } else {
        setIcon('./image/night/mist.png');
      }
    } else {
      if (weatherData === 'Clear') {
        setIcon('./image/day/clear sky.png');
      } else if (weatherData === 'Clouds') {
        setIcon('./image/day/few clouds.png');
      } else if (weatherData === 'Drizzle') {
        setIcon('./image/day/shower rain.png');
        setRain(true);
      } else if (weatherData === 'Rain') {
        setIcon('./image/day/rain.png');
        setRain(true);
      } else if (weatherData === 'Thunderstorm') {
        setIcon('./image/day/thunderstorm.png');
      } else if (weatherData === 'Snow') {
        setIcon('./image/day/snow.png');
        setSnow(true);
      } else {
        setIcon('./image/day/mist.png');
      }
    }
  }, [setRain, setSnow, time, weatherData]);
  return <img className={css.weatherIcon} src={icon} alt="" />;
};

export default WeatherIcon;
