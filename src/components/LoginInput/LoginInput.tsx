import React, { HTMLInputTypeAttribute, Dispatch, SetStateAction } from 'react';
import css from './LoginInput.module.scss';

interface Props {
  text: string;
  type: HTMLInputTypeAttribute;
  setFunc: Dispatch<SetStateAction<string>>;
}

const LoginInput = ({ text, type, setFunc }: Props) => {
  return (
    <div className={css.formWrap}>
      <input
        className={css.loginInput}
        type={type}
        onChange={(e) => setFunc(e.target.value)}
        name="form"
        autoComplete="new-password"
        required
      />
      <label htmlFor="form" className={css.labelName}>
        <span className={css.contentName}>{text}</span>
      </label>
    </div>
  );
};
export default LoginInput;
