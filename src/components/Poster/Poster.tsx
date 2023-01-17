import React from 'react';
import css from './Poster.module.scss';
import { postDataType } from '../../pages/TotalPost/TotalPost';

interface postProps {
  post: postDataType;
}

const Poster = ({ post }: postProps) => {
  const date = new Date(post.createdAt);
  const currDate = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  console.log(post);

  return (
    <div className={css.poster}>
      <div className={css.userDataDiv}>
        <div className={css.userImage}></div>
        <div className={css.userNickname}>{post.user.nickname}</div>
      </div>
      <div className={css.postMainDiv}>
        <div className={css.currDate}>{currDate}</div>
        <div className={css.postTitle}>{post.title}</div>
        <div className={css.content}>{post.content}</div>
      </div>
      <div
        className={css.thumbnailDiv}
        style={{
          backgroundImage: `url(${post.thumnailImgUrl})`,
          backgroundSize: 'cover',
        }}
      ></div>
    </div>
  );
};
export default Poster;
