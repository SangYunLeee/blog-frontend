import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import EditProfile from '../../components/EditProfile/EditProfile';
import css from './SettingPage.module.scss';

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  profile: { blogTitle: string; profileIntro: string; profileImgUrl: string };
  startDate: string;
}
const SettingPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nicknameData, setNicknameData] = useState<string>('');
  const [blogTitleData, setBlogTitleData] = useState<string>('');
  const [profileIntroData, setProfileIntroData] = useState<string>('');
  const [profileImg, setProfileImg] = useState<File | undefined>();
  const blogTitles = userInfo?.profile.blogTitle;
  const profileIntros = userInfo?.profile.profileIntro;
  const nickNames = userInfo?.nickname;
  const profileImgUrls = userInfo?.profile.profileImgUrl;
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameData(e.target.value);
  };
  const onChangeBlogTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogTitleData(e.target.value);
  };
  const onChangeProfileIntro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileIntroData(e.target.value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList !== null) {
      setProfileImg(fileList[0]);
    }
  };

  const submitProfile = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore
    if (profileImg) {
      formData.append('profileImg', profileImg);
    }
    formData.append('nickname', nicknameData);
    formData.append('blogTitle', blogTitleData);
    formData.append('profileIntro', profileIntroData);
    alert('프로필 수정 완료!');

    await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}/profile`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.getItem('token'),
      },
    });
    window.location.reload();
  };

  return (
    <div className={css.setting}>
      <Header />
      <div className={css.settingContainer}>
        <EditProfile
          blogTitles={blogTitles}
          profileIntros={profileIntros}
          nickNames={nickNames}
          profileImgUrls={profileImgUrls}
          onChangeNickName={onChangeNickName}
          onChangeBlogTitle={onChangeBlogTitle}
          onChangeProfileIntro={onChangeProfileIntro}
          nicknameData={nicknameData}
          blogTitleData={blogTitleData}
          profileIntroData={profileIntroData}
          onChangeImg={onChangeImg}
        />
        {nicknameData || blogTitleData || profileIntroData ? (
          <div className={css.saveWrapper}>
            <p className={css.saveComment}>
              조심하세요 변경사항이 저장되지 않았어요!
            </p>
            <button className={css.saveButton} onClick={submitProfile}>
              변경사항 저장하기
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SettingPage;
