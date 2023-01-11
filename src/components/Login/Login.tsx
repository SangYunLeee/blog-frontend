import React, { useState } from 'react';
import LoginInput from '../LoginInput/LoginInput';
import SignUp from '../SignUp/SignUp';
import css from './Login.module.scss';

const Login = () => {
  const [open, setOpen] = useState<boolean>(false); //헤더 만들어지면 헤더에 가야하는 불리언 10번줄도
  const [singUpOpen, setSingUpOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const handleLogin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: id,
        password: pw
      })
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token !== undefined) {
          localStorage.setItem('token', result.token);
          setOpen(false);
        } else {
          alert('아이디와 비밀번호를 확인해 주세요');
        }
      });
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}>로그인</button>
      {open && (
        <div className={css.container}>
          <div className={css.content}>
            {!singUpOpen ? (
              <>
                <div className={css.image}>
                  <img
                    className={css.mainImage}
                    src="image/blog.svg"
                    alt="main pic"
                  />
                  <h5 className={css.slogan}>기록과 함게 쌓여가는 즐거움</h5>
                </div>
                <div className={css.title}>
                  <h2 className={css.login}>로그인</h2>
                  <LoginInput text="이메일" type="text" setFunc={setId} />
                  <LoginInput text="비밀번호" type="password" setFunc={setPw} />
                  <button
                    className={css.loginBtn}
                    onClick={() => handleLogin()}
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
              </>
            ) : (
              <SignUp />
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
