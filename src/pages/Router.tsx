import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import TestPage from './TestPage/TestPage';
import TotalPost from './TotalPost/TotalPost';
import BlogPage from './BlogPage/BlogPage';
import SettingPage from './SettingPage/SettingPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/totalpost" element={<TotalPost />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
