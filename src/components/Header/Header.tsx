import React, { useState } from 'react';
import css from './Header.module.scss';

const Header = () => {
  const [currInputFocus, setCurrInputFocus] = useState<boolean>(false);
  const [currMenuState, setCurrMenuState] = useState<boolean>(false);

  const clickUserMenu = () => {
    setCurrMenuState(!currMenuState);
  };

  return (
    <div className={css.header}>
      <div className={css.logo}>로고</div>

      <div className={css.headerRightArea}>
        <div className={css.searchbar}>
          <input
            className={currInputFocus ? css.inputFocus : css.inputBlur}
            onFocus={() => {
              setCurrInputFocus(true);
            }}
            onBlur={() => {
              setCurrInputFocus(false);
            }}
          />
          <div className={css.searchIcon}>icon</div>
        </div>
        <div className={css.userMenu} onClick={clickUserMenu}>
          {`${'너굴'}님`}
          {currMenuState && <div className={css.userMenuDiv} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
