import React from 'react';
import css from './Rainy.module.scss';

const Rainy = () => {
  const RainDrop = ({ style }: any) => {
    return (
      <p className={css.rainDrop} style={style}>
        💧
      </p>
    );
  };

  const makeRainDrop = () => {
    let animationDelay = '0s';
    let fontSize = '5px';
    const arr = Array.from({ length: 50 }, (v, i) => i);

    return arr.map((el, i) => {
      animationDelay = `${-Math.random() * 10}s`;
      fontSize = `${Math.floor(Math.random() * 20)}px`;

      const style = {
        animationDelay,
        fontSize,
      };
      return <RainDrop key={i} style={style} />;
    });
  };

  return <div className={css.rainContainer}>{makeRainDrop()}</div>;
};

export default Rainy;
