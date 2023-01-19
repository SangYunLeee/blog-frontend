import React, { useState } from 'react';
import TextEditor from './TextEditor/TextEditor';
import NavBar from './NavBar/NavBar';
import css from './WritePost.module.scss';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Tag from './Tag/Tag';
const axios_ = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

const WritePost = () => {
  const [form, setForm] = useState<Record<string, string | File>>({
    title: '',
    categoryId: '',
    secretType: '0',
    topicId: '1',
    tagNames: '',
    thumbnail: '',
  });

  const [content, setContent] = useState('');
  const [thumbImg, setThumbImg] = useState('');
  const change = (name: string, value: string | File) => {
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
    <>
      <Header />

      <div className={css.totalWrap}>
        {/* <NavBar change={change} handleWritePost={handleWritePost} /> */}
        <div className={css.container}>
          <div className={css.InputWrap}>
            {thumbImg && (
              <span
                className={css.imgDeleteBtn}
                onClick={() => {
                  setThumbImg('');
                  change('thumbnail', '');
                }}
              >
                delete
              </span>
            )}
            <label className={css.fileInput} htmlFor="input-file">
              사진 업로드
            </label>

            {thumbImg && (
              <img
                src={thumbImg}
                alt="thumbnail"
                width="100px"
                height="100px"
              />
            )}

            <input
              accept="image/png,image/jpg,image/jpeg,.heic"
              type="file"
              id="input-file"
              onChange={(e) => {
                if (e.target.files) {
                  change('thumbnail', e.target.files[0]);
                  setThumbImg(URL.createObjectURL(e.target.files[0]));
                }
              }}
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
        <div className={css.tag}>
          <Tag change={change} />
        </div>
      </div>
    </>
  );
};
export default WritePost;
