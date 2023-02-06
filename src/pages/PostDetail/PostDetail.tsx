import React, { useEffect, useState } from 'react';
import css from './PostDetail.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { postDataType } from '../TotalPost/TotalPost';
import Header from '../../components/Header/Header';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Comment from './Comment/Comment';
import WritePost from '../WritePost/WritePost';

type userInfoProfile = {
  blogTitle: string;
  profileIntro: string;
  profileImgUrl: string;
};

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  profile: userInfoProfile;
  startDate: string;
  profileImgUrl: string;
}

export interface CommentProp {
  id: number;
  content: string;
  createDate: string;
  createdDate: string;
  user: UserInfo;
}

//모두가 볼수 있는 게시물 이여야함
const PostDetail = () => {
  const [post, setPost] = useState<postDataType>();
  const [user, setUser] = useState<UserInfo>();
  const [comment, setComment] = useState<string>('');
  const [postEdit, setPostEdit] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentProp[]>([]);
  const url = window.location.href;
  const params = useParams();
  const navigate = useNavigate();
  const [postDate, setPostDate] = useState<string>();
  const token = localStorage.getItem('token');

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = { ...headers, authorization: token };
  }
  const reload = () => {
    fetch(`${process.env.REACT_APP_API_URL}/comments/${params.id}`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((res) => setCommentList(res.data));
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((res) => setPost(res.data));

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((res) => setUser(res.data));

    reload();
  }, []);

  useEffect(() => {
    if (post) {
      const date = new Date(post.createdAt);
      setPostDate(
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      );
    }
  }, [post]);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`, {
      method: 'DELETE',
      headers,
    }).then(() => {
      navigate(`/blog/${user?.id}`);
    });
  };

  const deleteComment = async (id: number) => {
    await fetch(`${process.env.REACT_APP_API_URL}/comments/${id}`, {
      method: 'DELETE',
      headers,
    }).then(() => {
      reload();
    });
  };

  const handleComment = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        postId: params.id,
        content: comment,
      }),
    }).then(() => {
      setComment('');
      reload();
    });
  };

  return post ? (
    <>
      {!postEdit && (
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
                    <button
                      className={css.editBtn}
                      onClick={() => setPostEdit(true)}
                    >
                      &nbsp;수정
                    </button>
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
                <div
                  className={css.profile}
                  onClick={() => navigate(`/blog/${post.user.id}`)}
                >
                  <img
                    className={css.profileImg}
                    src={post.user.profileImgUrl}
                    alt="profile"
                  />
                  <p className={css.name}>{post.user.nickname}</p>
                </div>
                <div className={css.titleWrap}>
                  <h1 className={css.title}>{post.title}</h1>
                  <p className={css.time}>{postDate}</p>
                </div>
              </div>
              <div className={css.content}>
                {post.thumbnailImgUrl && (
                  <img
                    className={css.thumbnail}
                    src={post.thumbnailImgUrl}
                    alt="thumbnail"
                  />
                )}
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

            <div className={css.comments}>
              {user && (
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
                    onKeyDown={(e) => {
                      if (e.nativeEvent.isComposing) {
                        return;
                      } else {
                        if (e.key === 'Enter') {
                          handleComment();
                        }
                      }
                    }}
                    value={comment}
                  />
                  <button
                    className={css.commentBtn}
                    disabled={comment.length < 1}
                    onClick={handleComment}
                  >
                    작성
                  </button>
                </div>
              )}

              {commentList.length !== 0 ? (
                <div className={css.commentListWrap}>
                  {commentList.map((e, idx) => {
                    const date = new Date(e.createdDate);
                    const createDate = `${date.getFullYear()}년 ${
                      date.getMonth() + 1
                    }월 ${date.getDate()}일`;
                    return (
                      <Comment
                        key={idx}
                        comment={e}
                        user={user}
                        deleteComment={deleteComment}
                        createDate={createDate}
                        reload={reload}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={css.commentList}>
                  댓글이 아직 존재하지 않습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {postEdit && <WritePost status="수정" postId={params.id} />}
    </>
  ) : null;
};

export default PostDetail;
