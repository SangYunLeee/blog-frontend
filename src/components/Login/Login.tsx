import React, { useState } from 'react';
import css from './Login.module.scss';
import LoginInput from '../LoginInput/LoginInput';

const Login = () => {
  const [open, isOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => isOpen(!open)}>로그인</button>
      {open && (
        <div className={css.container}>
          <div className={css.content}>
            <div className={css.image} />
            <div className={css.title}>
              <h2 className={css.login}>로그인</h2>
              <LoginInput text="아이디" type="text" />
              <LoginInput text="비밀번호" type="password" />
              <button className={css.loginBtn}>로그인</button>
              <div className={css.horizonLine} />
              <p className={css.question}>아직 가입하지 않으셨다면? </p>
              <button className={css.signUpBtn}>&nbsp;&nbsp;회원가입</button>
            </div>
          </div>
          <div className={css.backdrop} onClick={() => isOpen(!open)} />
        </div>
      )}
    </div>
  );
};
export default Login;
