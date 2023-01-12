import React, { useState, useEffect } from 'react';
import css from './TotalPost.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TotalPost = () => {
  interface tagListType {
    id: number;
    tag: string;
  }
  const [tagList, setTagList] = useState<tagListType[]>([]);

  useEffect(() => {
    fetch('./data/totalPost.json')
      .then((res) => res.json())
      .then((data) => setTagList(data.tagData));
  }, []);

  return (
    <>
      <Header />
      <div className={css.totalPost}>
        <div className={css.category}>전체 글</div>
        {tagList && (
          <div className={css.tagList}>
            {tagList.map((tagData) => {
              return (
                <div className={css.tag} key={tagData.id}>
                  {tagData.tag}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TotalPost;
