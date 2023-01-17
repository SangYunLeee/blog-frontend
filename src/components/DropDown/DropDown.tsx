import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import css from './DropDown.module.scss';

interface categoryInterface {
  id: number;
  category_name: string;
}

const DropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('전체글');
  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: string, index: number) => () => {
    setCategory(value);
    setIsOpen(false);
  };
  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`./data/category.json`);
        const json = await response.json();
        setCategoryData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className={css.categoryMenu} onClick={onToggle}>
        <p>{category}</p>
        {isOpen ? (
          <FaAngleUp className={css.angle} />
        ) : (
          <FaAngleDown className={css.angle} />
        )}
      </div>
      <div className={css.categoryWrap}>
        <ul className={css.categoryList}>
          {isOpen && (
            <>
              {categoryData.map((category) => {
                const { id, category_name } = category;
                return (
                  <li
                    key={id}
                    className={css.categoryItem}
                    onClick={onOptionClicked(category_name, id)}
                  >
                    {category_name}
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
