import React, { useEffect, useState } from 'react';
import css from './NavBar.module.scss';

interface Props {
  change: (key: string, value: string) => void;
}

interface Topics {
  id: number;
  content: string;
}

interface Categories {
  id: number;
  categoryName: string;
}

const NavBar = ({ change }: Props) => {
  const [topics, setTopics] = useState<Topics[]>();
  const [categories, setCategories] = useState<Categories[]>();

  const handleSetVal = (key: string, value: string) => {
    change(key, value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      let headers = token ? { authorization: token } : undefined;
      const _userId = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: 'GET',
        headers,
      })
        .then((response) => response.json())
        .then((response) => response.data.id);

      const _category = await fetch(
        `${process.env.REACT_APP_API_URL}/categories/users/${_userId}`,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((response) => response.data);

      const _topic = await fetch(`${process.env.REACT_APP_API_URL}/topics`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => response.data);
      setCategories(_category);
      setTopics(_topic);
    };
    fetchData();
  }, []);

  return topics ? (
    <div className={css.navWrap}>
      <select
        className={css.topic}
        onChange={(e) => handleSetVal('topicId', e.target.value)}
      >
        <option value="default" disabled={true}>
          주제
        </option>
        {topics.map((e) => (
          <option key={e.id} value={e.id}>
            {e.content}
          </option>
        ))}
      </select>
      <select
        className={css.category}
        onChange={(e) => handleSetVal('categoryId', e.target.value)}
      >
        <option value="category" id="" disabled={true}>
          카테고리
        </option>
        <option value="default" id="" disabled={false}>
          전체
        </option>
        {categories
          ? categories.map((e) => (
              <option key={e.id} value={e.id}>
                {e.categoryName}
              </option>
            ))
          : null}
      </select>
      <select
        className={css.secretType}
        onChange={(e) => handleSetVal('secretType', e.target.value)}
      >
        <option value="default" disabled={true}>
          공개범위
        </option>
        <option value="0">전체공개</option>
        <option value="1">맞팔공개</option>
        <option value="2">비공개</option>
      </select>
    </div>
  ) : null;
};
export default NavBar;
