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

  const mark = grassData.map((data) => {
    return data.date;
  });
  console.log(mark);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format('DD')}
        next2Label={null}
        prev2Label={null}
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          const html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className="dot"></div>);
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default Grass2;
