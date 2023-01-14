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
      <div className={css.moveTopButtonDiv}>
        <button className={css.moveTopButton} onClick={clickMoveTopButton} />
      </div>

      <div className={css.footer}></div>
    </>
  );
};

export default Footer;
