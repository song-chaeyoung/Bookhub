import React from "react";
import style from "./page.module.css";
import { BookData } from "@/types";
import BookItem from "../../components/book-item";
import { getBooks } from "@/api";

export const dynamic = "force-dynamic";

const AllBooks = async () => {
  // const res = await fetch("http://localhost:12345/book");
  // const data = await res.json();

  const data = await getBooks();

  // if (!res.ok) {
  //   return <div>오륲가 발생했습니다</div>;
  // }

  return data;
};

const Page = async () => {
  const books = await AllBooks();

  return (
    <div className={style.container}>
      <div className={style.books}>
        <h1>모든 책 보기</h1>
        <div className={style.bookList}>
          {books.map((it: BookData) => (
            <BookItem key={it.id} book={it} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
