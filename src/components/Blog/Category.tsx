import React, { useState } from 'react';
import css from './Category.module.scss';
interface Props {
  inputData: string;
  setInputData: any;
  onSearch: any;
}
const Category: React.FC<Props> = (props) => {
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
        <ul>
          <li>JavaScript (4)</li>
          <li>맛집 (3)</li>
          <li>영화 (4)</li>
        </ul>
      </div>
    </div>
  );
};

export default Category;
