import React, { useState, useEffect } from 'react';
import { WeatherDataInterface } from './Weather';
import css from './WeatherIcon.module.scss';

const WeatherIcon = ({
  setSnow,
  setRain,
  time,
  weatherData,
  setWeatherData,
}: WeatherDataInterface) => {
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    if (time === 'dusk' || 'night') {
      if (weatherData === 'clear sky') {
        setIcon('./image/night/clear sky.png');
      } else if (weatherData === 'few clouds') {
        setIcon('./image/night/few clouds.png');
      } else if (weatherData === 'scattered clouds') {
        setIcon('./image/night/scattered clouds.png');
      } else if (weatherData === 'broken clouds') {
        setIcon('./image/night/broken clouds.png');
      } else if (weatherData === '	shower rain') {
        setIcon('./image/night/shower rain.png');
        setRain(true);
      } else if (weatherData === '	rain') {
        setIcon('./image/night/rain.png');
        setRain(true);
      } else if (weatherData === '	thunderstorm') {
        setIcon('./image/night/thunderstorm.png');
      } else if (weatherData === '	snow') {
        setIcon('./image/night/snow.png');
        setSnow(true);
      } else {
        setIcon('./image/night/mist.png');
      }
    } else if (time === 'dawn' || 'morning' || 'afternoon') {
      if (weatherData === 'clear sky') {
        setIcon('./image/day/clear sky.png');
      } else if (weatherData === 'few clouds') {
        setIcon('./image/day/few clouds.png');
      } else if (weatherData === 'scattered clouds') {
        setIcon('./image/day/scattered clouds.png');
      } else if (weatherData === 'broken clouds') {
        setIcon('./image/day/broken clouds.png');
      } else if (weatherData === '	shower rain') {
        setIcon('./image/day/shower rain.png');
        setRain(true);
      } else if (weatherData === '	rain') {
        setIcon('./image/day/rain.png');
        setRain(true);
      } else if (weatherData === '	thunderstorm') {
        setIcon('./image/day/thunderstorm.png');
      } else if (weatherData === '	snow') {
        setIcon('./image/day/snow.png');
        setSnow(true);
      } else {
        setIcon('./image/day/mist.png');
      }
    }
  }, [setRain, setSnow, setWeatherData, time, weatherData]);
  return <img className={css.weatherIcon} src={icon} alt="" />;
};

export default WeatherIcon;
