import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Poster from '../../components/Poster/Poster';
import css from './NeighborPost.module.scss';

interface postDataType {
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
  const [token, setToken] = useState<null | string>(
    localStorage.getItem('token')
  );
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const [maxPage, setMaxPage] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState<number | null>(null);
  const [pagenation, setPagenation] = useState<boolean>(true);

  const params = new URLSearchParams(window.location.search);

  const filterByTags = (event: any) => {
    setPagenation(false);
    if (token) {
      requestHeaders.set(
        //임시로 token에 현재값이 아니라 고정값을 저장
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NzE1OTA0Mjh9.zPRKdCzelW5A390QKjAvSMf6AkEvbCRFemGi5sO4KJ8'
      );
    }
    fetch(`${process.env.REACT_APP_API_URL}/posts?myFollowing=true`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        const filterPost = data.data.filter(
          (post: postDataType) =>
            post.topic.topicName === event.target.innerText
        );
        console.log(data);
        setPostData(filterPost);
      });
  };

  const clickPage = (event: any) => {
    const page = event.target.innerText;

    if (token) {
      requestHeaders.set(
        //임시로 token에 현재값이 아니라 고정값을 저장
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NzE1OTA0Mjh9.zPRKdCzelW5A390QKjAvSMf6AkEvbCRFemGi5sO4KJ8'
      );
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/posts?pageNumber=${page}&countPerPage=10&myFollowing=true`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let page = 1;
        const pageArr = new Array(data.maxPage)
          .fill(null)
          .map((elem, idx) => (elem = idx + 1));
        setPostData(data.data);
        setMaxPage(pageArr);
        setPageNumber(data.pageNumber);
      });
  };

  useEffect(() => {
    if (token) {
      requestHeaders.set(
        //임시로 token에 현재값이 아니라 고정값을 저장
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NzE1OTA0Mjh9.zPRKdCzelW5A390QKjAvSMf6AkEvbCRFemGi5sO4KJ8'
      );
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/posts?pageNumber=1&countPerPage=10&myFollowing=true`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let page = 1;
        const pageArr = new Array(data.maxPage)
          .fill(null)
          .map((elem, idx) => (elem = idx + 1));
        setPostData(data.data);
        setMaxPage(pageArr);
        setPageNumber(data.pageNumber);
      });

    fetch(`${process.env.REACT_APP_API_URL}/topics`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setTagData(data.data));
  }, []);

  return (
    <>
      <Header />
      <div className={css.totalPost}>
        <div className={css.category}>이웃 전체 글</div>
        {tagData && (
          <div className={css.tagList}>
            {tagData.map((tag: { id: number; content: string }) => {
              return (
                <div className={css.tagDiv} key={tag.id}>
                  <div className={css.tagContent} onClick={filterByTags}>
                    {tag.content}
                  </div>
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

        <div className={css.pageDiv}>
          {pagenation &&
            maxPage.map((elem) => {
              return (
                <div
                  className={css.page}
                  key={elem}
                  onClick={clickPage}
                  style={{
                    backgroundColor:
                      pageNumber === elem ? 'rgb(242, 242, 242)' : 'white',
                  }}
                >
                  {elem}
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TotalPost;
