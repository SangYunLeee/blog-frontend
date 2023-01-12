import React, { useState, useEffect } from 'react';
import css from './BlogPage.module.scss';
import Blog from '../../components/Blog/Blog';
import Profile from '../../components/Blog/Profile';
import Category from '../../components/Blog/Category';

export interface BlogData {
  id: number;
  title: string;
  content: string;
  reply: number;
  img: string;
  date: string;
}
const BlogPage = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);

  useEffect(() => {
    fetch('../data/blogdata.json')
      .then((res) => res.json())
      .then((data) => setBlogData(data.data));
  }, []);

  return (
    <div className={css.blogContainner}>
      <div className={css.blogWrapper}>
        <Profile />
        <Category />
      </div>
      <div className={css.blogcontent}>
        <div className={css.blogHeader}>
          <h1 className={css.blogName}>갚아봐요 대출의 숲</h1>
          <div className={css.titleWrapper}>
            <h2 className={css.allContents}>전체 글</h2>
            <hr className={css.border} />
          </div>
        </div>
        {blogData.map((data) => {
          return <Blog key={data.id} {...data} />;
        })}
      </div>
    </div>
  );
};

export default BlogPage;
