import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import AllPost from '../../components/BlogPost/AllPost';
import NewPost from '../../components/BlogPost/NewPost';
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
  return (
    <div className={css.home}>
      <div className={css.homeContainer}>
        <section className={css.carouselContent}>
          <Carousel />
        </section>
        <section className={css.allPost}>
          <AllPost />
        </section>
        <section className={css.newPost}>
          <NewPost />
        </section>
      </div>
    </div>
  );
};

export default Home;
