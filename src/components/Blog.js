import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import NavbarComponent from "./Navbar";
import autoprefixer from "autoprefixer";
// import BlogStyle from "./BlogStyle.css";
import { FaUser, FaCalendarDay } from 'react-icons/fa';


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


async function fetch_article(slug) {
  // During development, use different server to fetch data:
  if (USE_DEV_SERVER) {
    const response = await fetch(`${dev_server}/get_blog/${slug}`);
    const blog = await response.json();
    if (DEBUG) console.log(`[Warning] Fetched Blog from development server: "${slug}"`);
    if (DEBUG) console.log("[Blog]: ", blog);
    return blog;
  }

  // In production, use sanity to fetch data:
  else {
    const blog = await sanityClient.fetch(
      `*[_type == "blog_v2" && slug.current == "${slug}"]`
    );
    if (DEBUG) console.log(`[Sanity] Fetched Blog from db: "${slug}"`);
    if (DEBUG) console.log("[Blog]: ", blog);
    return blog[0];
  }
}

const paragraph_indent = "2.5rem";

function Header({ title_en, title_mr }) {
  const [hover, setHover] = React.useState(true);
  return (
    <h1
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
      className="mt-10 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
    >
      {hover ? title_en : title_mr}
    </h1>
  );
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // 'en-GB' formats as DD MMM, YYYY
};


function BlogContent({ blog }) {
  // Function to insert <br /> tags where there are newline characters
  // function formatTextWithLineBreaks(text, tag = "p") {
  //   return text;

  //   // Check if the text has newlines and split accordingly with <p> tags
  //   if (text) {
  //     return text.split(/\n+/).map((item, index) => (
  //       <p key={index} className="text-xl text-gray-300 mt-4 text-left text-justify" style={{ textIndent: paragraph_indent }}>
  //         {item}
  //       </p>
  //     ));
  //   }
  //   return text;

  // Check if the text has newlines and split accordingly with <br /> tags
  // if (text) {
  //   return text.split(/\n+/).map((item, index) => (
  //     <React.Fragment key={index}>
  //       {item}
  //       {index < text.split(/\n+/).length - 1 && <br />}
  //     </React.Fragment>
  //   ));
  // }
  // return text;
  // }

  const formatTextWithLineBreaks = (text) => 
    text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  

  return (
    <article className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">

      {/* Write the blog title and intro */}
      <header className="mb-4 lg:mb-6 not-format">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white lg:mb-6">
          {blog.blogTitle}
          {/* {formatTextWithLineBreaks(blog.blogTitle)} */}
        </h1>
        <p
          className="text-xl text-gray-400 text-justify"
          style={{ textIndent: paragraph_indent }}
        >
          {blog.blogShortDescription}
          {/* {formatTextWithLineBreaks(blog.blogShortDescription)} */}
        </p>
      </header>

      {/* Iterate over all the paras and map things */}
      {blog.content &&
        blog.content.map((item, index) => (
          <div key={index} className="my-8">

            {/* Image and caption */}
            {item.has_image && (
              <figure>
                <img
                  src={urlFor(item.image)}
                  alt={item.caption}
                  className="w-full max-w-xl h-auto mx-auto rounded-md"
                  style={{ maxHeight: "40rem", objectFit: "contain" }}
                />
                {item.caption && (
                  <figcaption className="text-sm text-gray-400 mt-2">
                    {"Image: " + item.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* paragraph content */}
            <p
              // text- lg(large), xl, 2xl, 3xl
              // className="text-lg text-gray-300 mt-4 text-justify"
              className="text-xl text-gray-300 mt-4 text-justify"
              style={{ textIndent: paragraph_indent }}
            >
              {/* {item.para} */}
              {formatTextWithLineBreaks(item.para)}
            </p>
          </div>
        ))}


      {/* <footer className="mt-12">
        <p className="text-lg font-semibold text-gray-200 text-left" >- {blog.author}</p>
        <p className="text-sm text-gray-400 mt-2 text-left">{blog.date}</p>

        {blog.aboutAuthor && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-200 text-left">About the Author</h2>
            <p className="text-gray-400 mt-2 text-left">
              {blog.aboutAuthor}
            </p>
          </div>
        )}
      </footer> */}

      {/* 
      <footer className="mt-12 text-left flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-4 bg-gray-800 rounded-lg shadow-lg">
        <!-- Author and Date Section -->
        <div className="flex items-center text-gray-300">
          <FaUser className="mr-2 text-blue-500" size={20} />
          <p className="text-lg font-semibold">{blog.author}</p>
          <span className="mx-2 text-gray-400">|</span>
          <FaCalendarDay className="mr-2 text-blue-500" size={20} />
          <p className="text-sm text-gray-400">{blog.date}</p>
        </div>

        <!-- About the Author Section --> 
        {blog.aboutAuthor && (
          <div className="mt-4 sm:mt-0 sm:text-right">
            <h2 className="text-lg font-semibold text-gray-200">About the Author</h2>
            <p className="text-gray-400 mt-2">{blog.aboutAuthor}</p>
          </div>
        )}
      </footer> 
      */}

      <footer className="mt-12 text-left flex flex-col sm:flex-row sm:justify-between sm:items-start px-6 py-4 bg-gray-900 rounded-lg shadow-md border border-gray-700">

        {/* Left side - Author and Date Section */}
        <div className="flex flex-col items-start text-gray-300 mb-4 sm:mb-0 sm:flex-grow">
          {/* Author */}
          <div className="flex items-center mb-2">
            <FaUser className="mr-2 text-blue-500" size={20} />
            <p className="text-lg font-semibold truncate">{blog.author}</p>
          </div>
          {/* Date */}
          <div className="flex items-center text-sm text-gray-400">
            <FaCalendarDay className="mr-2 text-blue-500" size={20} />
            {/* <p className="text-lg font-semibold">{blog.date}</p> */}
            <p className="text-lg font-semibold">{formatDate(blog.date)}</p>
          </div>
        </div>

        {/* Right side - About the Author Section */}
        {blog.aboutAuthor && (
          <div className="sm:text-right">
            <h2 className="text-lg font-semibold text-gray-200">About the Author</h2>
            <p className="text-gray-400 mt-2">{blog.aboutAuthor.split('<br>')[0]}</p>
            <p className="text-gray-400">{blog.aboutAuthor.split('<br>')[1]}</p>
            <p className="text-gray-400">{blog.aboutAuthor.split('<br>')[2]}</p>
            <p className="text-gray-400">{blog.aboutAuthor.split('<br>')[3]}</p>
            <p className="text-gray-400">{blog.aboutAuthor.split('<br>')[4]}</p>
            <p className="text-gray-400">{blog.aboutAuthor.split('<br>')[5]}</p>
          </div>
        )}
      </footer>




    </article>
  );
}


export default function Blog_v2() {
  let { slug } = useParams();
  const [blog, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const blogData = await fetch_article(slug);
      setData(blogData);
    }
    fetchData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10">
      {/* <Header title_en="Blog" title_mr= "लेख" /> */}

      {/* <main className="pt-8 pb-16"> */}
      <main className="pt-2 pb-0">
        <div className="flex justify-center">
          <BlogContent blog={blog} />
        </div>
        <div className="flex justify-center mt-8">
          <Button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => (window.location.href = "/blogs")}
          >
            Read Other Blogs
          </Button>
        </div>
      </main>
    </div>
  );
}
