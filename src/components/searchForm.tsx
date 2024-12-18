"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import style from "./searchForm.module.css";

const SearchForm = () => {
  const router = useRouter();
  const [option, setOption] = useState("all");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get("search") as string;

    if (search === "") {
      alert("검색어를 입력해주세요");
      return;
    }

    router.push(`/search?q=${search}&option=${option}`);
  };

  return (
    <div className={style.container}>
      <h1>검색하실 책을 입력해주세요</h1>
      <form className={style.form} onSubmit={handleSearch}>
        <select
          name="category"
          id="category"
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="book">책</option>
          <option value="author">작가</option>
        </select>
        <input type="text" name="search" placeholder="검색" />
        <button type="submit">
          <FaSearch size={18} />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
