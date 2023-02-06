import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxGear } from 'react-icons/rx';
import css from './UserBox.module.scss';

interface userInfo {
  id: number;
  nickname: string;
  email: string;
  profile: { blogTitle: string; profileIntro: string; profileImgUrl: string };
  startDate: string;
}

const UserBox = () => {
  const [userData, setUserData] = useState<userInfo | null>(null);
  const id = userData?.id;
  const token = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  const navigate = useNavigate();

  const userStartDate = userData?.startDate.split('T')[0];
  const now = new Date();
  const start = new Date(`${userStartDate}`);
  const timeDiff = now.getTime() - start.getTime();
  const day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          headers: requestHeaders,
        });
        const json = await response.json();
        setUserData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  return (
    <div className={css.userBoxWrap}>
      <div className={css.userBoxContainer}>
        <div className={css.userInfo}>
          <div className={css.userImg}>
            <img
              className={css.img}
              src={`${userData?.profile.profileImgUrl}`}
              alt="유저 이미지"
            />
            <p className={css.userName}>{`${userData?.nickname}`}</p>
          </div>
          <RxGear
            className={css.settingBtn}
            onClick={() => navigate('/setting')}
          />
        </div>
        <div className={css.dayBox}>
          <p className={css.day}>
            Day
            <span className={css.dayNum}>{`${day}`}</span>
          </p>
        </div>
        <div className={css.blogBtn}>
          <button onClick={() => navigate(`/blog/${id}`)}>내 블로그</button>
          <button onClick={() => navigate(`/write`)}>게시글 작성</button>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
