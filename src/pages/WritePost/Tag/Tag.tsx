import React, { useState, KeyboardEvent, useEffect } from 'react';
import css from './Tag.module.scss';
import { postDataType } from '../../TotalPost/TotalPost';
interface Props {
  change: (key: string, value: string) => void;
  handleWritePost: () => void;
  status?: string;
  post?: postDataType;
}

const Tag = ({ change, handleWritePost, status, post }: Props) => {
  const [tag, setTag] = useState<string>('');
  const [tagArr, setTagArr] = useState<string[]>([]);

  useEffect(() => {
    const arr: string[] = tagArr;
    change('tagNames', arr.join(','));
  }, [tagArr]);

  useEffect(() => {
    if (post) {
      post?.tags.map((e) =>
        tagArr.includes(e.tagName)
          ? null
          : setTagArr((tagArr) => [...tagArr, e.tagName])
      );
    }
  }, [post]);

  const handleKeyUp = (e: KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    if (tag.trim().length !== 0) {
      if (e.code === 'Space' || e.key === 'Enter') {
        if (tagArr.length > 9) {
          alert('태그는 10개까지만 추가할수 있습니다');
        } else if (tagArr.includes(tag.trim())) {
          alert('이미 존재하는 태그 입니다');
        } else {
          setTagArr((tagArr) => [...tagArr, tag.trim()]);
        }
        setTag('');
      }
    }
  };

  const handleDelete = (selectTag: string) => {
    setTagArr(tagArr.filter((element) => element !== selectTag));
  };

  return (
    <div className={css.totalWrap}>
      {/* <div className={css.top}>
        <p className={css.red} />
        <p className={css.gray} />
        <p className={css.green} />
      </div> */}
      <div className={css.eachTag}>
        <label className={css.hashtag}># </label>
        <input
          type="text"
          placeholder="태그를 입력 하세요"
          onChange={(e) => setTag(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
          value={tag}
        />
      </div>
      <div className={css.tagArr}>
        <p className={css.inform}>
          * 엔터나 스페이스 키를 누르면 태그가 생성돼요!
        </p>
        {tagArr.map((tag, idx) => (
          <div key={idx} className={css.tagArray}>
            <span className={css.makeTag}>{tag}</span>
            <span className={css.deleteBtn} onClick={() => handleDelete(tag)}>
              <img
                className={css.deleteImg}
                src={process.env.REACT_APP_PUBLIC_URL + `/image/tagDelete.png`}
                alt="deleteBtn"
                width="9px"
                height="9px"
              />
            </span>
          </div>
        ))}
      </div>
      <button className={css.submit} onClick={handleWritePost}>
        {status ? '수정하기' : '기록하기'}
      </button>
    </div>
  );
};

export default Tag;
