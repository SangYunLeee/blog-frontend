import React, { useState, useEffect } from 'react';
import css from './BlogPage.module.scss';
import Blog from '../../components/Blog/Blog';
import Profile from '../../components/Blog/Profile';
import Category from '../../components/Blog/Category';

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);

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
      <Blog />
    </div>
  );
};

export default BlogPage;
