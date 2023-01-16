import React from 'react';
import css from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={css.profileContainer}>
      <div className={css.headerWrapper}>
        <img
          className={css.profileImg}
          alt="ProfileImg"
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDA0MDRfMTA5/MDAxNTg1OTgyNzM0NDc4.T5kYmq6tRhKYUyg2VReNW9Lt3XmAVFXj1nm3mgnJkWUg.k-JIS4uUip4cqMMuaqnpgdPPt2qvtkU1Lre99Y9omq8g.JPEG.rara4000/1bd7453343646f106926d6d05f85cd77cb28b0be4679593ca208a4cd0fbd88075e5592f731f6.jpg?type=w800"
        />
        <div className={css.nicknameWrapper}>
          <h2>너굴맨</h2>
          <div className={css.follow}>
            <p>팔로워</p>
            <p>20</p>
            <p>팔로잉</p>
            <p>22</p>
          </div>
        </div>
      </div>
      <div className={css.content}>안녕 나는 너굴맨이라구!</div>
      <div className={css.grass}>grass</div>
      <button className={css.writeBtn}>게시물 작성하기</button>
    </div>
  );
};

export default Profile;
