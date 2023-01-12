import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
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
  const [flags, setFlags] = useState({
    pwFlag: false,
    pwMatchFlag: false,
    idCheck: false,
    nameCheck: false,
  });

  const { pwFlag, pwMatchFlag, idCheck, nameCheck } = flags;
  const emailRegex = /\S+@\S+\.\S+/;

  const change = (name: string, value: boolean) => {
    setFlags((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    const pwRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    change('pwFlag', pwRegex.test(pw));
    change('pwMatchFlag', pw !== rePw);
  }, [pw, rePw]);

  const handleNameCheck = () => {
    fetch(`${process.env.REACT_APP_API_URL}/nickname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: name,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.duplicateNickname) {
          change('nameCheck', true);
          alert('사용 가능한 닉네임 입니다');
        } else {
          alert('이미 존재 하는 닉네임 입니다');
          setName('');
        }
      });
  };

  const handleSignUp = () => {
    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: name,
        email: id,
        password: pw,
      }),
    }).then((response) => response.json());
    alert('회원가입에 성공하였습니다!');
    setFunc(false);
  };

  const handleIdCheck = () => {
    fetch(`${process.env.REACT_APP_API_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.duplicateEmail) {
          change('idCheck', true);
          alert('사용 가능한 이메일 입니다');
        } else {
          alert('이미 존재 하는 이메일 입니다');
          setId('');
        }
      });
  };

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
          <div
            className={css.inputBox}
            onChange={() => change('nameCheck', false)}
          >
            <LoginInput
              text="닉네임"
              type="text"
              setFunc={setName}
              flag={nameCheck}
              value={name}
            />
          </div>
          {nameCheck ? (
            <button className={css.success} disabled={true}>
              확인 완료
            </button>
          ) : (
            <button
              className={css.checkBtn}
              disabled={!(name.length > 0)}
              onClick={handleNameCheck}
            >
              중복 확인
            </button>
          )}
        </div>
        <div className={css.inputWrap}>
          <div
            className={css.inputBox}
            onChange={() => change('idCheck', false)}
          >
            <LoginInput
              text="이메일"
              type="text"
              setFunc={setId}
              flag={idCheck}
              value={id}
            />
          </div>
          {idCheck ? (
            <button className={css.success} disabled={true}>
              확인 완료
            </button>
          ) : (
            <button
              className={css.checkBtn}
              disabled={!emailRegex.test(id)}
              onClick={handleIdCheck}
            >
              중복 확인
            </button>
          )}
        </div>
        <div className={css.inputBox}>
          <LoginInput text="비밀번호" type="password" setFunc={setPw} />
          {!pwFlag && (
            <h5 className={css.pwAlert}>
              비밀번호는 영문, 숫자, 특수문자를 포함하여 8~16자리를
              입력해주세요.
            </h5>
          )}
        </div>
        <div className={css.inputBox}>
          <LoginInput
            text="비밀번호 재입력"
            type="password"
            setFunc={setRePw}
          />
          {pwMatchFlag && (
            <h5 className={css.pwAlert}>비밀번호가 일치하지 않습니다.</h5>
          )}
        </div>
      </div>
      <button
        className={css.signUpBtn}
        disabled={!(idCheck && nameCheck && pwFlag && !pwMatchFlag)}
        onClick={handleSignUp}
      >
        회원가입
      </button>
    </div>
  );
};
export default SignUp;
