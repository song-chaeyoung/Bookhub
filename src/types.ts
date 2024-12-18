export interface BookData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  author: string;
  publisher: string;
  coverImgUrl: string;
}

export interface AddBookData {
  title: string;
  subTitle: string;
  description: string;
  author: string;
  publisher: string;
}
