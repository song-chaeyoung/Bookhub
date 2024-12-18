"use client";

import React from "react";
import style from "./header.module.css";
import { BsList } from "react-icons/bs";
import Link from "next/link";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.inner}>
        <Link href="/">
          <div className={style.logo}>BOOKHUB</div>
        </Link>
        <div className={style.list}>
          <BsList size={24} onClick={() => alert("추가 준비중")} />
          {/* <Link href="/add">
            <button>책 추가 하기</button>
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
