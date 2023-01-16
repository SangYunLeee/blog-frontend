import React from 'react';
import TextEditor from './TextEditor/TextEditor';
import NavBar from './NavBar/NavBar';
import css from './WritePost.module.scss';

const WritePost = () => {
  return (
    <div className={css.totalWrap}>
      <NavBar />
      <div className={css.container}>
        <div className={css.InputWrap}>
          <label className={css.fileInput} htmlFor="input-file">
            사진 업로드
          </label>
          <input
            accept="image/png,image/jpg,image/jpeg,.heic"
            type="file"
            id="input-file"
          />
          <input className={css.titleInput} type="text" placeholder="제목" />
        </div>
        <TextEditor />
      </div>
    </div>
  );
};
export default WritePost;
