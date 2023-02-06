import React from 'react';
import css from './Poster.module.scss';
import { postDataType } from '../../pages/TotalPost/TotalPost';
import { url } from 'inspector';

interface postProps {
  post: postDataType;
}

const Poster = ({ post }: postProps) => {
  const date = new Date(post.createdAt);
  const currDate = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  const clickPost = (event: any) => {
    console.log(post.user.profileImgUrl);
    // if (
    //   event.target.className ===
    //   document.querySelector(`.${css.userImage}`)?.className
    // )
    //   window.location.href = `https://ttolog.netlify.app/blog/${post.user.id}`;
    // else window.location.href = `https://ttolog.netlify.app/post/${post.id}`;
  };

  return (
    <div className={css.poster} onClick={clickPost}>
      <div className={css.userDataDiv}>
        <div
          className={css.userImage}
          style={{ backgroundImage: `url('${post.user.profileImgUrl}')` }}
        ></div>
        <div className={css.userNickname}>{post.user.nickname}</div>
      </div>
      <div className={css.postMainDiv}>
        <div className={css.currDate}>{currDate}</div>
        <div className={css.postTitle}>{post.title}</div>
        <div
          className={css.content}
          dangerouslySetInnerHTML={{ __html: post.content.slice(0, 100) }}
        ></div>
      </div>
      <div
        className={css.thumbnailDiv}
        style={{
          backgroundImage: `url(${post.thumbnailImgUrl})`,
          backgroundSize: 'cover',
        }}
      ></div>
    </div>
  );
};
export default Poster;
