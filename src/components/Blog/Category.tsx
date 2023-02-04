import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogData } from '../../pages/BlogPage/BlogPage';
import css from './Category.module.scss';
export interface Props {
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  onSearch: BlogData[];
  blogData: any;
}
interface CaategoryData {
  id: number;
  categoryName: string;
}
const Category: React.FC<Props> = (props) => {
  const [categoryData, setCategoryData] = useState<CaategoryData[]>([]);
  const params = useParams();
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/categories/users/${params.id}`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setCategoryData(data.data));
  }, []);

  const onEditCategory = () => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'CATEGORY_CREATED') {
          alert('추가 완료!');
        } else if (result.message === 'ALREADY_EXIST_CATEGORY_NAME') {
          alert('이미 존재하는 카테고리 입니다.');
        } else {
          alert('수정 실패!');
        }
      });
  };

  console.log(categoryData);
  return (
    <div className={css.categoryContainer}>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="text"
          placeholder="블로그 내 검색"
          onChange={(e) => props.setInputData(e.target.value)}
          value={props.inputData}
        />
        <button className={css.searchButton}>
          <img
            className={css.searchIcon}
            src="/image/header-search.png"
            alt="SearchIcon"
          />
        </button>
      </div>
      <div className={css.categoryWrapper}>
        <div className={css.title}>카테고리</div>
        {/* <button>변경</button> */}
        {categoryData.map((data: any, idx) => {
          return (
            <ul key={idx}>
              <li>{data.categoryName}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
