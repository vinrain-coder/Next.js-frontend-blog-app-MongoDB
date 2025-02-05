import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { GiClothes, GiHandBag } from "react-icons/gi";
import { MdNewspaper, MdRateReview, MdTrendingUp } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { allyDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

export default function blogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          const alldata = res.data;
          setBlog(alldata);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching blog", error);
        });
    }
  }, [slug]);

  // markdown code highlighter
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    const [copied, setCopied] = useState();

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={allyDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n&/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <>
      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">
              {loading ? <div>Loading...</div> : blog && blog[0]?.title}
            </h1>
            <h5>
              By <span>Shoepedi</span>. Published in{" "}
              <span>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  blog && blog[0]?.blogcategory
                )}
              </span>{" "}
              .{" "}
              {blog &&
                new Date(blog[0].createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
              <span>. 1 min read</span>
            </h5>
          </div>
          {/* blog data section */}
          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              {loading ? (
                <div className="wh-100  flex flex-center mt-3">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  <div className="w-100 blogcontent">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: Code,
                      }}
                    >
                      {blog[0].description}
                    </ReactMarkdown>
                  </div>
                </>
              )}
            </div>
            <div className="rightslug_data">
              <div className="slug_profile_info">
                <div className="slugprofile_sec">
                  <div className="profile_imgbg"></div>
                  <div className="slug_profile_img">
                    <div className="image_bg_top0"></div>
                    <div className="image_bg_top1"></div>
                    <img src="/img/logo.png" alt="logo" />
                  </div>
                </div>
                <h3>Shoepedi</h3>
                <h4>Blog</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaFacebook />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                  <div className="st_icon">
                    <FaTiktok />
                  </div>
                </div>
              </div>
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
                  <Link href="/tag/outfit-inspiration">
                    #Outfit Inspiration
                  </Link>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
