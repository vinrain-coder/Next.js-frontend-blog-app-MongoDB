import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaShoePrints,
  FaShoppingBag,
  FaTiktok,
  FaTshirt,
  FaTwitter,
  FaUserTie,
} from "react-icons/fa";
import { MdNewspaper, MdRateReview, MdTrendingUp } from "react-icons/md";
import {
  GiHandBag,
  GiClothes,
  GiEarthAmerica,
} from "react-icons/gi";

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
                <Link href="/topics/shoe-fashion-trends">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <MdTrendingUp />
                    </div>
                    <h3>Shoe Fashion Trends</h3>
                  </div>
                </Link>
                <Link href="/topics/styling-tips">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaTshirt />
                    </div>
                    <h3>Styling Tips & Outfit Ideas</h3>
                  </div>
                </Link>
                <Link href="/topics/bags-and-accessory-guides">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiHandBag />
                    </div>
                    <h3>Bag & Accessory Guides</h3>
                  </div>
                </Link>
                <Link href="/topics/footwear-care">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaShoePrints />
                    </div>
                    <h3>Footwear Care & Maintenance</h3>
                  </div>
                </Link>
                <Link href="/topics/clothing-and-seasonal-fashion">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiClothes />
                    </div>
                    <h3>Clothing & Seasonal Fashion </h3>
                  </div>
                </Link>
                <Link href="/topics/product-reviews-and comparisons">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <MdRateReview />
                    </div>
                    <h3>Product Reviews & Comparisons </h3>
                  </div>
                </Link>
                <Link href="/topics/sustainable-fashion">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiEarthAmerica />
                    </div>
                    <h3>Sustainable Fashion </h3>
                  </div>
                </Link>
                <Link href="/topics/shopping-guides">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaShoppingBag />
                    </div>
                    <h3>Shopping Guides & Smart Buying Tips </h3>
                  </div>
                </Link>
                <Link href="/topics/influencer-style">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaUserTie />
                    </div>
                    <h3>Celebrity & Influencer Style</h3>
                  </div>
                </Link>
                <Link href="/topics/fashion-industry-news">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <MdNewspaper />
                    </div>
                    <h3>Fashion Industry News</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tag/shoe-trends">#Shoe Trends</Link>
                <Link href="/tag/outfit-inspiration">#Outfit Inspiration</Link>
                <Link href="/tag/best-sneakers">#Best Sneakers</Link>
                <Link href="/tag/luxury-footwear">#Luxury Footwear</Link>
                <Link href="/tag/eco-friendly-fashion">
                  #Eco-Friendly Fashion
                </Link>
                <Link href="/tag/must-have-accessories">
                  #Must-Have Accessories
                </Link>
                <Link href="/tag/street-style">#Street Style </Link>
                <Link href="/tag/seasonal-looks">#Seasonal Looks</Link>
                <Link href="/tag/shoecare-tips">#Shoe Care Tips</Link>
                <Link href="/tag/budget-shopping">#Budget Shopping</Link>
                <Link href="/tag/fashion-hacks">#Fashion Hacks</Link>
                <Link href="/tag/statement-shoes">#Statement Shoes</Link>
                <Link href="/tag/wardrobe-essentials">
                  #Wardrobe Essentials
                </Link>
                <Link href="/tag/trending-bags">#Trending Bags</Link>
                <Link href="/tag/style-icons">#Style Icons</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let’s Step Up Your Style!</h2>
              <div className="talk_sec">
                <h4>
                  Want the latest trends, styling tips & exclusive updates?
                </h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaFacebook />
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                    <FaTiktok />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
