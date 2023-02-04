import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DropDown from '../DropDown/DropDown';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

import css from './AllPost.module.scss';

interface AllPostInterface {
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

export interface TopicDataInterface {
  setTopicIdData: Dispatch<SetStateAction<number>>;
  setPagination: Dispatch<SetStateAction<number>>;
}

const AllPost = () => {
  //주제 아이디
  const [topicIdData, setTopicIdData] = useState(0);
  //페이지네이션
  const [pagination, setPagination] = useState(1);

  const token = localStorage.getItem('token');

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  const navigate = useNavigate();

  //전체글 데이터
  const [allPostData, setAllPostData] = useState<AllPostInterface[]>([]);
  const [maxCountPage, setMaxCountPage] = useState<number>(1);
  useEffect(() => {
    const fetchData = async () => {
      if (topicIdData !== 0) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/posts?topicId=${topicIdData}&countPerPage=8&pageNumber=${pagination}`,
            {
              headers: requestHeaders,
            }
          );
          const json = await response.json();
          setMaxCountPage(json.maxPage);
          setAllPostData(json.data);
        } catch (error) {
          console.error('error');
        }
      } else {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/posts?countPerPage=8&pageNumber=${pagination}`,
            {
              headers: requestHeaders,
            }
          );
          const json = await response.json();
          console.log(json);
          setMaxCountPage(json.maxPage);
          setAllPostData(json.data);
        } catch (error) {
          console.error('error');
        }
      }
    };
    fetchData();
  }, [pagination, topicIdData]);

  const prevPage = () => {
    setPagination(pagination - 1);
  };

  const nextPage = () => {
    setPagination(pagination + 1);
  };

  return (
    <ul className={css.allPostContainer}>
      <li className={css.allPostTitle}>
        <span>
          전체 글
          <button
            className={css.moreButton}
            onClick={() => navigate('/totalpost')}
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
      </li>
      <div className={css.allPostWrap}>
        <div className="pageButton">
          {pagination === 1 ? null : (
            <FaChevronLeft className={css.chevron} onClick={prevPage} />
          )}
        </div>
        <div className={css.allPostContent}>
          {allPostData.map((postData) => {
            const { id, title, content, thumbnailImgUrl, createdAt, user } =
              postData;
            const date = new Date(createdAt);
            const postingDate = `${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일`;
            return (
              <div
                key={id}
                className={css.postBox}
                onClick={() => navigate(`/post/${id}`)}
              >
                <div className={css.postUser}>
                  <div className={css.userInfo}>
                    <img
                      className={css.userImage}
                      src={user.profileImgUrl}
                      alt="유저이미지"
                    />
                    <span className={css.userName}>{user.nickname}</span>
                  </div>
                  <span className={css.postingDate}>{postingDate}</span>
                </div>
                {thumbnailImgUrl === null ? null : (
                  <div className={css.postImg}>
                    <img
                      className={css.thumbnail}
                      src={thumbnailImgUrl}
                      alt="썸네일"
                    />
                  </div>
                )}
                <div className={css.postTitle}>
                  <p>
                    <span className={css.titleText}>{title}</span>
                  </p>
                  <p>
                    <span
                      className={
                        thumbnailImgUrl === null
                          ? css.postingLongContent
                          : css.postingContent
                      }
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pageButton">
          {pagination === maxCountPage ? null : (
            <FaChevronRight className={css.chevron} onClick={nextPage} />
          )}
        </div>
      </div>
    </ul>
  );
};

export default AllPost;
