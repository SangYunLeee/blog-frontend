import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import css from './NewPost.module.scss';
interface NewPostInterface {
  id: string;
  title: string;
  content: string;
  thumbnailImgUrl: string;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
    profileImgUrl: string;
  };
}

const NewPost = () => {
  const navigate = useNavigate();

  //이웃이 있는지 없는지 여부확인
  const [buddyData, setBuddyData] = useState<boolean>(false);
  //이웃 새글 여부확인
  const [buddyPostData, setBuddyPostData] = useState<boolean>(false);
  const [pagination, setPagination] = useState(1);
  //주제 아이디
  const [topicIdData, setTopicIdData] = useState(0);

  const token = localStorage.getItem('token');

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/following?myFollowing=true`,
          {
            headers: requestHeaders,
          }
        );
        const json = await response.json();
        if (json.data.length === 0) {
          setBuddyData(false);
        } else {
          setBuddyData(true);
        }
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  const [newPostData, setNewPostData] = useState<NewPostInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const isSelected = topicIdData !== 0;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/posts?myFollowing=true${
            isSelected ? `&topicId=${topicIdData}` : ''
          }`,
          {
            headers: requestHeaders,
          }
        );
        const json = await response.json();
        if (json.data.length === 0) {
          setBuddyPostData(false);
        } else {
          setNewPostData(json.data);
          setBuddyPostData(true);
        }
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, [topicIdData]);

  return (
    <section className={css.newPostContainer}>
      <div className={css.newPostTitle}>
        <span>
          이웃 새 글
          <button
            className={css.moreButton}
            onClick={() => navigate('/neighborpost')}
          >
            더보기
          </button>
        </span>
        <div>
          <DropDown
            setTopicIdData={setTopicIdData}
            setPagination={setPagination}
          />
        </div>
      </div>
      <div>
        {buddyData ? (
          <div>
            {buddyPostData ? (
              <ul>
                {newPostData.map((postData) => {
                  const {
                    id,
                    title,
                    content,
                    thumbnailImgUrl,
                    createdAt,
                    user,
                  } = postData;
                  const date = new Date(createdAt);
                  const postingDate = `${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`;
                  return (
                    <li key={id} className={css.newPostContent}>
                      <div
                        className={css.userInfo}
                        onClick={() => navigate(`/blog/${user.id}`)}
                      >
                        <img
                          className={css.userImg}
                          src={user.profileImgUrl}
                          alt="유저이미지"
                        />
                        <span className={css.userName}>{user.nickname}</span>
                      </div>
                      <div
                        className={css.postContent}
                        onClick={() => navigate(`/post/${id}`)}
                      >
                        <p className={css.postingTime}>{postingDate}</p>
                        <p className={css.postingTitle}>{title}</p>
                        <p className={css.postingContent}>
                          <span
                            className={css.text}
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        </p>
                      </div>
                      <div className={css.thumbnailContent}>
                        {thumbnailImgUrl === null ? null : (
                          <div className={css.thumbnailImg}>
                            <img
                              src={thumbnailImgUrl}
                              alt="썸네일"
                              className={css.postThumbnail}
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className={css.makeBuddyContainer}>
                <p>아직 새로운 글이 없어요!</p>
              </div>
            )}
          </div>
        ) : (
          <div className={css.makeBuddyContainer}>
            <p>이웃을 추가하고 새로운 글을 확인해보세요!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewPost;
