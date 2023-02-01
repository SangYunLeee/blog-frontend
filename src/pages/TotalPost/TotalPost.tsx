import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Poster from '../../components/Poster/Poster';
import css from './TotalPost.module.scss';

export interface postDataType {
  id: string;
  title: string;
  content: string;
  thumbnailImgUrl: string;
  secretType: number;
  createdAt: string;
  category: {
    id: number | null;
    categoryName: string | null;
  };
  user: {
    id: number;
    nickname: string;
    profileImgUrl: string;
  };
  topic: {
    id: number;
    topicName: string;
  };
  tags: [
    {
      id: number;
      tagName: string;
    }
  ];
}

const TotalPost = () => {
  const [postData, setPostData] = useState<postDataType[]>([]);
  const [tagData, setTagData] = useState([]);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/posts?search=짜파&categoryId=1&topicId=1`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.data);
        if (Array.isArray(data.data)) {
          setTagData(data.data[0].tags);
        }
      });
  }, []);

  return (
    <>
      <Header />
      <div className={css.totalPost}>
        <div className={css.category}>전체 글</div>
        {tagData && (
          <div className={css.tagList}>
            {tagData.map((tag: { id: number; tagName: string }) => {
              return (
                <div className={css.tagDiv} key={tag.id}>
                  <div className={css.tagContent}>{tag.tagName}</div>
                </div>
              );
            })}
          </div>
        )}

        {postData && (
          <div className={css.postList}>
            {postData.map((post: postDataType) => {
              return <Poster key={post.id} post={post} />;
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TotalPost;
