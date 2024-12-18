"use client";

import React, { useEffect, useState } from "react";
import { fetchEditBook, getBook } from "@/api";
import style from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { BookData } from "@/types";
import Loading from "@/components/loading";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [editBook, setEditBook] = useState<BookData | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBook(id as string);

      setEditBook(data);
    };
    fetchBook();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    setEditBook((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/book/${id}`);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    fetchEditBook(id as string, editBook as BookData);
    router.push(`/book/${id}`);
  };

  if (!editBook) return <Loading />;

  return (
    <form className={style.container}>
      <div className={style.coverImg}>
        <img src={editBook?.coverImgUrl} alt={editBook?.title} />
      </div>
      <div className={style.info}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            value={editBook?.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="subTitle">부제목</label>
          <input
            type="text"
            name="subTitle"
            value={editBook?.subTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">저자</label>
          <input
            type="text"
            name="author"
            value={editBook?.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="publisher">출판사</label>
          <input
            type="text"
            name="publisher"
            value={editBook?.publisher}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">설명</label>
          <textarea
            name="description"
            value={editBook?.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">수량</label>
          <input type="number" name="quantity" />
        </div>
        <div className={style.button}>
          <button onClick={handleCancel}>취소</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </form>
  );
};

export default Page;
