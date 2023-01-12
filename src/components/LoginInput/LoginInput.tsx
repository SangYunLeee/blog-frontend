import React, { HTMLInputTypeAttribute, Dispatch, SetStateAction } from 'react';
import css from './LoginInput.module.scss';

interface Props {
  text: string;
  type: HTMLInputTypeAttribute;
  flag?: boolean;
  value?: string;
  setFunc: Dispatch<SetStateAction<string>>;
}

const LoginInput = ({ text, type, setFunc, flag, value }: Props) => {
  return (
    <div className={css.formWrap}>
      <input
        className={css.loginInput}
        type={type}
        onChange={(e) => setFunc(e.target.value)}
        name="form"
        autoComplete="new-password"
        value={value}
        required
      />
      <label htmlFor="form" className={css.labelName}>
        <span className={css.contentName}>{text}</span>
      </label>
    </div>
  );
};
export default LoginInput;
