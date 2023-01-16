import React, { useEffect, useState } from 'react';
import css from './Following.module.scss';

interface followingInterface {
  id: string;
  email: string;
  nickname: string;
  userImage: string;
}

const Following = () => {
  const [followingData, setFollowingData] = useState<followingInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`./data/following.json`);
        const json = await response.json();
        setFollowingData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {followingData.map((follower) => {
        const { id, email, nickname, userImage } = follower;
        return (
          <li key={id} className={css.followerInfo}>
            <img
              src={userImage}
              alt="팔로워이미지"
              className={css.followerImg}
            />
            <p className={css.followerContent}>
              <span className={css.nickname}>{nickname}</span>
              <span>{email}</span>
            </p>
            <button className={css.followBtn}>취소</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Following;
