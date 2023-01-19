import React, { useState, KeyboardEvent, useEffect } from 'react';
import css from './Tag.module.scss';

interface Props {
  change: (key: string, value: string) => void;
}

const Tag = ({ change }: Props) => {
  const [tag, setTag] = useState<string>('');
  const [tagArr, setTagArr] = useState<string[]>([]);

  useEffect(() => {
    const arr: string[] = tagArr;
    change('tagNames', arr.join(','));
  }, [tagArr]);

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
    <div className={css.testPage}>
      <div className={css.tagArr}>
        {tagArr.map((tag, idx) => (
          <div key={idx} className={css.tagArray}>
            <span>{tag}</span>
            <span onClick={() => handleDelete(tag)}>delete</span>
          </div>
        ))}
      </div>
      <div className={css.eachTag}>
        <label># </label>
        <input
          type="text"
          placeholder="태그 입력 후 enter"
          onChange={(e) => setTag(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
          value={tag}
        />
      </div>
    </div>
  );
};

export default Tag;
