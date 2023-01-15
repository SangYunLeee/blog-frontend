import React, { useEffect, useState } from 'react';
import DropDown from '../DropDown/DropDown';
import css from './NewPost.module.scss';

interface newPostInterface {
  id: string;
  title: string;
  content: string;
  thumnailImgUrl: string;
  createdAt: string;
}

const NewPost = () => {
  const [newPostData, setNewPostData] = useState<newPostInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`./data/post.json`);
        const json = await response.json();
        setNewPostData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);
  return (
    <ul className={css.newPostContainer}>
      <li className={css.newPostTitle}>
        <span>
          이웃 새 글<button className={css.moreButton}>더보기</button>
        </span>
        <div>
          <DropDown />
        </div>
      </li>
      {newPostData.map((postData) => {
        const { id, title, content, thumnailImgUrl, createdAt } = postData;
        const date = new Date(createdAt);
        const postingDate = `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()}`;
        return (
          <li key={id} className={css.newPostContent}>
            <div className={css.userInfo}>
              <img
                className={css.userImg}
                src={thumnailImgUrl}
                alt="유저이미지"
              />
              <span>여울이</span>
            </div>
            <div className={css.postContent}>
              <p className={css.postingTime}>{postingDate}</p>
              <p className={css.postingTitle}>{title}</p>
              <p className={css.postingContent}>{content}</p>
            </div>
            <div className={css.thumnailContent}>
              {thumnailImgUrl === null ? null : (
                <img
                  src={thumnailImgUrl}
                  alt="썸네일"
                  className={css.postThumnail}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NewPost;
