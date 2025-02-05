import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaHtml5 } from "react-icons/fa";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { alldata, loading } = useFetchData("/api/getblog");

  // Ensure data is an array
  const blogs = alldata || [];
  const totalBlogs = blogs.length;

  // Filter published blogs before paginating
  const publishedBlogs = blogs.filter((blog) => blog.status === "publish");
  const totalPages = Math.ceil(publishedBlogs.length / perPage);

  // Get current blogs
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Function to handle page change
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  return (
    <>
      <Head>
        <title>Shoepedi Blog</title>
        <meta
          name="description"
          content="This is the Shoepedi blog to inform shoe lovers of the latest trends and offers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>
              Hello, welcome to <span>Shoepedi blog</span>. <br />
              Check out our latest <br /> news, blogs, and more.
            </h1>
            <h3>Browse to learn more</h3>
            <div className="flex gap-2">
              <Link href="/contact">
                <button>Contact us</button>
              </Link>
              <Link href="/about">
                <button>About us</button>
              </Link>
            </div>
          </div>
          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/img/logo.png" alt="Logo" width={50} height={50} />
          </div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                currentBlogs.map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return (
                    <div className="blog" key={blog._id}>
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <img
                            src={firstImageUrl || "/img/noimage.jpg"}
                            alt={blog.title}
                          />
                        </Link>
                      </div>
                      <div className="bloginfo">
                        <Link href={`/tag/${blog.tags[0]}`}>
                          <div className="blogtag">{blog.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${blog.slug}`}>
                          <h3>{blog.title}</h3>

                          <div className="blogauthor flex gap-1">
                            <div className="blogaimg">
                              <img src="/img/logo.png" alt="Logo" />
                            </div>
                            <div className="flex flex-col flex-left gap-05">
                              <h4>Shoepedi</h4>
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="blogpagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {currentPage > 2 && (
                  <>
                    <button onClick={() => paginate(1)}>1</button>
                    {currentPage > 3 && <span>...</span>}
                  </>
                )}

                {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                  .filter((number) => number > 0 && number <= totalPages)
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={currentPage === number ? "active" : ""}
                    >
                      {number}
                    </button>
                  ))}

                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <span>...</span>}
                    <button onClick={() => paginate(totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/html">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Html</h3>
                  </div>
                </Link>
                <Link href="/topics/html">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>NextJs</h3>
                  </div>
                </Link>
                <Link href="/topics/html">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Database</h3>
                  </div>
                </Link>
                <Link href="/topics/html">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>React</h3>
                  </div>
                </Link>
                <Link href="/topics/html">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/html">#html</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's talk</h2>
              <div className="talk_sec">
                <h4>Want to find out how i can resolve your problems?</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
