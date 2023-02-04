import React, { useEffect, useRef, useState } from 'react';
import css from './Comment.module.scss';
import { CommentProp } from '../PostDetail';
import { UserInfo } from '../PostDetail';
import { useNavigate } from 'react-router-dom';
interface Props {
  comment: CommentProp;
  user: UserInfo | undefined;
  deleteComment(id: number): void;
  createDate: string;
  reload(): void;
}
const Comment = ({
  comment,
  user,
  deleteComment,
  createDate,
  reload,
}: Props) => {
  const [editFlag, setEditFlag] = useState<Boolean>(true);
  const commentRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = { ...headers, authorization: token };
  }

  const editComment = () => {
    setEditFlag(true);
    fetch(`${process.env.REACT_APP_API_URL}/comments/${comment.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        content: commentRef?.current?.value,
      }),
    }).then(() => {
      reload();
    });
  };

  return (
    <div className={css.eachComment}>
      <div className={css.commentName}>
        <p
          className={css.userName}
          onClick={() => navigate(`/blog/${comment.user.id}`)}
        >
          {comment.user.nickname}
        </p>
        <p className={css.createTime}>{createDate}</p>
      </div>
      <div className={css.c_content}>
        <img
          className={css.profileImg}
          src={comment.user?.profileImgUrl}
          alt="profile"
          onClick={() => navigate(`/blog/${comment.user.id}`)}
        />
        {editFlag ? (
          <div className={css.set}>
            <p className={css.c_comment}>{comment.content}</p>
            {comment.user.id === user?.id ? (
              <div className={css.c_btnWrap}>
                <button
                  className={css.c_deleteBtn}
                  onClick={() => deleteComment(comment.id)}
                >
                  삭제&nbsp;
                </button>
                <span className={css.line}>|</span>
                <button
                  className={css.c_editBtn}
                  onClick={() => setEditFlag(false)}
                >
                  &nbsp;수정
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className={css.editInput}>
            <input
              className={css.InputTag}
              type="text"
              defaultValue={comment.content}
              ref={commentRef}
            />
            <button
              className={css.e_editBtn}
              disabled={
                commentRef?.current?.size === undefined ||
                commentRef.current.size === 0
                  ? false
                  : true
              }
              onClick={editComment}
            >
              수정 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
