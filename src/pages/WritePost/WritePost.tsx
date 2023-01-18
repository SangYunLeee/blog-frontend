import React, { useState } from 'react';
import TextEditor from './TextEditor/TextEditor';
import NavBar from './NavBar/NavBar';
import css from './WritePost.module.scss';
import axios from 'axios';

const axios_ = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

const WritePost = () => {
  const [form, setForm] = useState<Record<string, string>>({
    title: '',
    categoryId: '0',
    secretType: '0',
    topicId: '1',
    tagNames: '',
    thumnail: '',
  });

  const [content, setContent] = useState('');

  const change = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleWritePost = async () => {
    let blogData = new FormData();
    const objKeys = Object.keys(form);

    blogData.append('content', content);
    for (let i = 0; i < objKeys.length; i++) {
      const key: string = objKeys[i];
      if (form[key] !== '') {
        blogData.append(key, form[key]);
      }
    }

    await axios_({
      method: 'POST',
      url: `/posts`,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.getItem('token'),
      },
      data: blogData,
    });
  };

  return (
    <div className={css.totalWrap}>
      <NavBar change={change} />
      <button onClick={handleWritePost}> 제출</button>
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
          <input
            onChange={(e) => change('title', e.target.value)}
            className={css.titleInput}
            type="text"
            placeholder="제목"
          />
        </div>
        <TextEditor setContent={setContent} />
      </div>
    </div>
  );
};
export default WritePost;
