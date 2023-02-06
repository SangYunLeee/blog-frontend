import React from 'react';
import css from './EditProfile.module.scss';

interface Props {
  nicknameData: string;
  blogTitleData: string;
  profileIntroData: string;
  submitHandler: any;
  onImageChange: any;
  imgUploadInput: any;
}

const EditProfile = (
  {
    blogTitles,
    nickNames,
    profileIntros,
    profileImgUrls,
    onChangeNickName,
    onChangeBlogTitle,
    onChangeProfileIntro,
    onChangeImg,
  }: any,
  { nicknameData, blogTitleData, profileIntroData }: Props
) => {
  return (
    <div>
      <div className={css.infoWrapper}>
        <div className={css.imgWrapper}>
          <label htmlFor="imgInput">
            <img
              className={css.profileImg}
              alt="ProfileImg"
              src={profileImgUrls}
            />
          </label>
          <input
            id="imgInput"
            type="file"
            accept="image/*"
            onChange={onChangeImg}
          />
          <button className={css.editButton}>EDIT</button>
        </div>
        <div className={css.blogInfo}>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>별명</p>
            <input
              className={css.infoContent}
              placeholder={nickNames}
              defaultValue={nicknameData}
              onChange={onChangeNickName}
            />
          </div>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>한줄 소개</p>
            <input
              className={css.infoContent}
              placeholder={profileIntros}
              defaultValue={profileIntroData}
              onChange={onChangeProfileIntro}
            />
          </div>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>블로그 이름</p>
            <input
              className={css.infoContent}
              placeholder={blogTitles}
              defaultValue={blogTitleData}
              onChange={onChangeBlogTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
