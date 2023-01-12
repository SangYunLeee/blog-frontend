import React from 'react';
import css from './Footer.module.scss';

const Footer = () => {
  const clickMoveTopButton = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className={css.footer}>
      <button className={css.moveTopButton} onClick={clickMoveTopButton}>
        최상단으로 가는 버튼
      </button>
    </div>
  );
};

export default Footer;
