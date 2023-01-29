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

  const weatherMap: Map<string, string[]> = new Map([
    ['Clear', ['./image/night/clear.png', './image/day/clear.png']],
    ['Clouds', ['./image/night/clouds.png', './image/day/clouds.png']],
    ['Drizzle', ['./image/night/drizzle.png', './image/day/drizzle.png']],
    [
      'Thunderstorm',
      ['./image/night/thunderstorm.png', './image/day/thunderstorm.png'],
    ],
  ]);

  useEffect(() => {
    const data = weatherMap.get(weatherData);

    if (time === 'night') {
      if (data) {
        setIcon(data[0]);
      } else if (weatherData === 'Rain') {
        setIcon('./image/night/rain.png');
        setRain(true);
      } else if (weatherData === 'Snow') {
        setIcon('./image/night/snow.png');
        setSnow(true);
      } else {
        setIcon('./image/night/mist.png');
      }
    } else {
      if (data) {
        setIcon(data[1]);
      } else if (weatherData === 'Rain') {
        setIcon('./image/day/rain.png');
        setRain(true);
      } else if (weatherData === 'Snow') {
        setIcon('./image/day/snow.png');
        setSnow(true);
      } else {
        setIcon('./image/day/mist.png');
      }
    }
  }, [time, weatherData]);
  return <img className={css.weatherIcon} src={icon} alt="" />;
};

export default WeatherIcon;
