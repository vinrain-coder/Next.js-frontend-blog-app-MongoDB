import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [blog, setBlog] = useState([]);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (!category) {
      router.push("/404");
      return;
    }

    const fetchBlogData = async () => {
      try {
        const res = await axios.get(`/api/getblog?blogcategory=${category}`);
        setBlog(res.data || []);
      } catch (error) {
        console.error("Error fetching blog data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [category]);

  const publishedBlogs = blog.filter((b) => b.status === "publish");
  const totalPages = Math.ceil(publishedBlogs.length / perPage);

  const currentBlogs = publishedBlogs.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  function extractFirstImageUrl(markdownContent) {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent?.match(regex);
    return match ? match[1] : null;
  }

  return (
    <div className="blogpage">
      <div className="category_slug">
        <div className="container">
          <div className="category_title">
            <div className="flex gap-1">
              <h1>
                {loading
                  ? "Loading..."
                  : publishedBlogs[0]?.blogcategory || "No Category"}
              </h1>
              <span>{loading ? "0" : publishedBlogs.length}</span>
            </div>
          </div>

          <div className="category_blogs mt-3">
            {loading ? (
              <div className="wh_100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              currentBlogs.map((item) => (
                <div className="cate_blog" key={item._id}>
                  <Link href={`/blog/${item.slug}`}>
                    <img
                      src={
                        extractFirstImageUrl(item.description) ||
                        "/img/noimage.jpg"
                      }
                      alt={item.title}
                    />
                  </Link>
                  <div className="bloginfo">
                    {item.tags[0] && (
                      <Link href={`/tag/${item.tags[0]}`}>
                        <div className="blogtag">{item.tags[0]}</div>
                      </Link>
                    )}
                    <Link href={`/blog/${item.slug}`}>
                      <h3>{item.title}</h3>
                      <div className="blogauthor flex gap-1">
                        <div className="blogaimg">
                          <img src="/img/logo.png" alt="Logo" />
                        </div>
                        <div className="flex flex-col flex-left gap-05">
                          <h4>Shoepedi</h4>
                          <span>
                            {new Date(item.createdAt).toLocaleDateString(
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
              ))
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
                .filter((num) => num > 0 && num <= totalPages)
                .map((num) => (
                  <button
                    key={num}
                    onClick={() => paginate(num)}
                    className={currentPage === num ? "active" : ""}
                  >
                    {num}
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
      </div>
    </div>
  );
}
