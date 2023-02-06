/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import type { GrassData } from '../Profile';
import './Grass2.scss';

const Grass2 = () => {
  const [value, onChange] = useState(new Date());
  const [grassData, setGrassData] = useState<GrassData[]>([]);
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/grasses?userId=3&timezone=+9:00&withinDay=60`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((data) => setGrassData(data.data));
  }, []);

  const grassDatas = grassData.map((data) => {
    return data.date;
  });
  // console.log(grassDatas);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format('DD')}
        next2Label={null}
        prev2Label={null}
        // tileContent={({ date, view }) => {
        //   const html = [];
        //   if (grassDatas.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
        //     html.push(<div className="dot"></div>);
        //   }
        //   return (
        //     <>
        //       <div>{html}</div>
        //     </>
        //   );
        // }}
      />
    </div>
  );
};

export default Grass2;
