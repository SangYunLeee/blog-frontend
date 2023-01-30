import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Poster from '../../components/Poster/Poster';
import css from './TotalPost.module.scss';

export interface postDataType {
  id: string;
  title: string;
  content: string;
  thumnailImgUrl: string;
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

  const [maxPage, setMaxPage] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState<number | null>(null);
  const [pagenation, setPagenation] = useState<boolean>(true);

  const params = new URLSearchParams(window.location.search);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const clickPage = (event: any) => {
    const page = event.target.innerText;
    fetch(
      `${process.env.REACT_APP_API_URL}/posts?pageNumber=${page}&countPerPage=10`,
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

  const filterByTags = (event: any) => {
    setPagenation(false);
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        const filterPost = data.data.filter(
          (post: postDataType) =>
            post.topic.topicName === event.target.innerText
        );
        setPostData(filterPost);
      });
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/posts?pageNumber=1&countPerPage=10`,
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
      .then((data) => {
        setTagData(data.data);
      });
  }, []);

  return (
    <>
      <Header />
      <div className={css.totalPost}>
        <div className={css.category}>전체 글</div>
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
