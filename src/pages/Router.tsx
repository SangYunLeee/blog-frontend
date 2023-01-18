import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import TestPage from './TestPage/TestPage';
import TotalPost from './TotalPost/TotalPost';
import WritePost from './WritePost/WritePost';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/totalpost" element={<TotalPost />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
