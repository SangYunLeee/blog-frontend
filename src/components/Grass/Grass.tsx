import React from 'react';
import css from './Grass.module.scss';
import YearlyCalendar from './YearlyCalendar';
import UserBox from './UserBox';

const Grass = () => {
  return (
    <div className={css.grassWrap}>
      <div className={css.leftContainer}>
        <YearlyCalendar />
      </div>
      <div className={css.rightContainer}>
        <UserBox />
      </div>
    </div>
  );
};

export default Grass;
