import React, { useEffect, useState } from 'react';
import css from './PostDetail.module.scss';
import { useParams } from 'react-router-dom';
import { postDataType } from '../TotalPost/TotalPost';
import Header from '../../components/Header/Header';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type userInfoProfile = {
  blogTitle: string;
  profileIntro: string;
  profileImgUrl: string;
};

interface userInfo {
  id: number;
  nickname: string;
  email: string;
  profile: userInfoProfile;
  startDate: string;
}

//모두가 볼수 있는 게시물 이여야함
const PostDetail = () => {
  const [post, setPost] = useState<postDataType>();
  const [user, setUser] = useState<userInfo>();
  const [comment, setComment] = useState<string>('');
  const url = window.location.href;
  const params = useParams();

  const token = localStorage.getItem('token');
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = { ...headers, authorization: token };
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setPost(res.data));

    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((res) => setUser(res.data));
  }, []);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`, {
      method: 'DELETE',
      headers,
    }).then(() => alert('삭제 완료 되었습니다'));
  };

  return post ? (
    <div className={css.container}>
      <Header />
      <div className={css.contentWrap}>
        <div className={css.category}>
          {post.category.categoryName ? post.category.categoryName : '전체'}
        </div>
        <div className={css.innerWrap}>
          <div className={css.btnWrap}>
            {post.user.id === user?.id ? (
              <>
                <button className={css.deleteBtn} onClick={handleDelete}>
                  삭제&nbsp;
                </button>
                <span>|</span>
                <button className={css.editBtn}>&nbsp;수정</button>
              </>
            ) : null}
            <CopyToClipboard text={url}>
              <button
                className={css.shareBtn}
                onClick={() => alert('링크가 복사 되었습니다!')}
              >
                공유하기
              </button>
            </CopyToClipboard>
          </div>
          <div className={css.headerWrap}>
            <div className={css.profile}>
              <img
                className={css.profileImg}
                src={post.user.profileImgUrl}
                alt="profile"
              />
              <p className={css.name}>{post.user.nickname}</p>
            </div>
            <div className={css.titleWrap}>
              <h1 className={css.title}>{post.title}</h1>
              <p className={css.time}>{post.createdAt}</p>
            </div>
          </div>
          <div className={css.content}>
            <img
              className={css.thumbnail}
              src={post.thumbnailImgUrl}
              alt="thumbnail"
            />
            <div
              className={css.postContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          {post.tags.length > 0 && (
            <div className={css.tags}>
              {post.tags.map((e, idx) => (
                <div className={css.tag} key={idx}>
                  #{e.tagName}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 댓글부분
        1. 댓글 추가 
        댓글 불러오기 
        그사람 유저 검색?
        */}
        <div className={css.comments}>
          <div className={css.commentInput}>
            <img
              className={css.commentImg}
              src={user?.profile.profileImgUrl}
              alt="profile"
            />
            <input
              className={css.InputText}
              type="text"
              placeholder="댓글을 입력하여 주세요."
              onChange={(e) => setComment(e.target.value)}
            />
            <button className={css.commentBtn} disabled={comment.length < 1}>
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PostDetail;
