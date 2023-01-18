import React from 'react';
import css from './Blog.module.scss';
import type { BlogData } from '../../pages/BlogPage/BlogPage';

const Blog = (
  props: Pick<BlogData, 'title' | 'content' | 'reply' | 'img' | 'date'>
) => {
  const { title, content, reply, img, date } = props;

  return (
    <div className={css.blogContainner}>
      <section className={css.contents}>
        <div className={css.contentWrapper}>
          <p className={css.writeDate}>{date}</p>
          <div className={css.titleWrapper}>
            <h3 className={css.contentTitle}>{title}</h3>
            <p className={css.reply}>({reply})</p>
          </div>
          <p className={css.content}>{content}</p>
        </div>
        <img className={css.contentImg} src={img} alt="BlogImg" />
      </section>
    </div>
  );
};

export default Blog;
