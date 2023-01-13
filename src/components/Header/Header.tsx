import React, { useState, useRef, useEffect } from 'react';
import Login from '../Login/Login';
import css from './Header.module.scss';

const Header = () => {
  const [currInputFocus, setCurrInputFocus] = useState<boolean>(false);
  const [currMenuState, setCurrMenuState] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [token, setToken] = useState<null | string>(
    localStorage.getItem('token')
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);

  const openLogin = () => {
    setOpen(!open);
  };
  const clickUserMenu = () => {
    setCurrMenuState(!currMenuState);
  };
  const openSearchbar = () => {
    setCurrInputFocus(!currInputFocus);
  };

  return (
    <>
      <Login open={open} setOpen={setOpen} />
      <div className={css.header}>
        <div className={css.logo}>로고</div>
        <div className={css.headerRightArea}>
          <div className={css.searchbar}>
            <input
              className={currInputFocus ? css.inputFocus : css.inputBlur}
              ref={searchInput}
            />
            <div className={css.searchIconDiv}>
              <div className={css.searchIcon} onClick={openSearchbar} />
            </div>
          </div>
          <div className={css.userMenu}>
            {token ? (
              <div className={css.userName} onClick={clickUserMenu}>
                {`${'너굴'}님`}
              </div>
            ) : (
              <div className={css.loginBtn} onClick={openLogin}>
                로그인
              </div>
            )}
            {currMenuState && <div className={css.userMenuDiv} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
