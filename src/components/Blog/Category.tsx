/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogData } from '../../pages/BlogPage/BlogPage';
import css from './Category.module.scss';
export interface Props {
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  onSearch: BlogData[];
  blogData: any;
  userId: string;
}
interface CategoryData {
  id: number;
  categoryName: string;
}
const Category: React.FC<Props> = (props) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const [category, setEditCategory] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setUserId(data.data.id));
  }, []);

  const onAddCategory = () => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'CATEGORY_CREATED') {
          alert('카테고리 추가!');
          window.location.reload();
        } else if (result.message === 'ALREADY_EXIST_CATEGORY_NAME') {
          alert('동일한 이름의 카테고리가 있습니다!');
        } else {
          alert('카테고리 추가 실패!');
        }
      });
  };

  const onDeleteCategory = (id: number) => {
    fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'CATEGORY_DELETED') {
          alert('카테고리 삭제 완료!');
          window.location.reload();
        } else {
          alert('카테고리 삭제 실패!');
        }
      });
  };

  const onEditCategory = (id: number) => {
    setEditCategory(false);
    fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'CATEGORY_UPDATED') {
          alert('카테고리 수정 완료!');
          window.location.reload();
        } else {
          alert('카테고리 수정 실패!');
        }
      });
  };

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
        <div className={css.categoryWrap}>
          <div className={css.title}>카테고리</div>
          {userId === props.userId ? (
            <button
              className={css.editButton}
              onClick={() => setEditCategory(!category)}
            >
              EDIT
            </button>
          ) : null}
        </div>
        {categoryData.map((data: any, idx) => {
          return (
            <ul key={idx}>
              {category === true ? (
                <input
                  className={css.categoryNameInput}
                  placeholder={data.categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              ) : (
                <li>{data.categoryName}</li>
              )}
              {category === true && userId === props.userId ? (
                <div className={css.buttons}>
                  <span onClick={() => onEditCategory(data.id)}>수정</span>
                  <span onClick={() => onDeleteCategory(data.id)}>삭제</span>
                </div>
              ) : null}
            </ul>
          );
        })}
        {category === true && userId === props.userId ? (
          <div className={css.categoryAddWrapper}>
            <input
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="카테고리 추가"
            />
            <button onClick={onAddCategory}>추가</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Category;
