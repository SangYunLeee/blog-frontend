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
}
const SettingPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [nicknameData, setNicknameData] = useState<string>('');
  const [blogTitleData, setBlogTitleData] = useState<string>('');
  const [profileIntroData, setProfileIntroData] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string | any>('');
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);

      const newFileUrl = URL.createObjectURL(event.target.files[0]);
      setFileUrl(newFileUrl);
    }
  };

  // const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   if (file) {
  //     formData.append('file', file[0]);
  //     try {
  //       const response = await axios.patch(
  //         `${process.env.REACT_APP_API_URL}/profile`,
  //         formData,
  //         {
  //           headers: { 'content-type': 'multipart/form-data' },
  //         }
  //       );
  //     } catch (error: any) {
  //       alert('에러!');
  //       throw new Error(error);
  //     }
  //   } else {
  //     alert('이미지 필요!');
  //   }
  // };

  const onEdit = (id: any) => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify({
        nickname: nicknameData,
        blogTitle: blogTitleData,
        profileIntro: profileIntroData,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'PROFILE_UPDATED') {
          setUserInfo(
            userInfo.map((data) =>
              data.id === id
                ? {
                    ...data,
                    nickname: nicknameData,
                    blogTitle: blogTitleData,
                    profileIntro: profileIntroData,
                  }
                : data
            )
          );
          alert('수정완료');
        } else {
          alert('수정 실패');
        }
      });
  };

  return (
    <>
      <Header />
      <div className={css.settingContainer}>
        <EditProfile
          userInfo={userInfo}
          nicknameData={nicknameData}
          setNicknameData={setNicknameData}
          blogTitleData={blogTitleData}
          setBlogTitleData={setBlogTitleData}
          profileIntroData={profileIntroData}
          setProfileIntroData={setProfileIntroData}
          fileUrl={fileUrl}
          imgUploadInput={imgUploadInput}
          onImageChang={onImageChange}
        />
        <div className={css.saveWrapper}>
          <p className={css.saveComment}>
            조심하세요 변경사항이 저장되지 않았어요!
          </p>
          <button className={css.saveButton} onClick={onEdit}>
            변경사항 저장하기
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
