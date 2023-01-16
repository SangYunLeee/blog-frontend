import React, { useEffect, useState } from 'react';
import DropDown from '../DropDown/DropDown';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

import css from './AllPost.module.scss';

interface newPostInterface {
  id: string;
  title: string;
  content: string;
  thumnailImgUrl: string;
  createdAt: string;
}

const AllPost = () => {
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
    <ul className={css.allPostContainer}>
      <li className={css.allPostTitle}>
        <span>
          전체 글<button className={css.moreButton}>더보기</button>
        </span>
        <div>
          <DropDown />
        </div>
      </li>
      <div className={css.allPostWrap}>
        <FaChevronLeft className={css.chevron} />
        <div className={css.allPostContent}>
          {newPostData.map((postData) => {
            const { id, title, thumnailImgUrl, createdAt } = postData;
            const date = new Date(createdAt);
            const postingDate = `${date.getFullYear()}.${
              date.getMonth() + 1
            }.${date.getDate()}`;
            return (
              <div key={id} className={css.postBox}>
                <div className={css.postUser}>
                  <img
                    className={css.userImage}
                    src={thumnailImgUrl}
                    alt="유저이미지"
                  />
                  <span className={css.userName}>유저이름</span>
                </div>
                <div className={css.postImg}>
                  <img className={css.thumnail} src={thumnailImgUrl} alt="" />
                </div>
                <div className={css.postTitle}>
                  <span className={css.postingDate}>{postingDate}</span>|
                  <span className={css.titleText}>{title}</span>
                </div>
              </div>
            );
          })}
        </div>
        <FaChevronRight className={css.chevron} />
      </div>
    </ul>
  );
};

export default AllPost;
