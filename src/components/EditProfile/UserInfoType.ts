import ModefiedValue from './ModefiedClass';

export interface LinkUrl {
  [key: string]: any;
  title: string;
  url: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  profile: {
    blogTitle: string;
    profileIntro: string;
    profileImgUrl: string;
    profileUrls: LinkUrl[];
  };
  startDate: string;
}

export interface NewUserInfo {
  [key: string]: any;
  nickname: string;
  profileIntro: string;
  blogTitle: string;
  profileImg: File;
  profileImgUrl: string;
  linkUrls: ModefiedValue<LinkUrl[]>;
}
