import React, { useEffect, useState } from 'react';
import { TopicDataInterface } from '../BlogPost/AllPost';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import css from './DropDown.module.scss';

export interface TopicInterface {
  id: number;
  content: string;
}

const DropDown = ({ setTopicIdData, setPagination }: TopicDataInterface) => {
  const token = localStorage.getItem('token');

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  //드롭타운 클릭여부
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('주제');
  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: string, index: number) => () => {
    setIsOpen(false);
    setTopic(value);
    setTopicIdData(index);
    setPagination(1);
  };
  const [topicData, setTopicData] = useState<TopicInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/topics`);
        const json = await response.json();
        let topicList = json.data as TopicInterface[];
        topicList.push({ content: '전체', id: 0 });
        setTopicData(json.data);
      } catch (error) {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={css.topicMenu} onClick={onToggle}>
        <p>{topic}</p>
        {isOpen ? (
          <FaAngleUp className={css.angle} />
        ) : (
          <FaAngleDown className={css.angle} />
        )}
      </div>
      <div className={css.topicWrap}>
        <ul className={css.topicList}>
          {isOpen && (
            <>
              {topicData.map((topic) => {
                const { id, content } = topic;
                return (
                  <li
                    key={id}
                    className={css.topicItem}
                    onClick={onOptionClicked(content, id)}
                  >
                    {content}
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
