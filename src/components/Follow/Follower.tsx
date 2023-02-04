import React, { useEffect, useState } from 'react';
import { userId } from './Follow';
import { useNavigate, useParams } from 'react-router-dom';
import css from './Follower.module.scss';

const Follower = ({ userId }: userId) => {
  //해당 유저 블로그로 이동
  const [followerData, setFollowerData] = useState([]);

  const navigate = useNavigate();
  //현재 위치 유저 블로그의 아이디
  const params = useParams();

  const token = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  useEffect(() => {
    //나를 팔로우
    fetch(`${process.env.REACT_APP_API_URL}/follower/user/${userId}`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => setFollowerData(res.data));
  }, [userId]);

  //팔로우, 언팔로우 버튼
  const follow = (value: string, index: number) => () => {
    fetch(`${process.env.REACT_APP_API_URL}/follow`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        targetUsersId: index,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'FOLLOW_SUCCESSFULLY') {
          fetch(`${process.env.REACT_APP_API_URL}/follower/user/${userId}`, {
            headers: requestHeaders,
          })
            .then((res) => res.json())
            .then((res) => setFollowerData(res.data));
        }
      });
  };

  const unFollow = (value: string, index: number) => () => {
    fetch(`${process.env.REACT_APP_API_URL}/follow/${index}`, {
      method: 'DELETE',
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'UNFOLLOW_SUCCESSFULLY') {
          fetch(`${process.env.REACT_APP_API_URL}/follower/user/${userId}`, {
            headers: requestHeaders,
          })
            .then((res) => res.json())
            .then((res) => setFollowerData(res.data));
        }
      });
  };

  return (
    <ul>
      {followerData.map((follower) => {
        const { id, email, nickname, profileImgUrl, registed } = follower;
        return (
          <li
            key={id}
            className={css.followerInfo}
            // onClick={() => navigate('/')}
          >
            <img
              src={profileImgUrl}
              alt="팔로워이미지"
              className={css.followerImg}
            />
            <p className={css.followerContent}>
              <span className={css.nickname}>{nickname}</span>
              <span>{email}</span>
            </p>
            {registed ? (
              <button
                className={css.unFollowBtn}
                onClick={unFollow(nickname, id)}
              >
                언팔로우
              </button>
            ) : (
              <button className={css.followBtn} onClick={follow(nickname, id)}>
                팔로우
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Follower;
