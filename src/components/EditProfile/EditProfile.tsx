import React from 'react';
import css from './EditProfile.module.scss';
import type { UserInfo } from '../../pages/SettingPage/SettingPage';

export interface Props {
  nicknameData: string;
  setNicknameData: any;
  blogTitleData: string;
  setBlogTitleData: any;
  profileIntroData: string;
  setProfileIntroData: any;
}

const EditProfile = (
  { userInfo }: any,
  {
    nicknameData,
    setNicknameData,
    blogTitleData,
    setBlogTitleData,
    profileIntroData,
    setProfileIntroData,
  }: Props
) => {
  // const profileIntros: string = userInfo.profile.profileIntro;
  console.log(userInfo.profile);
  return (
    <div>
      <div className={css.infoWrapper}>
        <div className={css.imgWrapper}>
          <img
            className={css.profileImg}
            alt="ProfileImg"
            // src={userInfo.profile.profileImgUrl}
          />
          <button className={css.editButton}>EDIT</button>
        </div>
        <div className={css.blogInfo}>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>별명</p>
            <input
              className={css.infoContent}
              placeholder={userInfo.nickname}
              value={nicknameData}
              onChange={(e) => setNicknameData(e.target.value)}
            />
          </div>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>한줄 소개</p>
            <input
              className={css.infoContent}
              // placeholder={profileIntro}
              value={profileIntroData}
              onChange={(e) => setProfileIntroData(e.target.value)}
            />
          </div>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>블로그 이름</p>
            <input
              className={css.infoContent}
              // placeholder={userInfo.profile.blogTitle}
              value={blogTitleData}
              onChange={(e) => setBlogTitleData(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
