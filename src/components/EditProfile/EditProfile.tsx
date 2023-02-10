import React, { useRef } from 'react';
import css from './EditProfile.module.scss';

const EditProfile = ({ userInfo, newUserInfo, handleUserInfoChange }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  const items = [
    {
      placeholder: userInfo?.nickname,
      name: 'nickname',
      title: '별명',
    },
    {
      placeholder: userInfo?.profile.profileIntro,
      name: 'profileIntro',
      title: '한줄 소개',
    },
    {
      placeholder: userInfo?.profile.blogTitle,
      name: 'blogTitle',
      title: '블로그 이름',
    },
  ];

  return (
    <div>
      <div className={css.infoWrapper}>
        <div className={css.imgWrapper}>
          <label htmlFor="imgInput">
            <img
              className={css.profileImg}
              alt="ProfileImg"
              src={
                newUserInfo?.profileImgUrl || userInfo?.profile.profileImgUrl
              }
            />
          </label>
          <input
            className={css.input}
            id="imgInput"
            type="file"
            accept="image/*"
            name="profileImg"
            onChange={handleUserInfoChange}
            ref={fileInputRef}
          />
          <button className={css.editButton} onClick={handleButtonClick}>
            <label htmlFor="imgInput" />
            EDIT
          </button>
        </div>
        <div className={css.blogInfo}>
          {items.map((item, idx) => (
            <InputItem
              placeholder={item.placeholder}
              value={newUserInfo[item.name]}
              name={item.name}
              title={item.title}
              onChange={handleUserInfoChange}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface InputItemProps {
  placeholder: string;
  value: string;
  name: string;
  title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const InputItem = ({
  placeholder,
  value,
  name,
  title,
  onChange,
}: InputItemProps) => {
  return (
    <div className={css.infoWrap}>
      <p className={css.infoTitle}>{title}</p>
      <input
        className={css.infoContent}
        placeholder={placeholder}
        value={value || ''}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default EditProfile;
