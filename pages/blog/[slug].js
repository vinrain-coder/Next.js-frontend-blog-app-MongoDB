import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { GiHandBag } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          setBlog(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching blog", error);
        });
    }
  }, [slug]);

  const CodeBlock = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children.join(""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
      return <code className="bg-gray-200 text-red-600 px-1 py-0.5 rounded">{children}</code>;
    } else if (match) {
      return (
        <div className="relative bg-gray-900 rounded-md overflow-hidden">
          <button
            className="absolute top-2 right-2 bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    } else {
      return <code className="bg-gray-300 px-2 py-1 rounded">{children}</code>;
    }
  };

  const components = {
    code: CodeBlock,
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md my-4">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-400 bg-gray-800 text-white px-4 py-2 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900">
        {children}
      </td>
    ),
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mt-6 mb-2">
          {loading ? "Loading..." : blog[0]?.title}
        </h1>
        <h5 className="text-gray-600">
          By <span className="font-semibold">Shoepedi</span>. Published in{" "}
          <span className="font-semibold">{loading ? "Loading..." : blog[0]?.blogcategory}</span>.{" "}
          {blog &&
            new Date(blog[0].createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </h5>
        <div className="mt-6">
          {loading ? (
            <div className="w-full flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {blog[0].description}
            </ReactMarkdown>
          )}
        </div>

        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <img src="/img/logo.png" alt="logo" className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-xl font-bold">Shoepedi</h3>
              <p className="text-gray-600">Your fashion blog</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-3">
            <FaFacebook className="text-blue-600 text-2xl cursor-pointer hover:opacity-75" />
            <FaTwitter className="text-blue-400 text-2xl cursor-pointer hover:opacity-75" />
            <FaInstagram className="text-pink-500 text-2xl cursor-pointer hover:opacity-75" />
            <FaTiktok className="text-black text-2xl cursor-pointer hover:opacity-75" />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/topics/shoe-fashion-trends" className="block p-4 bg-gray-200 rounded-md flex items-center gap-3 hover:bg-gray-300 transition">
              <MdTrendingUp className="text-2xl" />
              <span>Shoe Fashion Trends</span>
            </Link>
            <Link href="/topics/styling-tips" className="block p-4 bg-gray-200 rounded-md flex items-center gap-3 hover:bg-gray-300 transition">
              <FaTshirt className="text-2xl" />
              <span>Styling Tips & Outfit Ideas</span>
            </Link>
            <Link href="/topics/bags-and-accessory-guides" className="block p-4 bg-gray-200 rounded-md flex items-center gap-3 hover:bg-gray-300 transition">
              <GiHandBag className="text-2xl" />
              <span>Bag & Accessory Guides</span>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Shoe Trends",
              "Outfit Inspiration",
              "Best Sneakers",
              "Luxury Footwear",
              "Eco-Friendly Fashion",
              "Must-Have Accessories",
              "Street Style",
              "Seasonal Looks",
              "Shoe Care Tips",
              "Budget Shopping",
              "Fashion Hacks",
              "Statement Shoes",
            ].map((tag) => (
              <Link href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
                <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-gray-700 transition">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
