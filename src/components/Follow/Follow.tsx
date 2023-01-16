import React, { useState } from 'react';
// import { FollowBtnType } from '../../pages/Home/Home';
import Follower from './Follower';
import Following from './Following';
import css from './Follow.module.scss';

const Follow = () =>
  // { setOpen }: FollowBtnType
  {
    const [selectFollowingBtn, setSelectFollowingBtn] = useState<boolean>(true);
    const [selectFollowerBtn, setSelectFollowerBtn] = useState<boolean>(false);

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

    return (
      <div className={css.modalBackground}>
        <div className={css.followContainer}>
          <div className={css.followButtonContent}>
            <button
              className={css.backBtn}
              // onClick={() => setOpen(false)}
            >
              <img src="./image/back.png" alt="뒤로가기 이미지" />
            </button>
            <div className={css.followBtn}>
              <button
                className={
                  selectFollowingBtn ? css.userFollowing : css.notSelected
                }
                onClick={onFollowingBtn}
              >
                팔로잉
              </button>
              <button
                className={
                  selectFollowerBtn ? css.userFollower : css.notSelected
                }
                onClick={onFollowerBtn}
              >
                팔로워
              </button>
            </div>
          </div>
          <div className={css.followContent}>
            {selectFollowingBtn ? <Following /> : <Follower />}
          </div>
        </div>
      </div>
    );
  };

export default Follow;
