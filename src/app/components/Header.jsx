"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [searchContent, setSearchContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchContent) {
      router.push(`/movies/search?query=${searchContent}`);
    }
  };
  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link href={"/"} className="navbar-brand">
            Movie App
          </Link>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="d-flex"
            role="search"
          >
            <input
              onChange={(e) => setSearchContent(e.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
