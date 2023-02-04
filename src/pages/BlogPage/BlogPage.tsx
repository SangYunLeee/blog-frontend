import React, { useState, useEffect } from 'react';
import Blog from '../../components/Blog/Blog';
import Profile from '../../components/Blog/Profile';
import Category from '../../components/Blog/Category';
import Header from '../../components/Header/Header';
import type { UserInfo } from '../../pages/SettingPage/SettingPage';
import css from './BlogPage.module.scss';
import { useParams } from 'react-router-dom';
export interface BlogData {
  id: number;
  title: string;
  content: string;
  reply: number;
  thumbnailImgUrl: string;
  createdAt: number;
}

const BlogPage = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [inputData, setInputData] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>();
  const userNickname = `${userInfo?.nickname}`;
  const userImg = `${userInfo?.profile.profileImgUrl}`;
  const userIntro = `${userInfo?.profile.profileIntro}`;
  const params = useParams();
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${params.id}`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts?userId=${params.id}`)
      .then((res) => res.json())
      .then((data) => setBlogData(data.data));
  }, []);

  const onSearch = blogData.filter((data) => {
    if (inputData == null) return data;
    else if (
      data.title.toLowerCase().includes(inputData.toLowerCase()) ||
      data.content.toLowerCase().includes(inputData.toLowerCase())
    ) {
      return data;
    }
  });

  return (
    <>
      <Header />
      <div className={css.blogContainner}>
        <div className={css.blogWrapper}>
          <Profile
            userNickname={userNickname}
            userImg={userImg}
            userIntro={userIntro}
          />
          <Category
            inputData={inputData}
            setInputData={setInputData}
            onSearch={onSearch}
            blogData={blogData}
          />
        </div>
        <div className={css.blogcontent}>
          <div className={css.blogHeader}>
            {userInfo?.profile.blogTitle && (
              <h1
                className={css.blogName}
              >{`${userInfo?.profile.blogTitle}`}</h1>
            )}
            <div className={css.titleWrapper}>
              {inputData ? (
                <h2 className={css.allContents}>{inputData}</h2>
              ) : (
                <h2 className={css.allContents}>전체 글</h2>
              )}
              <hr className={css.border} />
            </div>
          </div>
          {onSearch.map((data) => {
            return <Blog key={data.id} {...data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
