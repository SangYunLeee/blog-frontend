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
  const [currTag, setCurrTag] = useState<string | null>(null);

  const params = new URLSearchParams(window.location.search);

  const filterByTags = (event: any) => {
    setPagenation(false);
    setCurrTag(event.target.innerText);
    if (token) {
      requestHeaders.set('Authorization', token);
    }
    fetch(`${process.env.REACT_APP_API_URL}/posts?myFollowing=true`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        if (event.target.innerText !== '전체') {
          const filterPost = data.data.filter(
            (post: postDataType) =>
              post.topic.topicName === event.target.innerText
          );

          setPostData(filterPost);
        } else {
          setPagenation(true);
          setPostData(data.data);
        }
      });
  };

  const clickPage = (event: any) => {
    const page = event.target.innerText;

    if (token) {
      requestHeaders.set('Authorization', token);
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
      requestHeaders.set('Authorization', token);
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
      .then((data) => {
        data.data.unshift({ id: 0, content: '전체' });
        setTagData(data.data);
      });
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
                <div
                  className={css.tagDiv}
                  key={tag.id}
                  onClick={filterByTags}
                  style={{
                    backgroundColor:
                      currTag === tag.content
                        ? '#b6c4f5'
                        : 'rgb(234, 234, 234)',
                  }}
                >
                  <div className={css.tagContent}>{tag.content}</div>
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
