import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userId } from './Follow';
import css from './Following.module.scss';

const Following = ({ userId }: userId) => {
  const [followingData, setFollowingData] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const token = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  const goBlog = (id: number) => () => {
    navigate(`/blog/${id}`);
    window.location.reload();
  };

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
          fetch(
            `${process.env.REACT_APP_API_URL}/following/user/${params.id}`,
            {
              headers: requestHeaders,
            }
          )
            .then((res) => res.json())
            .then((res) => setFollowingData(res.data));
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
          fetch(
            `${process.env.REACT_APP_API_URL}/following/user/${params.id}`,
            {
              headers: requestHeaders,
            }
          )
            .then((res) => res.json())
            .then((res) => setFollowingData(res.data));
        }
      });
  };

  useEffect(() => {
    //내가 팔로잉
    fetch(`${process.env.REACT_APP_API_URL}/following/user/${params.id}`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => setFollowingData(res.data));
  }, []);

  return (
    <ul>
      {followingData.map((follower) => {
        const { id, email, nickname, profileImgUrl, registed } = follower;
        return (
          <li key={id} className={css.followerInfo}>
            <img
              src={profileImgUrl}
              alt="팔로워이미지"
              className={css.followerImg}
            />
            <p className={css.followerContent} onClick={goBlog(id)}>
              <span className={css.nickname}>{nickname}</span>
              <span>{email}</span>
            </p>
            {id === userId ? null : (
              <div>
                {registed ? (
                  <button
                    className={css.unFollowBtn}
                    onClick={unFollow(nickname, id)}
                  >
                    언팔로우
                  </button>
                ) : (
                  <button
                    className={css.followBtn}
                    onClick={follow(nickname, id)}
                  >
                    팔로우
                  </button>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Following;
