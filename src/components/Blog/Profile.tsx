import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import Grass from '../../components/Blog/Grass/Grass';
import Grass2 from './Grass/Grass2';
import Follow from '../../components/Follow/Follow';
import css from './Profile.module.scss';

export interface GrassData {
  count: number;
  date: string;
  level: number;
}

export interface FollowBtnType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectFollowingBtn: boolean;
  setSelectFollowingBtn: Dispatch<SetStateAction<boolean>>;
  selectFollowerBtn: boolean;
  setSelectFollowerBtn: Dispatch<SetStateAction<boolean>>;
}

const Profile = ({ userNickname, userImg, userIntro, userId }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectFollowingBtn, setSelectFollowingBtn] = useState<boolean>(false);
  const [selectFollowerBtn, setSelectFollowerBtn] = useState<boolean>(false);
  const [currUserId, setCurrUserId] = useState<number | null>(null);
  const [follower, setFollower] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [grassData, setGrassData] = useState<GrassData[]>([]);
  const params = useParams();
  const requestHeaders: HeadersInit = new Headers();
  const token = localStorage.getItem('token');
  const [followingData, setFollowingData] = useState<any>([]);
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }

  const clickFollower = () => {
    setOpen(true);
    setSelectFollowerBtn(true);
    setSelectFollowingBtn(false);
  };

  const clickFollowing = () => {
    setOpen(true);
    setSelectFollowingBtn(true);
    setSelectFollowerBtn(false);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/follower/user/${params.id}`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setFollower(data.data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/following/user/${params.id}`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setFollowing(data.data));
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/grasses?userId=3&timezone=+9:00&withinDay=60`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((data) => setGrassData(data.data));
  }, []);

  // const grassCounts = grassData.map((data) => {
  //   return data.count;
  // });

  // const grassDate = grassData.map((data) => {
  //   return data.date;
  // });
  // const grassLevel = grassData.map((data) => {
  //   return data.level;
  // });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => setCurrUserId(data.data.id));
  }, []);

  useEffect(() => {
    //내가 팔로잉
    fetch(`${process.env.REACT_APP_API_URL}/following?myFollowing=true`, {
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        setFollowingData(res.data);
      });
  }, []);

  const clickFollowBtn = (event: any) => {
    if (event.target.innerText === '언팔로우') {
      fetch(`${process.env.REACT_APP_API_URL}/follow/${params.id}`, {
        headers: requestHeaders,
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message === 'UNFOLLOW_SUCCESSFULLY') {
            fetch(
              `${process.env.REACT_APP_API_URL}/following?myFollowing=true`,
              {
                headers: requestHeaders,
              }
            )
              .then((res) => res.json())
              .then((res) => setFollowingData(res.data));
          }
        });
    } else
      fetch(`${process.env.REACT_APP_API_URL}/follow`, {
        headers: requestHeaders,
        method: 'POST',
        body: JSON.stringify({
          targetUsersId: params.id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message === 'FOLLOW_SUCCESSFULLY') {
            fetch(
              `${process.env.REACT_APP_API_URL}/following?myFollowing=true`,
              {
                headers: requestHeaders,
              }
            )
              .then((res) => res.json())
              .then((res) => setFollowingData(res.data));
          }
        });
  };

  return (
    <div className={css.profileContainer}>
      <div className={css.headerWrapper}>
        <img className={css.profileImg} alt="ProfileImg" src={userImg} />
        <div className={css.nicknameWrapper}>
          <h2>{userNickname} 님</h2>
          <div className={css.follow}>
            <div className={css.follower} onClick={clickFollower}>
              <p>팔로워</p>
              <p>{follower.length}</p>
            </div>
            <div className={css.following} onClick={clickFollowing}>
              <p>팔로잉</p>
              <p>{following.length}</p>
            </div>
            {open ? (
              <Follow
                open={open}
                setOpen={setOpen}
                selectFollowingBtn={selectFollowingBtn}
                setSelectFollowerBtn={setSelectFollowerBtn}
                selectFollowerBtn={selectFollowerBtn}
                setSelectFollowingBtn={setSelectFollowingBtn}
              />
            ) : null}
          </div>
        </div>
      </div>
      {userIntro === null && <div className={css.content}>{userIntro}</div>}

      <div className={css.grass}>
        {/* {grassData.map((data) => {
          return <Grass {...data} />;
        })} */}
        {/* <Grass
          grassCounts={grassCounts}
          grassDate={grassDate}
          grassLevel={grassLevel}
        /> */}
        <Grass2 />
        {currUserId !== Number(params.id) && (
          <button className={css.writeBtn} onClick={clickFollowBtn}>
            {followingData.some((elem: any) => elem.id === Number(params.id))
              ? '언팔로우'
              : '팔로우'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
