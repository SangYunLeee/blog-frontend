import React from 'react';
import css from './Blog.module.scss';

const Blog = () => {
  return (
    <div className={css.blogContainner}>
      <h1 className={css.blogName}>갚아봐요 대출의 숲</h1>
      <div className={css.contentWrapper}>
        <h2 className={css.allContents}>전체 글</h2>
        <hr className={css.border} />
      </div>
      <section className={css.contents}>
        <div className={css.contentWrapper}>
          <p className={css.writeDate}>2023.01.01</p>
          <div className={css.titleWrapper}>
            <h3 className={css.contentTitle}>블로그 제목</h3>
            <p className={css.reply}>(5)</p>
          </div>
          <p className={css.content}>
            블로그 글의 내용들 블로그 글의 내용들블로그 글의 내용들블로그 글의
            내용들블로그 글의 내용들블로그 글의 내용들블로그 글의 내용들
          </p>
        </div>
        <img
          className={css.contentImg}
          src="https://images.unsplash.com/photo-1673322062448-6a50cf43876a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
          alt="BlogImg"
        />
      </section>
    </div>
  );
};

export default Blog;
