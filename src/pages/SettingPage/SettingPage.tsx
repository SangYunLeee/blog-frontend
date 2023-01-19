import React from 'react';
import css from './SettingPage.module.scss';

const SettingPage = () => {
  return (
    <div className={css.settingContainer}>
      <div className={css.infoWrapper}>
        <div className={css.imgWrapper}>
          <img
            className={css.profileImg}
            alt="ProfileImg"
            src="https://mblogthumb-phinf.pstatic.net/MjAyMDA0MDRfMTA5/MDAxNTg1OTgyNzM0NDc4.T5kYmq6tRhKYUyg2VReNW9Lt3XmAVFXj1nm3mgnJkWUg.k-JIS4uUip4cqMMuaqnpgdPPt2qvtkU1Lre99Y9omq8g.JPEG.rara4000/1bd7453343646f106926d6d05f85cd77cb28b0be4679593ca208a4cd0fbd88075e5592f731f6.jpg?type=w800"
          />
          <button className={css.editButton}>EDIT</button>
        </div>
        <div className={css.blogInfo}>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>별명</p>
            <p className={css.infoContent}>나는 너굴맨이야</p>
          </div>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>한줄 소개</p>
            <p className={css.infoContent}>오늘은 어떤가요??</p>
          </div>
          <div className={css.infoWrap}>
            <p className={css.infoTitle}>블로그 이름</p>
            <p className={css.infoContent}>갚아봐요 대출의 숲</p>
          </div>
        </div>
      </div>
      <div className={css.saveWrapper}>
        <p className={css.saveComment}>
          조심하세요 변경사항이 저장되지 않았어요!
        </p>
        <button className={css.saveButton}>변경사항 저장하기</button>
      </div>
    </div>
  );
};

export default SettingPage;
