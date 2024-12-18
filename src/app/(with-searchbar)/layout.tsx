import React from "react";
import SearchForm from "../../components/searchForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SearchForm />
      {children}
    </div>
  );
};

export default Layout;
