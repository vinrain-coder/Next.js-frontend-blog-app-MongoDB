"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMoonSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function Header() {
  //search open and close function
  const [searchOpen, setSearchOpen] = useState(false);

  //open search bar
  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };
  //close search bar
  const closeSearch = () => {
    setSearchOpen(false);
  };

  //aside bar for mobile devices
  const [aside, setAside] = useState(false);

  const asideOpen = () => {
    setAside(true);
  };

  const asideClose = () => {
    setAside(false);
  };

  //close aside when link is clicked
  const handleLinkClick = () => {
    setAside(false);
  };

  //dark mode
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDarkmode = localStorage.getItem("darkMode") == "true";
    setDarkMode(isDarkmode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //search data fetch
  const { alldata, loading } = useFetchData("/api/getblog");

  //filtering publish blogs
  const publishedBlogs = alldata.filter((ab) => ab.status === "publish");

  const [searchQuery, setSearchQuery] = useState("");
  // filter based on search query from title
  const filteredBlogs =
    searchQuery.trim() === ""
      ? publishedBlogs
      : publishedBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <>
      <div className="header_sec">
        <div className="container header">
          <div className="logo">
            <Link href="/" className="flex">
              <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
              <h1>Blog</h1>
            </Link>
          </div>
          <div className="searchbar">
            <IoSearchSharp />
            <input
              onClick={openSearch}
              type="search"
              placeholder="Discover news, articles and more"
            />
          </div>
          <div className="nav_list_dark">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
            {/* for mobile screens */}
            <div className="navlist_mobile_ul">
              <button onClick={toggleDarkMode}>
                {darkMode ? <LuSun /> : <IoMoonSharp />}
              </button>
              <button onClick={openSearch}>
                <IoSearch />
              </button>
              <button onClick={asideOpen}>
                <FaBars />
              </button>
            </div>
            <div className="darkmode">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchOpen ? "open" : ""}`}>
          <div className="searchab_input">
            <IoSearchSharp />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              placeholder="Discover news, articles and more"
            />
          </div>
          <div className="search_data text-center">
            {loading ? (
              <div className="wh_100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {searchQuery ? (
                  <>
                    {filteredBlogs.slice(0, 3).map((blog) => {
                      return (
                        <Link
                          className="blog"
                          key={blog._id}
                          href={`/blog/${blog.slug}`}
                          onClick={closeSearch}
                        >
                          <div className="bloginfo">
                            <div>
                              <h3>{blog.slug}</h3>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <div>No search results</div>
                )}
              </>
            )}
          </div>
          <div className="exit_search" onClick={closeSearch}>
            <div>
              <FaXmark />
            </div>
            <h4>ESC</h4>
          </div>
        </div>

        {/* mobile navlist */}
        <div className={aside ? `navlist_mobile open` : "navlist_mobile"}>
          <div className="navlist_m_title flex flex-sb">
            <h1>Shoepedi Blogs</h1>
            <button onClick={asideClose}>
              <FaXmark />
            </button>
          </div>
          <hr />
          <h3 className="mt-3">Main Menu</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <hr />
          <h3 className="mt-3">Topics</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href="/topics/shoe-fashion-trends">
                Shoe Fashion Trends
              </Link>
            </li>
            <li>
              <Link href="/topics/styling-tips">
                Styling Tips & Outfit Ideas
              </Link>
            </li>
            <li>
              <Link href="/topics/bags-and-accessory-guides">
                Bag & Accessory Guides
              </Link>
            </li>
            <li>
              <Link href="/topics/footwear-care">
                Footwear Care & Maintenance
              </Link>
            </li>
            <li>
              <Link href="/topics/clothing-and-seasonal-fashion">
                Clothing & Seasonal Fashion
              </Link>
            </li>
            <li>
              <Link href="/topics/product-reviews-and-comparisons">
                Product Reviews & Comparisons
              </Link>
            </li>
            <li>
              <Link href="/topics/sustainable-fashion">
                Sustainable Fashion
              </Link>
            </li>
            <li>
              <Link href="/topics/shopping-guides">
                Shopping Guides & Smart Buying Tips
              </Link>
            </li>
            <li>
              <Link href="/topics/influencer-style">
                Celebrity & Influencer Style
              </Link>
            </li>
            <li>
              <Link href="/topics/fashion-industry-news">
                Fashion Industry News
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
