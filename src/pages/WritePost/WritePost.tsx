import React from 'react';
import TextEditor from './TextEditor/TextEditor';
import css from './WritePost.module.scss';

const WritePost = () => {
  return (
    <div className={css.totalWrap}>
      <div className={css.container}>
        <input className={css.titleInput} placeholder="제목" type="text" />
        <TextEditor />
      </div>
    </div>
  );
};
export default WritePost;
