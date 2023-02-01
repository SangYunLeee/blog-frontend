import React, { useState, useEffect } from 'react';
import Grass from '../../components/Blog/Grass/Grass';
import css from './Profile.module.scss';

const Profile = ({ userNickname, userImg, userIntro }: any) => {
  return (
    <div className={css.profileContainer}>
      <div className={css.headerWrapper}>
        <img className={css.profileImg} alt="ProfileImg" src={userImg} />
        <div className={css.nicknameWrapper}>
          <h2>{userNickname} 님</h2>
          <div className={css.follow}>
            <p>팔로워</p>
            <p>20</p>
            <p>팔로잉</p>
            <p>22</p>
          </div>
        </div>
      </div>
      <div className={css.content}>{userIntro}</div>
      <div className={css.grass}>
        <Grass />
      </div>
      <button className={css.writeBtn}>게시물 작성하기</button>
    </div>
  );
};

export default Profile;
