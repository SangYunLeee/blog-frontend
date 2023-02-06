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

  const weatherMap: Map<string, string[]> = new Map([
    ['Clear', ['./image/night/clear.png', './image/day/clear.png']],
    ['Clouds', ['./image/night/clouds.png', './image/day/clouds.png']],
    ['Drizzle', ['./image/night/drizzle.png', './image/day/drizzle.png']],
    ['Rain', ['./image/night/rain.png', './image/day/rain.png']],
    [
      'Thunderstorm',
      ['./image/night/thunderstorm.png', './image/day/thunderstorm.png'],
    ],
    ['Snow', ['./image/night/snow.png', './image/day/snow.png']],
  ]);

  useEffect(() => {
    const data = weatherMap.get(weatherData);
    const isNight = time >= 18 || (time >= 0 && time < 5);
    if (isNight) {
      if (data) {
        setWeatherIcon(data[0]);
      } else {
        setWeatherIcon('./image/night/mist.png');
      }
    } else {
      if (data) {
        setWeatherIcon(data[1]);
      } else {
        setWeatherIcon('./image/day/mist.png');
      }
    }
  }, []);

  return (
    <img className={css.todayWeatherIcon} src={weatherIcon} alt="아이콘" />
  );
};

export default TodayWeatherIcon;
