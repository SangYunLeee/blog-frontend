import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Grass from '../../components/Blog/Grass/Grass';
import Follow from '../../components/Follow/Follow';
import css from './Profile.module.scss';

export interface FollowBtnType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectFollowingBtn: boolean;
  setSelectFollowingBtn: Dispatch<SetStateAction<boolean>>;
  selectFollowerBtn: boolean;
  setSelectFollowerBtn: Dispatch<SetStateAction<boolean>>;
}

const Profile = ({ userNickname, userImg, userIntro }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectFollowingBtn, setSelectFollowingBtn] = useState<boolean>(false);
  const [selectFollowerBtn, setSelectFollowerBtn] = useState<boolean>(false);

  const clickFollower = () => {
    setOpen(true);
    setSelectFollowerBtn(true);
    setSelectFollowingBtn(false);
  };

  const clickFollowing = () => {
    setOpen(true);
    setSelectFollowingBtn(true);
    setSelectFollowerBtn(false);
  };

  return (
    <div className={css.profileContainer}>
      <div className={css.headerWrapper}>
        <img className={css.profileImg} alt="ProfileImg" src={userImg} />
        <div className={css.nicknameWrapper}>
          <h2>{userNickname} 님</h2>
          <div className={css.follow}>
            <div className={css.follower} onClick={clickFollower}>
              <p>팔로워</p>
              <p>20</p>
            </div>
            <div className={css.following} onClick={clickFollowing}>
              <p>팔로잉</p>
              <p>22</p>
            </div>
            {open ? (
              <Follow
                open={open}
                setOpen={setOpen}
                selectFollowingBtn={selectFollowingBtn}
                setSelectFollowerBtn={setSelectFollowerBtn}
                selectFollowerBtn={selectFollowerBtn}
                setSelectFollowingBtn={setSelectFollowingBtn}
              />
            ) : null}
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
