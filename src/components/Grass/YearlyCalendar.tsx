import React, { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';

interface postDataInterface {
  date: string;
  posts?: { count: number };
  comments?: { count: number };
  count: number;
  level: number | any;
}

const YearlyCalendar = () => {
  const token = localStorage.getItem('token');

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year + '-01-01');
  const timeDiff = now.getTime() - start.getTime();
  const day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);

  const [userId, setUserId] = useState(0);
  const [postingData, setPostingData] = useState<postDataInterface[]>([]);
  const dayCheck1 = postingData.some(
    (data) => data.date === year + '-01-01' && year + '-12-31'
  );
  const dayCheck2 = postingData.some((data) => data.date === year + '-01-01');
  const dayCheck3 = postingData.some((data) => data.date === year + '-12-31');

  const firstDate = {
    date: '2023-01-01',
    count: 0,
    level: 0,
  };

  const lastDate = {
    date: '2023-12-31',
    count: 0,
    level: 0,
  };

  if (dayCheck1 === false) {
    postingData.unshift(firstDate);
    postingData.push(lastDate);
  } else if (dayCheck2 === false) {
    postingData.unshift(firstDate);
  } else if (dayCheck3 === false) {
    postingData.push(lastDate);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
          headers: requestHeaders,
        });
        const json = await response.json();
        setUserId(json.data.id);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/grasses?userId=${userId}&withinDay=${day}`,
          {
            headers: requestHeaders,
          }
        );

        const json = await response.json();
        setPostingData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, [day, userId]);

  return (
    <ActivityCalendar
      data={postingData}
      labels={{
        legend: {
          less: 'Less',
          more: 'More',
        },
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        totalCount: 'Total {{count}} posting in {{year}}',
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      }}
      showWeekdayLabels
      hideColorLegend
      blockSize={16}
      blockMargin={5}
      theme={{
        level0: '#F0F0F0',
        level1: '#dff2ff',
        level2: '#8dcbf7',
        level3: '#2088d3',
        level4: '#002987',
      }}
    />
  );
};

export default YearlyCalendar;
