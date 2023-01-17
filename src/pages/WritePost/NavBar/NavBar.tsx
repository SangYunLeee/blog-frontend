import React, { useEffect, useState } from 'react';
import css from './NavBar.module.scss';

interface Topics {
  id: number;
  content: string;
}

interface Categories {
  id: number;
  content: string;
}

//카테고리 //주제 //게시물 //타이틀  // 다같이 넘어가기 =>  하위 컴포넌트에서 상위로 넘어오는 애들
const NavBar = () => {
  const [userId, setUserID] = useState<number>();
  const [topics, setTopics] = useState<Topics[]>();
  const [categories, setCategories] = useState<Categories[]>();
  useEffect(() => {
    const token = localStorage.getItem('token');
    let headers = token ? { authorization: token } : undefined;
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((result) => setUserID(result.userInfo.id));

    fetch(`${process.env.REACT_APP_API_URL}/topics`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => setTopics(result.data));

    fetch(`${process.env.REACT_APP_API_URL}/categories/users/${userId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => setCategories(result.data));
  }, []);

  useEffect(() => {
    if (topics) {
      for (let topic of topics) {
        console.log(topic);
      }
    }
    console.log(categories);
  }, [topics, categories, userId]);

  return (
    <div className={css.navWrap}>
      <select></select>
      <select></select>
      <button> 제출</button>
    </div>
  );
};
export default NavBar;
