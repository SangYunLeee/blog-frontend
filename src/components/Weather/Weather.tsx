import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FiMapPin } from 'react-icons/fi';
import Snowy from './WeatherEffect/Snowy';
import Rainy from './WeatherEffect/Rainy';
import WeatherIcon from './WeatherIcon';
import TodayWeather from './TodayWeather';
import css from './Weather.module.scss';

export interface WeatherDataInterface {
  setSnow: Dispatch<SetStateAction<boolean>>;
  setRain: Dispatch<SetStateAction<boolean>>;
  time: string;
  weatherData: string;
  setWeatherData: Dispatch<SetStateAction<string>>;
}

export interface TranslateDataInterface {
  translateData: any;
  setTranslateData: Dispatch<SetStateAction<any>>;
}

const Weather = () => {
  //날씨 한글번역
  const [translateData, setTranslateData] = useState([]);
  //날씨 api 데이터
  const [weatherData, setWeatherData] = useState('');
  //날씨 api 현재날씨 번호
  const [weatherId, setWeatherId] = useState('');
  //위치정보 동의여부
  const [agree, setAgree] = useState<boolean>(false);
  //현재 위치
  const [location, setLocation] = useState();
  //현재 온도
  const [temperature, setTemperature] = useState('');
  const [currentHour, setCurrentHour] = useState<number>();
  const [time, setTime] = useState<string>('');

  //weatherEffect
  const [snow, setSnow] = useState(false);
  const [rain, setRain] = useState(false);

  const getWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

        const fetchData = async () => {
          try {
            const weatherResponse = await fetch(url);
            const weather = await weatherResponse.json();
            setWeatherData(weather.weather[0].main);
            //현재 지역
            setLocation(weather.name);
            //현재 위치 날씨
            setWeatherId(weather.weather[0].id);
            //현재 온도
            const temp = Math.floor(weather.main.temp) + '°C';
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
  };

  useEffect(() => {
    const translateData = async () => {
      try {
        //날씨 한글 번역
        const weatherTranslateResponse = await fetch('./data/weather.json');
        const weatherTranslate = await weatherTranslateResponse.json();
        setTranslateData(weatherTranslate.data);
      } catch (error) {
        console.error('error');
      }
    };
    translateData();
  }, []);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    setCurrentHour(hour);

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
    getWeather();
  }, [currentHour]);

  return (
    <div className={`${css[`${time}`]}`}>
      <div className={css.weatherEffect}>
        {snow ? <Snowy /> : null}
        {rain ? <Rainy /> : null}
      </div>
      {agree ? (
        <div className={css.weatherContainer}>
          <div className={css.weatherContent}>
            <WeatherIcon
              time={time}
              weatherData={weatherData}
              setSnow={setSnow}
              setRain={setRain}
              setWeatherData={setWeatherData}
            />
            {translateData.map((data) => {
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
          <div className={css.rightContainer}>
            <TodayWeather />
          </div>
        </div>
      ) : (
        <div className={css.disagree}>
          <span>위치 정보 이용에 동의하고 현재 날씨 정보를 확인해보세요 !</span>
        </div>
      )}
    </div>
  );
};

export default Weather;
