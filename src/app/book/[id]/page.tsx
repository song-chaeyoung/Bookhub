"use client";

import { deleteBook, getBook } from "@/api";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { BookData } from "@/types";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [book, setBook] = useState<BookData | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBook(id as string);
      setBook(data);
    };
    fetchBook();
  }, []);

  const handleEdit = () => {
    console.log("click");
    router.push(`/edit/${params.id}`);
  };

  const handleDelete = async () => {
    const res = await deleteBook(id as string);
    console.log(res);
    router.push("/");
  };

  if (!book) return <Loading />;

  return (
    <div className={style.container}>
      <img src={book.coverImgUrl} alt={book.title} />
      <div>
        <h1>{book.title}</h1>
        <h2>{book.subTitle}</h2>
        <div>
          <span>{book.author}</span>
          <span>{book.publisher}</span>
        </div>
        <p>{book.description}</p>
        {/* <p>수량 : 0</p> */}
        <div>
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
