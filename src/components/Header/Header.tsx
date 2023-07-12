import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Login from '../Login/Login';
import css from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
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
  const [userId, setUserId] = useState<userInfo | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);

  const requestHeaders: HeadersInit = new Headers();
  const navigate = useNavigate();
  requestHeaders.set('Content-Type', 'application/json');

  const openLogin = () => {
    setOpen(!open);
  };
  const clickUserMenu = () => {
    setCurrMenuState(!currMenuState);
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = `/`;
  };
  const searchingInputKeyword = (event: any) => {
    if (event.keyCode === 13) {
      window.location.href = `/searchpost?searchKeyword=${event.target.value}`;
    }
  };

  useEffect(() => {
    if (token) {
      requestHeaders.set('Authorization', token);
    }
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    if (localStorage.getItem('token'))
      fetch(`${process.env.REACT_APP_API_URL}/users`, {
        headers: requestHeaders,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data.data.nickname);
          setUserId(data.data.id);
        });
  }, [token]);

  return (
    <>
      <Login open={open} setOpen={setOpen} />
      <div className={css.header}>
        <div className={css.logo} onClick={() => navigate('/')}>
          <img
            src={process.env.REACT_APP_PUBLIC_URL + '/image/logo.png'}
            alt=""
          />
        </div>
        <div className={css.headerRightArea}>
          <div className={css.searchbar}>
            <input
              className={currInputFocus ? css.inputFocus : css.inputBlur}
              onFocus={() => setCurrInputFocus(!currInputFocus)}
              onBlur={(e) => {
                setCurrInputFocus(!currInputFocus);
                e.target.value = '';
              }}
              ref={searchInput}
              onKeyDown={searchingInputKeyword}
            />
            <div className={css.searchIconDiv}>
              <div className={css.searchIcon} />
            </div>
          </div>
          <div className={css.writePostBtnDiv}>
            {token && (
              <div
                className={css.writePostBtn}
                onClick={() => navigate('/write')}
              >
                새 글 작성
              </div>
            )}
          </div>
          <div className={css.userNameDiv}>
            {token ? (
              <div className={css.userName} onClick={clickUserMenu}>
                <div className={css.userNameText}>{`${userInfo}님`}</div>
              </div>
            ) : (
              <div className={css.loginBtn} onClick={openLogin}>
                로그인
              </div>
            )}
            {currMenuState && (
              <div className={css.userMenuDiv}>
                <div
                  className={css.userMenu}
                  onClick={() => navigate('/setting')}
                >
                  개인 정보
                </div>
                <div
                  className={css.userMenu}
                  onClick={() => navigate(`/blog/${userId}`)}
                >
                  내 블로그
                </div>
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
