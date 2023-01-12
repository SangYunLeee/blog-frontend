import React, { useState, Dispatch, SetStateAction } from 'react';
import css from './SignUp.module.scss';
import LoginInput from '../LoginInput/LoginInput';

interface Props {
  setFunc: Dispatch<SetStateAction<boolean>>;
}
const SignUp = ({ setFunc }: Props) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [rePw, setRePw] = useState<string>('');

  return (
    <div className={css.signUpWrap}>
      <div className={css.iconWrap}>
        <img
          className={css.closeIcon}
          src="image/login-close.png"
          alt="close"
          onClick={() => setFunc(false)}
        />
      </div>
      <div className={css.title}>
        <h2 className={css.signUp}>회원가입</h2>
        <div className={css.inputWrap}>
          <div className={css.inputBox}>
            <LoginInput text="닉네임" type="text" setFunc={setName} />
          </div>
          <button className={css.checkBtn} disabled={false}>
            중복 확인
          </button>
        </div>
        <div className={css.inputWrap}>
          <div className={css.inputBox}>
            <LoginInput text="이메일" type="text" setFunc={setId} />
          </div>
          <button className={css.checkBtn} disabled={false}>
            중복 확인
          </button>
        </div>
        <div className={css.inputBox}>
          <LoginInput text="비밀번호" type="password" setFunc={setPw} />
          {/* <h5 className={css.pwAlert}> 비밀번호 조건은 어쩌고저쩌고</h5> */}
        </div>
        <div className={css.inputBox}>
          <LoginInput
            text="비밀번호 재입력"
            type="password"
            setFunc={setRePw}
          />
          {/* <h5 className={css.pwAlert}>일치 ㄴㄴ</h5> */}
        </div>
      </div>
      <button className={css.signUpBtn} disabled={false}>
        회원가입
      </button>
    </div>
  );
};
export default SignUp;
