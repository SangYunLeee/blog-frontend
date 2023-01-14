import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import WritePost from './WritePost/WritePost';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
