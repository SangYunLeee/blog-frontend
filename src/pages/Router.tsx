import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from './TestPage/TestPage';
import Login from '../components/Login/Login';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
