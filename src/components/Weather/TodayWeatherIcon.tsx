import React, { useState, useEffect } from 'react';
import css from './TodayWeatherIcon.module.scss';

const TodayWeatherIcon = ({
  weatherData,
  todayTime,
}: {
  weatherData: any;
  todayTime: any;
}) => {
  const [weatherIcon, setWeatherIcon] = useState<string>();
  const time = Number(todayTime);

  useEffect(() => {
    if (time >= 18 || (time >= 0 && time < 5)) {
      if (weatherData === 'Clear') {
        setWeatherIcon('./image/night/clear sky.png');
      } else if (weatherData === 'Clouds') {
        setWeatherIcon('./image/night/few clouds.png');
      } else if (weatherData === 'Drizzle') {
        setWeatherIcon('./image/night/shower rain.png');
      } else if (weatherData === 'Rain') {
        setWeatherIcon('./image/night/rain.png');
      } else if (weatherData === 'Thunderstorm') {
        setWeatherIcon('./image/night/thunderstorm.png');
      } else if (weatherData === 'Snow') {
        setWeatherIcon('./image/night/snow.png');
      } else {
        setWeatherIcon('./image/night/mist.png');
      }
    } else {
      if (weatherData === 'Clear') {
        setWeatherIcon('./image/day/clear sky.png');
      } else if (weatherData === 'Clouds') {
        setWeatherIcon('./image/day/few clouds.png');
      } else if (weatherData === 'Drizzle') {
        setWeatherIcon('./image/day/shower rain.png');
      } else if (weatherData === 'Rain') {
        setWeatherIcon('./image/day/rain.png');
      } else if (weatherData === 'Thunderstorm') {
        setWeatherIcon('./image/day/thunderstorm.png');
      } else if (weatherData === 'Snow') {
        setWeatherIcon('./image/day/snow.png');
      } else {
        setWeatherIcon('./image/day/mist.png');
      }
    }
  }, [weatherData, todayTime]);

  return (
    <img className={css.todayWeatherIcon} src={weatherIcon} alt="아이콘" />
  );
};

export default TodayWeatherIcon;
