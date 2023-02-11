import React, { useRef, useState } from 'react';
import css from './EditProfile.module.scss';
import type { UserInfo, LinkUrl, NewUserInfo } from './UserInfoType';

interface Props {
  userInfo: Partial<UserInfo>;
  newUserInfo: Partial<NewUserInfo>;
  setNewUserInfo: React.Dispatch<React.SetStateAction<Partial<NewUserInfo>>>;
}

const EditProfile = ({ userInfo, newUserInfo, setNewUserInfo }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // input 값이 변결될 때 호출함
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempUserInfo;
    if (e.target.name === 'profileImg') {
      const value = e.target.files![0];
      const objectUrl = URL.createObjectURL(value);
      tempUserInfo = {
        ...newUserInfo,
        [e.target.name]: value,
        profileImgUrl: objectUrl,
      };
    } else {
      tempUserInfo = {
        ...newUserInfo,
        [e.target.name]: e.target.value,
      };
    }
    setNewUserInfo(tempUserInfo);
  };

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  const handleAddLinkButtonClick = () => {
    if (newUserInfo.linkUrls) {
      const newLinkUrl = newUserInfo.linkUrls;
      newLinkUrl.value = [...newLinkUrl.value, { title: '', url: '' }];
      setNewUserInfo({
        ...newUserInfo,
        linkUrls: newLinkUrl,
      });
    }
  };

  const handleDeleteLinkButtonClick = (index: number) => {
    const newLinkUrl = newUserInfo.linkUrls;
    newLinkUrl!.value = [...newLinkUrl!.value].filter(
      (item, idx) => idx !== index
    );
    setNewUserInfo({
      ...newUserInfo,
      linkUrls: newLinkUrl,
    });
  };

  const handleInputChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLinkUrl = newUserInfo.linkUrls;
    newLinkUrl!.value = newLinkUrl!.value;
    newLinkUrl!.value[idx][e.target.name] = e.target.value;
    setNewUserInfo({
      ...newUserInfo,
      linkUrls: newLinkUrl,
    });

    console.log('newLinkUrl: ', newLinkUrl);
  };

  const items = [
    {
      placeholder: userInfo?.nickname,
      name: 'nickname',
      title: '별명',
    },
    {
      placeholder: userInfo?.profile?.profileIntro,
      name: 'profileIntro',
      title: '한줄 소개',
    },
    {
      placeholder: userInfo?.profile?.blogTitle,
      name: 'blogTitle',
      title: '블로그 제목',
    },
  ];

  return (
    <div className={css.columnInfoWrapper}>
      <div className={css.infoWrapper}>
        <div className={css.imgWrapper}>
          <label htmlFor="imgInput">
            <img
              className={css.profileImg}
              alt="ProfileImg"
              src={
                newUserInfo?.profileImgUrl || userInfo?.profile?.profileImgUrl
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
        <div className={css.divider} />
        <div className={css.blogInfo}>
          {items.map((item, idx) => (
            <InputItem
              placeholder={item.placeholder || ''}
              value={newUserInfo[item.name]}
              name={item.name}
              title={item.title}
              onChange={handleUserInfoChange}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className={css.linkWrapper}>
        <label className={css.linkTitle}>링크</label>
        {newUserInfo.linkUrls?.value.map((item, idx) => (
          <div className={css.linkItemWrapper} key={idx}>
            <img
              className={css.linkImg}
              src={process.env.REACT_APP_PUBLIC_URL + `/image/link-icon.png`}
              alt=""
            />
            <div className={css.wrapper}>
              <input
                className={css.label}
                placeholder="링크 제목을 입력해주세요"
                value={item.title}
                onChange={(e) => handleInputChange(idx, e)}
                name="title"
              />
              <input
                className={css.input}
                type="text"
                placeholder="http://, https://를 포함해 작성해주세요"
                value={item.url}
                onChange={(e) => handleInputChange(idx, e)}
                name="url"
              />
            </div>
            {idx !== 0 ? (
              <button
                className={css.button}
                onClick={() => {
                  handleDeleteLinkButtonClick(idx);
                }}
              >
                <img
                  className={css.trashIcon}
                  src={
                    process.env.REACT_APP_PUBLIC_URL + `/image/trash-icon.png`
                  }
                  alt=""
                />
              </button>
            ) : (
              ''
            )}
          </div>
        ))}
        <button className={css.button} onClick={handleAddLinkButtonClick}>
          <img
            className={css.PlusImg}
            src={process.env.REACT_APP_PUBLIC_URL + `/image/plus-icon.png`}
            alt=""
          />
          링크 추가
        </button>
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
