import React, { useEffect, useState } from 'react';
import css from './Follower.module.scss';

interface followerInterface {
  id: string;
  email: string;
  nickname: string;
  userImage: string;
}

const Follower = () => {
  const [followerData, setFollowerData] = useState<followerInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/follower.json');
        const json = await response.json();
        setFollowerData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {followerData.map((follower) => {
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
            <button className={css.followBtn}>언팔로우</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Follower;
