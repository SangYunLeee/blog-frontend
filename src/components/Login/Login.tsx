import React, { useState, Dispatch, SetStateAction } from 'react';
import LoginInput from '../LoginInput/LoginInput';
import SignUp from '../SignUp/SignUp';
import css from './Login.module.scss';

interface headerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ open, setOpen }: headerProps) => {
  const [singUpOpen, setSingUpOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const handleLogin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: id,
        password: pw,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token !== undefined) {
          localStorage.setItem('token', result.token);
          alert('로그인에 성공하였습니다.');
          setOpen(false);
          window.location.reload();
        } else {
          alert('아이디와 비밀번호를 확인해 주세요');
        }
      });
  };

  return (
    <div>
      {open && (
        <div className={css.container}>
          <div className={css.content}>
            <div className={css.image}>
              <img
                className={css.mainImage}
                src="image/blog.svg"
                alt="main pic"
              />
              <h5 className={css.slogan}>기록과 함께 쌓여가는 즐거움</h5>
            </div>
            {!singUpOpen ? (
              <div className={css.title}>
                <div className={css.iconWrap}>
                  <img
                    className={css.closeIcon}
                    src="image/login-close.png"
                    alt="close"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h2 className={css.login}>로그인</h2>
                <div className={css.inputBox}>
                  <LoginInput text="이메일" type="text" setFunc={setId} />
                </div>
                <div className={css.inputBox}>
                  <LoginInput text="비밀번호" type="password" setFunc={setPw} />
                </div>
                <button
                  className={css.loginBtn}
                  onClick={handleLogin}
                  disabled={!(id.length > 0 && pw.length > 0)}
                >
                  로그인
                </button>
                <div className={css.horizonLine} />
                <p className={css.question}>아직 가입하지 않으셨다면? </p>
                <button
                  className={css.signUpBtn}
                  onClick={() => setSingUpOpen(!singUpOpen)}
                >
                  &nbsp;&nbsp;회원가입
                </button>
              </div>
            ) : (
              <SignUp setFunc={setSingUpOpen} />
            )}
          </div>
          <div
            className={css.backdrop}
            onClick={() => {
              setOpen(false);
              setSingUpOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default Login;
