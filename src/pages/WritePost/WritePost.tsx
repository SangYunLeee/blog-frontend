import React, { useEffect, useState } from 'react';
import TextEditor from './TextEditor/TextEditor';
import NavBar from './NavBar/NavBar';
import css from './WritePost.module.scss';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Tag from './Tag/Tag';
import { useNavigate } from 'react-router-dom';
import { postDataType } from '../TotalPost/TotalPost';

const axios_ = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

interface Props {
  status?: string;
  postId?: string;
}

const WritePost = ({ status, postId }: Props) => {
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
  const [post, setPost] = useState<postDataType>();

  const change = (name: string, value: string | File) => {
    setForm({ ...form, [name]: value });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => setPost(res.data));
    }
  }, []);

  useEffect(() => {
    if (post) {
      if (post.category.id) {
        change('categoryId', String(post.category.id));
      }
      if (post.secretType) {
        change('secretType', String(post.secretType));
      }
      if (post.topic.topicName) {
        change('TopicId', String(post.topic.id));
      }
    }
  }, [post]);

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

    if (status) {
      await axios_({
        method: 'PATCH',
        url: `/posts/${postId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token'),
        },
        data: blogData,
      }).then((res) => {
        navigate(`/post/${postId}`);
        window.location.reload();
      });
    } else {
      await axios_({
        method: 'POST',
        url: `/posts`,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token'),
        },
        data: blogData,
      }).then((res) => navigate(`/post/${res.data.data.postId}`));
    }
  };

  return (
    <>
      <Header />
      <div className={css.totalWrap}>
        <div className={css.container}>
          <div className={css.nav}>
            <NavBar
              change={change}
              p_topicId={String(post?.topic.id)}
              p_secretType={String(post?.secretType)}
              p_categoryId={String(post?.category.id)}
            />
          </div>
          <div className={css.containerWrap}>
            <div className={css.InputWrap}>
              <input
                accept="image/png,image/jpg,image/jpeg,.heic"
                type="file"
                id="input-file"
                onChange={(e) => {
                  if (e.target.files) {
                    change('thumbnail', e.target.files[0]);
                    setThumbImg(URL.createObjectURL(e.target.files[0]));
                    e.target.value = '';
                  }
                }}
              />

              {thumbImg ? (
                <>
                  <label htmlFor="input-file">
                    <img
                      className={css.fileInput}
                      src={
                        process.env.REACT_APP_PUBLIC_URL + `/image/whitePic.png`
                      }
                      alt="addPic"
                    />
                  </label>
                  <img
                    className={css.imgDeleteBtn}
                    onClick={(e) => {
                      URL.revokeObjectURL(thumbImg);
                      setThumbImg('');
                      change('thumbnail', '');
                    }}
                    src="./image/tagDelete.png"
                    alt="close"
                  />
                </>
              ) : (
                <label htmlFor="input-file">
                  <img
                    className={css.fileInput}
                    src={
                      process.env.REACT_APP_PUBLIC_URL + `/image/blackPic.png`
                    }
                    alt="addPic"
                  />
                </label>
              )}
              <div className={`${thumbImg ? css.after : css.before}`}>
                <input
                  onChange={(e) => change('title', e.target.value)}
                  className={`${
                    css.titleInput + (thumbImg ? ' ' + css.after : ' ')
                  }`}
                  type="text"
                  placeholder="제목"
                  defaultValue={post?.title}
                />
                {thumbImg && (
                  <>
                    <p className={css.grayBack} />
                    <img
                      className={css.thumbImg}
                      src={thumbImg}
                      alt="thumbnail"
                      width="100px"
                      height="100px"
                    />
                  </>
                )}
              </div>
            </div>
            <div className={css.editor}>
              <TextEditor setContent={setContent} content={post?.content} />
            </div>
          </div>
        </div>
        <div className={css.tag}>
          <Tag
            change={change}
            handleWritePost={handleWritePost}
            status={status}
            post={post}
          />
        </div>
      </div>
    </>
  );
};
export default WritePost;
