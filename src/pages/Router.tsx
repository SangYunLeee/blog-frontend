import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import TestPage from './TestPage/TestPage';
import TotalPost from './TotalPost/TotalPost';
import WritePost from './WritePost/WritePost';
import BlogPage from './BlogPage/BlogPage';
import SettingPage from './SettingPage/SettingPage';
import PostDetail from './PostDetail/PostDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/totalpost" element={<TotalPost />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
