import React, { useState, useRef, useEffect } from 'react';
import Login from '../Login/Login';
import css from './Header.module.scss';

type userInfoProfile = { blogTitle: string; profileIntro: string };

interface userInfo {
  id: number;
  nickname: string;
  email: string;
  profile: userInfoProfile;
  startDate: string;
}

const Header = () => {
  const [currInputFocus, setCurrInputFocus] = useState<boolean>(false);
  const [currMenuState, setCurrMenuState] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [token, setToken] = useState<null | string>(
    localStorage.getItem('token')
  );
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  const openLogin = () => {
    setOpen(!open);
  };
  const clickUserMenu = () => {
    setCurrMenuState(!currMenuState);
  };
  const openSearchbar = () => {
    setCurrInputFocus(!currInputFocus);
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    if (localStorage.getItem('token'))
      fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: requestHeaders,
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data.data));
  }, [token]);

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
          <div className={css.writePostBtnDiv}>
            {token && <div className={css.writePostBtn}>새 글 작성</div>}
          </div>
          <div className={css.userNameDiv}>
            {token ? (
              <div className={css.userName} onClick={clickUserMenu}>
                <div
                  className={css.userNameText}
                >{`${userInfo?.nickname}님`}</div>
              </div>
            ) : (
              <div className={css.loginBtn} onClick={openLogin}>
                로그인
              </div>
            )}
            {currMenuState && (
              <div className={css.userMenuDiv}>
                <div className={css.userMenu}>개인 정보</div>
                <div className={css.userMenu}>내 블로그</div>
                <div className={css.userMenu} onClick={logout}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
