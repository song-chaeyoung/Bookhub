"use client";

import { searchBooks } from "@/api";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import style from "./page.module.css";

export const dynamic = "force-dynamic";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const option = searchParams.get("option");
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const result = await searchBooks(q as string, option as string);
      setBooks(result);
      setLoading(false);
    };

    if (q) {
      fetchBooks();
    }
  }, [q, option]);

  // if (!q) return alert("검색어를 입력해주세요");

  if (loading) return <div className={style.loading}>Loading...</div>;

  if (q && books.length === 0)
    return <div className={style.noResult}>{q}의 검색 결과가 없습니다.</div>;

  return (
    <div className={style.container}>
      <h1>
        <span>{q}</span> 검색 결과 <small>{books.length}건</small>
      </h1>
      <div className={style.bookList}>
        {books.map((book: BookData) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

// 메인 페이지 컴포넌트
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default Page;
