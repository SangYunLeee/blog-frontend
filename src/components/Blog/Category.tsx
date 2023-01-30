import React, { useState } from 'react';
import { BlogData } from '../../pages/BlogPage/BlogPage';
import css from './Category.module.scss';
export interface Props {
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  onSearch: BlogData[];
  blogData: any;
}
const Category: React.FC<Props> = (props) => {
  const datas = props.blogData.map((data: any) => {
    return data.topic;
  });
  console.log(datas);
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
        {datas.map((data: any) => {
          return;
          // <ul>
          //   <li key={data.id}>{data.topicName}</li>
          // </ul>;
        })}
      </div>
    </div>
  );
};

export default Category;
