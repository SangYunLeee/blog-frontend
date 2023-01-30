import React, { useState, useEffect } from 'react';
import Blog from '../../components/Blog/Blog';
import Profile from '../../components/Blog/Profile';
import Category from '../../components/Blog/Category';
import Header from '../../components/Header/Header';
import css from './BlogPage.module.scss';
import axios from 'axios';

export interface BlogData {
  id: number;
  title: string;
  content: string;
  reply: number;
  thumbnailImgUrl: string;
  createdAt: number;
}
const BlogPage = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [inputData, setInputData] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts?userId=3`)
      .then((res) => res.json())
      .then((data) => setBlogData(data.data));
  }, []);

  const onSearch = blogData.filter((data) => {
    if (inputData == null) return data;
    else if (
      data.title.toLowerCase().includes(inputData.toLowerCase()) ||
      data.content.toLowerCase().includes(inputData.toLowerCase())
    ) {
      return data;
    }
  });

  return (
    <>
      <Header />
      <div className={css.blogContainner}>
        <div className={css.blogWrapper}>
          <Profile />
          <Category
            inputData={inputData}
            setInputData={setInputData}
            onSearch={onSearch}
            blogData={blogData}
          />
        </div>
        <div className={css.blogcontent}>
          <div className={css.blogHeader}>
            <h1 className={css.blogName}>갚아봐요 대출의 숲</h1>
            <div className={css.titleWrapper}>
              <h2 className={css.allContents}>전체 글</h2>
              <hr className={css.border} />
            </div>
          </div>
          {onSearch.map((data) => {
            return <Blog key={data.id} {...data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
