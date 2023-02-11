import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import EditProfile from '../../components/EditProfile/EditProfile';
import type {
  LinkUrl,
  NewUserInfo,
  UserInfo,
} from '../../components/EditProfile/UserInfoType';
import css from './SettingPage.module.scss';
import ModifiedValue from '../../components/EditProfile/ModefiedClass';

const SettingPage = () => {
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});
  const [newUserInfo, setNewUserInfo] = useState<Partial<NewUserInfo>>({});
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');

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
        const userData = data.data as UserInfo;
        setUserInfo(userData);
        setNewUserInfo(getInitialNewUserInfo(userData));
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

    // form 데이터에 보낼 정보를 담는다.
    for (const key in newUserInfo) {
      if (key === 'linkUrls') {
        if (newUserInfo[key]?.isModified()) {
          formData.append(key, JSON.stringify(newUserInfo[key]?.value));
        }
      } else if (newUserInfo[key]) {
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
    const userInfo = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.data);
        return data.data;
      });

    // input 값 리셋
    setNewUserInfo(getInitialNewUserInfo(userInfo as UserInfo));
  };

  return (
    <div className={css.setting}>
      <Header />
      <div className={css.settingContainer}>
        <EditProfile
          userInfo={userInfo}
          newUserInfo={newUserInfo}
          setNewUserInfo={setNewUserInfo}
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

const isObjectEmpty = (obj: { [key: string]: any }): boolean => {
  for (const key in obj) {
    if (key === 'linkUrls') {
      if (obj[key].isModified()) {
        return false;
      }
    } else if (obj[key]) {
      return false;
    }
  }
  return true;
};

const getInitialNewUserInfo = (userInfo: UserInfo): Partial<NewUserInfo> => {
  const profileUrl = new ModifiedValue<LinkUrl[]>(
    userInfo.profile.profileUrls.length
      ? userInfo.profile.profileUrls
      : [{ title: '', url: '' }]
  );
  return {
    linkUrls: profileUrl,
  };
};

export default SettingPage;
