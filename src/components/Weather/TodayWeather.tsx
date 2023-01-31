import React, { useState, useEffect } from 'react';
import TodayWeatherIcon from './TodayWeatherIcon';
import css from './TodayWeather.module.scss';

const TodayWeather = () => {
  const [weatherList, setWeatherList] = useState<any>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&exclude=alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&cnt=8`;
      const fetchData = async () => {
        try {
          //날씨 api 데이터
          const weatherResponse = await fetch(url);
          const weather = await weatherResponse.json();
          setWeatherList(weather.list);
        } catch (error) {
          console.error('error');
        }
      };
      fetchData();
    });
  }, []);

  return (
    <div className={css.wrap}>
      {weatherList ? (
        <div className={css.todayWeatherContainer}>
          {weatherList.map((list: any) => {
            const { dt, dt_txt, main, weather } = list;
            const temp = Math.floor(main.temp) + '°C';
            const weatherData: string = weather[0].main;
            const dateTime = dt_txt.split(' ');
            const date = dateTime[0].split('-');
            const time = dateTime[1].split(':');
            const todayTime: number = time[0];
            return (
              <div className={css.weatherContent} key={dt}>
                {time[0] === '00' ? (
                  <>
                    <p className={css.day}>{date[2]}일</p>
                    <p>{todayTime}시</p>
                  </>
                ) : (
                  <p>{todayTime}시</p>
                )}
                <TodayWeatherIcon
                  weatherData={weatherData}
                  todayTime={todayTime}
                />
                <p className={css.temp}>{temp}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TodayWeather;
