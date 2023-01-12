import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage/BlogPage';
import SettingPage from './SettingPage/SettingPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
