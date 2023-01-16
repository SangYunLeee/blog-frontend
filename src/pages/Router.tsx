import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import TestPage from './TestPage/TestPage';
import TotalPost from './TotalPost/TotalPost';
import Login from '../components/Login/Login';
import Home from './Home/Home';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/totalpost" element={<TotalPost />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;