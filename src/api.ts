/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AddBookData, BookData } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";

export const getBooks = async () => {
  // const res = await fetch("http://localhost:12345/book");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    cache: "no-store",
    next: {
      revalidate: 0,
      tags: ["books"],
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("오류가 발생했습니다");
  }

  return data;
};

export const getBook = async (id: string) => {
  // const res = await fetch(`http://localhost:12345/book/${id}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
    cache: "no-store",
    next: {
      revalidate: 0,
      tags: [`book-${id}`, "books"],
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("오류가 발생했습니다");
  }

  return data;
};

export const searchBooks = async (q: string, option: string) => {
  const allBooks = await getBooks();
  const books = allBooks.filter((book: BookData) => {
    if (option === "book") {
      return book.title.includes(q);
    }
    if (option === "author") {
      return book.author.includes(q);
    }

    return book.title.includes(q) || book.author.includes(q);
  });

  return books;
};

export const fetchEditBook = async (bookId: string, book: BookData) => {
  "use server";

  try {
    // BookData에서 필요한 필드만 추출
    const bookData = {
      title: book.title,
      subTitle: book.subTitle,
      author: book.author,
      description: book.description,
      publisher: book.publisher,
      coverImgUrl: book.coverImgUrl,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
        cache: "no-store",
        next: {
          revalidate: 0, // 캐시 즉시 무효화
          tags: [`book-${bookId}`, "books"], // 태그 기반 재검증
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Server response:", errorData);
      throw new Error(`Failed to update book: ${res.status} ${res.statusText}`);
    }

    const updatedBook = await res.json();
    revalidatePath(`/book/${bookId}`); // 상세 페이지
    revalidatePath("/"); // 메인 페이지
    revalidatePath("/search");

    revalidateTag(`book-${bookId}`);
    revalidateTag("books");
    return updatedBook;
  } catch (err) {
    console.error("Error updating book:", err);
    return {
      status: false,
      error: `책 수정에 실패했습니다: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
};

export const addBook = async (book: AddBookData) => {
  "use server";

  try {
    const bookData = {
      title: book.title,
      subTitle: book.subTitle,
      author: book.author,
      description: book.description,
      publisher: book.publisher,
    };

    console.log("Sending data:", bookData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Server response:", errorData);
      const errorJson = JSON.parse(errorData);
      return {
        status: false,
        error: errorJson.message || "책 추가에 실패했습니다",
      };
    }

    const newBook = await res.json();
    revalidatePath("/");
    return {
      status: true,
      data: newBook,
    };
  } catch (err) {
    console.error("Error adding book:", err);
    return {
      status: false,
      error: `책 추가에 실패했습니다: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
};

export const deleteBook = async (bookId: string) => {
  "use server";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Server response:", errorData);
      throw new Error(`Failed to delete book: ${res.status} ${res.statusText}`);
    }

    revalidatePath(`/`);
    return {
      status: true,
      data: "책 삭제 완료",
    };
  } catch (err) {
    console.error("Error updating book:", err);
    return {
      status: false,
      error: `책 수정에 실패했습니다: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
};
