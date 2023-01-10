import React, { HTMLInputTypeAttribute } from 'react';
import css from './LoginInput.module.scss';

interface Props {
  text: string;
  type: HTMLInputTypeAttribute;
}

const LoginInput = ({ text, type }: Props) => {
  return (
    <div>
      <span className={css.inputLabel}>{text}</span>
      <input id="userId" className={css.loginInput} type={type} />
    </div>
  );
};
export default LoginInput;
