/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FollowBtnType } from '../Blog/Profile';
import Follower from './Follower';
import Following from './Following';
import css from './Follow.module.scss';

export type userId = {
  userId: number;
};

const Follow = ({
  open,
  setOpen,
  selectFollowingBtn,
  setSelectFollowingBtn,
  selectFollowerBtn,
  setSelectFollowerBtn,
}: FollowBtnType) => {
  const onFollowingBtn = () => {
    if (selectFollowingBtn === false) {
      setSelectFollowingBtn(true);
      setSelectFollowerBtn(false);
    } else if (selectFollowingBtn === true) {
      setSelectFollowingBtn(true);
    }
  };

  const onFollowerBtn = () => {
    if (selectFollowerBtn === false) {
      setSelectFollowerBtn(true);
      setSelectFollowingBtn(false);
    } else if (selectFollowerBtn === true) {
      setSelectFollowerBtn(true);
    }
  };

  const token = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => setUserId(res.data.id));
  }, []);

  return (
    <div className={css.modalBackground}>
      <div className={css.followContainer}>
        <div className={css.followButtonContent}>
          <div className={css.backBtn} onClick={() => setOpen(false)}>
            <FaArrowLeft />
          </div>
          <div className={css.followBtn}>
            <button
              className={selectFollowerBtn ? css.userFollower : css.notSelected}
              onClick={onFollowerBtn}
            >
              팔로워
            </button>
            <button
              className={
                selectFollowingBtn ? css.userFollowing : css.notSelected
              }
              onClick={onFollowingBtn}
            >
              팔로잉
            </button>
          </div>
        </div>
        <div className={css.followContent}>
          {selectFollowingBtn ? (
            <Following userId={userId} />
          ) : (
            <Follower userId={userId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Follow;
