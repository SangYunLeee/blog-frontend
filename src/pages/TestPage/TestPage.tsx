import React from 'react';
import css from './TestPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TestPage = () => {
  return (
    <>
      <Header />
      <div className={css.testPage}></div>
      <Footer />
    </>
  );
};

export default TestPage;
