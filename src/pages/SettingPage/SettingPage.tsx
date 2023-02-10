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

export interface NewUserInfo {
  [key: string]: any;
  nickname: string;
  profileIntro: string;
  blogTitle: string;
  profileImg: File;
  profileImgUrl: string;
}

const SettingPage = () => {
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
  const [newUserInfo, setNewUserInfo] = useState<Partial<NewUserInfo>>({});
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');

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

  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  // 유저 초기값 설정
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.data);
      });
  }, []);

  // GC 메모리 해제
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(newUserInfo.profileImgUrl || '');
    };
  }, [newUserInfo.profileImgUrl]);

  const submitProfile = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newUserInfo) {
      if (newUserInfo[key]) {
        formData.append(key, newUserInfo[key]);
      }
    }

    // 변경 요청
    await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}/profile`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(() => alert('프로필 수정 완료!'))
      .catch(() => alert('프로필 변경 실패!'));

    // 변경 사항 프론트에 반영
    await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.data);
      });

    // input 값 리셋
    setNewUserInfo({
      nickname: '',
      profileIntro: '',
      blogTitle: '',
      profileImgUrl: '',
      profileImg: undefined,
    });
  };

  return (
    <div className={css.setting}>
      <Header />
      <div className={css.settingContainer}>
        <EditProfile
          handleUserInfoChange={handleUserInfoChange}
          userInfo={userInfo}
          newUserInfo={newUserInfo}
        />
        {!isObjectEmpty(newUserInfo) ? (
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

function isObjectEmpty(obj: { [key: string]: any }): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      return false;
    }
  }
  return true;
}

export default SettingPage;
