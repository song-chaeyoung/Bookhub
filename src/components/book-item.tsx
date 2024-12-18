"use client";

import React from "react";
import { BookData } from "@/types";
import style from "./book-item.module.css";
import Link from "next/link";

const BookItem = ({ book }: { book: BookData }) => {
  return (
    <Link href={`/book/${book.id}`}>
      <div className={style.container}>
        <img src={book.coverImgUrl} alt={book.title} />
        <div>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
