import React from "react";
import { Card, Button } from "flowbite-react";
import LazyLoad from "react-lazy-load";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import NavbarComponent from "./Navbar";
import { Link } from "react-router-dom";
// import './BlogsStyle.css';  // save `src > components > BlogsStyle.css`

import config from "../config";
const DEBUG = config.debug;
const dev_server = config.development_server;
const USE_DEV_SERVER = config.use_development_server;

function urlFor(source) {
  // During development, use different server to fetch data:
  if (USE_DEV_SERVER) {
    let image_name = source.asset.bs_local;
    if (image_name.startsWith("./")) { image_name = image_name.slice(2); }
    if (image_name.startsWith("/")) { image_name = image_name.slice(1); }

    const path = `${dev_server}/get_image/${image_name}`;
    if (DEBUG) console.log('[Warning] : Using development server for image:', path);

    return path;
  }

  // In production, use sanity to fetch data:
  else {
    const builder = imageUrlBuilder(sanityClient);
    const img_url = builder.image(source).url();
    if (DEBUG) console.log("[Sanity] Fetching image from db:", img_url);
    return img_url;
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // 'en-GB' formats as DD MMM, YYYY
};


function sortBlogs(blogs) {
  // Helper function to compare dates (newest to oldest)
  function compareDates(a, b) {
    // console.log(a.slug.current, a.date, b.slug.current, b.date)
    return new Date(b.date) - new Date(a.date);
  }

  // Helper function to compare strings alphabetically
  function compareAlphabetical(a, b) {
    return a.localeCompare(b);
  }

  // Step 1: Filter out blogs with priority > blogs.length and treat them as -1
  blogs.forEach(blog => {
    if (blog.priority > blogs.length) {
      blog.priority = -1;
    }
  });

  // Step 2: Separate blogs into prioritized and non-prioritized
  const prioritized = blogs.filter(blog => blog.priority !== -1);
  const nonPrioritized = blogs.filter(blog => blog.priority === -1);

  // Step 3: Sort non-prioritized blogs by date and use slug as tie-breaker
  nonPrioritized.sort((a, b) => {
    const dateComparison = compareDates(a, b);
    if (dateComparison !== 0) return dateComparison;
    return compareAlphabetical(a.slug.current, b.slug.current);
  });

  // Step 4: Create a result array with placeholders for priorities
  const result = Array(blogs.length).fill(null);

  // Step 5: Place prioritized blogs into their exact positions
  prioritized.forEach(blog => {
    if (blog.priority >= 0 && blog.priority < blogs.length) {
      result[blog.priority] = blog;
    }
  });

  // Step 6: Fill in non-prioritized blogs into remaining slots
  let nonPrioritizedIndex = 0;
  for (let i = 0; i < result.length; i++) {
    if (!result[i] && nonPrioritizedIndex < nonPrioritized.length) {
      result[i] = nonPrioritized[nonPrioritizedIndex];
      nonPrioritizedIndex++;
    }
  }

  // Remove any null placeholders (if array size > number of blogs)
  return result.filter(blog => blog !== null);
}


async function fetch_blogs() {
  // During development, use different server to fetch data:
  let blogs = [];
  if (USE_DEV_SERVER) {
    const response = await fetch(`${dev_server}/get_blogs`);
    blogs = await response.json();
    if (DEBUG) console.log("[Warning] Fetched data from development server: Blogs -", blogs);
  }

  // In production, use sanity to fetch data:
  else {
    // Fetch just the (published) (non-draft) (v2) blogs:
    blogs = await sanityClient.fetch(
      `*[_type == "blog_v2" && isPublished == true && !(_id in path("drafts.**"))]{
              blogTitle,
              blogShortDescription,
              content,
              author,
              date,
              slug,
              priority,
              _id
            }`
    );
    if (DEBUG) console.log("[Sanity] Fetched data from db: Blogs");
  }

  // Sort blogs based on priority and date
  if (DEBUG) console.log("[Blogs] Unsorted blogs:", blogs);
  blogs = sortBlogs(blogs);
  if (DEBUG) console.log("[Blogs] Sorted blogs:", blogs);
  return blogs;
}


export default function Blogs() {
  const [blogs, setBlogs] = React.useState([]);
  const [hover, setHover] = React.useState(true);

  // Fetch data of blogs:
  React.useEffect(() => {
    async function fetchData() {
      const blogs = await fetch_blogs();
      setBlogs(blogs);
    }
    fetchData();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <h1
        onMouseEnter={() => setHover(false)}
        onMouseLeave={() => setHover(true)}
        className="max-[1300px]:mt-5 mt-10 text-3xl font-bold tracking-tight text-white-900 dark:text-white sm:text-4xl md:text-5xl"
      >
        {hover ? "Blogs" : "लेख"}
      </h1>

      {/* Blog Cards Grid */}
      <div className="mt-10 mb-5 grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto" id="blogsGrid">
        {blogs.map((blog, index) => (

          <Link to={`/blog/${blog.slug.current}`} key={index}>
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              {/* Image */}
              <LazyLoad>
                <img
                  src={urlFor(blog.content[0]?.image)}
                  alt={blog.blogTitle}
                  className="w-full h-48 object-cover"
                />
              </LazyLoad>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-semibold mb-2">
                  {/* {blog.blogTitle} */}
                  {blog.blogTitle.length > 45
                    ? blog.blogTitle.slice(0, 45) + "..."
                    : blog.blogTitle}
                </h2>

                {/* Intro */}
                <p className="text-gray-400 mb-4 text-left">
                  {blog.blogShortDescription.length > 100
                    ? blog.blogShortDescription.slice(
                      0, blog.blogShortDescription.lastIndexOf(' ', 100)) + " ..."
                    : blog.blogShortDescription}
                </p>

                {/* Meta Info */}
                <div className="flex justify-between text-gray-500 text-sm">
                  {/* <span>{blog.date}</span> */}
                  <span>{formatDate(blog.date)}</span>
                  <span>{blog.author || "Anonymous"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
        }
      </div>
    </div>
  );
}