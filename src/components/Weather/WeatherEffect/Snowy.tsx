import React from 'react';
import css from './Snowy.module.scss';
import Snowfall from 'react-snowfall';

const Snowy = () => {
  return (
    <div className={css.snowContainer}>
      <Snowfall
        color="white"
        snowflakeCount={50}
        speed={[0, 1.0]}
        wind={[0, 0.5]}
      />
    </div>
  );
};

export default Snowy;
