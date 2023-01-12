import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from './TestPage/TestPage';
import TotalPost from './TotalPost/TotalPost';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/totalpost" element={<TotalPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
