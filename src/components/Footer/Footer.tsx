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
    <>
      <button className={css.moveTopButton} onClick={clickMoveTopButton}>
        최상단으로 가는 버튼
      </button>
      <div className={css.footer}></div>
    </>
  );
};

export default Footer;
