import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage/BlogPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
