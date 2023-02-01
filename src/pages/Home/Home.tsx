import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import AllPost from '../../components/BlogPost/AllPost';
import NewPost from '../../components/BlogPost/NewPost';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import css from './Home.module.scss';
//import React, { useState, Dispatch, SetStateAction } from 'react';
// import Follow from '../../components/Follow/Follow';

// 팔로우 연결
// export interface FollowBtnType {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

const Home = () => {
  // const [open, setOpen] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  return (
    <>
      <Header />
      <div className={css.home}>
        <section className={css.carouselContent}>
          <Carousel />
        </section>
        <div className={css.homeContainer}>
          <div className={css.postContent}>
            <section className={css.allPost}>
              <AllPost />
            </section>
            <section className={css.newPost}>
              {token === null ? null : <NewPost />}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
