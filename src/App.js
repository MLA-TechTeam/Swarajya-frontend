import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Gallery2 from "./components/Gallery";
import UpcomingEvents from "./components/Events";

// Test:
import Home2 from "./components/Home2";

function App() {
  // console.log(process.env.REACT_APP_DATASET);
  const [hover, setHover] = useState(true);

  return (
    <BrowserRouter>
      <PageContent />
    </BrowserRouter>
  );
}


// make a paragraph component fn which takes in text and returns a p tag with the text:
// const Paragraph = (text) => <p>{text}</p>;

const FooterCustom = (current_path) => {
  // console.log("Current Path: ", current_path);
  let icon_color = null;
  let text_color = null;
  let bg = null;

  if (current_path === "/blogs" || current_path.split('/').includes("blog")) {
    // icon_color = "text-blue-600";
    // text_color = "text-red-600";
    bg = "bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white border-t-2 border-yellow-300";
  }

  else {
    // Else keep all the values as null because the default values are already set in the FooterComponent in the Footer.js file
    icon_color = null;
    text_color = null;
    bg = null;
  }

  return (
    <FooterComponent
      bg={bg}
      iconColor={icon_color}
      textColor={text_color}
    />
  );
}


function PageContent() {
  const currentRoute = useLocation().pathname;
  // console.log("Current Route: ", currentRoute);

  return (
    // Set background color of the whole page 
    < div
      className="App flex flex-col min-h-screen"
      // BG Gradient:
      style={{
        background: `linear-gradient(0deg, 
          rgba(159,6,6,1) 0%, 
          rgba(190,7,7,1) 4%,
          rgba(224,75,7,1) 24%,
          rgba(224,95,7,1) 58%, 
          rgba(235,128,6,1) 78%, 
          rgba(230,213,16,1) 100%)`
      }}
    >

      {/* Navigation Bar */}
      <NavbarComponent curr_route={currentRoute} />

      {/* Routes - To render different components based on the URL */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="home2" element={<Home2 />} />
        <Route exact path="blogs" element={<Blogs />} />
        <Route exact path="blog/:slug" element={<Blog />} />
        <Route exact path="aboutus" element={<About />} />
        <Route exact path="gallery" element={<Gallery2 />} />
        <Route exact path="events" element={<UpcomingEvents />} />

      </Routes>

      {/* Footer with dynamic background color */}
      {FooterCustom(currentRoute)}

      {/* Test tag to check for footer bg-issues */}
      {/* <p>Page ends here</p> */}
    </div>
  );
}

export default App;
