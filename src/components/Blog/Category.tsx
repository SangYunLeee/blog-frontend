import React from 'react';
import css from './Category.module.scss';

const Category = () => {
  return (
    <div className={css.categoryContainer}>
      <div className={css.inputWrapper}>
        <input className={css.input} type="text" placeholder="블로그 내 검색" />
        <img
          className={css.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/8915/8915520.png"
          alt="SearchIcon"
        />
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
