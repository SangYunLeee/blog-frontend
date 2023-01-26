import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FiMapPin } from 'react-icons/fi';
import Snowy from './WeatherEffect/Snowy';
import Rainy from './WeatherEffect/Rainy';
import WeatherIcon from './WeatherIcon';
import css from './Weather.module.scss';

export interface WeatherDataInterface {
  setSnow: Dispatch<SetStateAction<boolean>>;
  setRain: Dispatch<SetStateAction<boolean>>;
  time: string;
  weatherData: string;
  setWeatherData: Dispatch<SetStateAction<string>>;
}

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [agree, setAgree] = useState<boolean>(false);
  const [weatherId, setWeatherId] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState('');
  const [time, setTime] = useState<string>('');

  //weatherEffect
  const [snow, setSnow] = useState(false);
  const [rain, setRain] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

        const fetchData = async () => {
          try {
            //날씨 한글 번역
            const weatherTranslateResponse = await fetch('./data/weather.json');
            const weatherTranslate = await weatherTranslateResponse.json();
            setWeather(weatherTranslate.data);

            const weatherResponse = await fetch(url);
            const weather = await weatherResponse.json();
            setWeatherData(weather.weather[0].description);
            //현재 지역
            setLocation(weather.name);
            //현재 위치 날씨
            setWeatherId(weather.weather[0].id);
            //현재 온도
            const temp = Math.round(weather.main.temp) + '°C';
            setTemperature(temp);

            //위치정보 동의
            setAgree(true);
          } catch (error) {
            console.error('error');
          }
        };
        fetchData();
      });
    } else {
      setAgree(false);
    }
  }, []);

  //현재 시간
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 4 && hour <= 6) {
      setTime('dawn');
    } else if (hour >= 7 && hour <= 12) {
      setTime('morning');
    } else if (hour >= 13 && hour <= 15) {
      setTime('afternoon');
    } else if (hour >= 16 && hour <= 17) {
      setTime('dusk');
    } else {
      setTime('night');
    }
  }, [time]);

  //아이콘 설정

  return (
    <div className={`${css[`${time}`]}`}>
      <div className={css.weatherEffect}>
        {snow ? <Snowy /> : null}
        {rain ? <Rainy /> : null}
      </div>
      <div className={css.weatherContainer}>
        {agree ? (
          <>
            <div className={css.weatherContent}>
              <WeatherIcon
                time={time}
                weatherData={weatherData}
                setSnow={setSnow}
                setRain={setRain}
                setWeatherData={setWeatherData}
              />
              {weather.map((data) => {
                const { id, content } = data;
                if (id === weatherId) {
                  return (
                    <span key={id} className={css.currentWeather}>
                      {content}
                    </span>
                  );
                }
              })}
              <span className={css.temperature}>{temperature}</span>
            </div>
            <div className={css.location}>
              <FiMapPin className={css.locationIcon} />
              <span className={css.locationName}>{location}</span>
            </div>
          </>
        ) : (
          <div className={css.disagree}>
            <span>위치 정보 이용에 동의하고</span>
            <span>현재 날씨 정보를 확인해보세요 !</span>
          </div>
        )}
        <div className={css.rightContainer}></div>
      </div>
    </div>
  );
};

export default Weather;
