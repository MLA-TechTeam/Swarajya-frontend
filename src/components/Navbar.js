import React, { useState } from "react";
import { Navbar } from "flowbite-react";

export default function NavbarComponent({
  page_title_en = "Swarajya",
  page_title_mr = "स्वराज्य",
  curr_route = "/home"
}) {
  const [hover, setHover] = useState(true);
  const nav_text_classes = "text-lg font-medium";

  return (

    <Navbar
      fluid={true}
      rounded={true}
      style={{ backgroundColor: "transparent" }}
      className="z-10"
    >
      <Navbar.Brand to="/" href="/">
        <img
          src={require("../logo.png")}
          className="mr-2 h-14 sm:h-20"
          alt="Swarajya Logo"
          style={{ borderRadius: "60px" }}
        />
      </Navbar.Brand>

      <div className="flex-grow flex items-center justify-center lg:justify-start lg:pl-8">
        <span
          className={`relative z-10 font-bold transition-all duration-300 ${hover
            ? "text-black text-5xl drop-shadow-md"
            : "text-gray-800 text-4xl drop-shadow-sm"
            }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}
        >
          {hover ? page_title_mr : page_title_en}
        </span>
      </div>

      <Navbar.Toggle />
      <Navbar.Collapse className="min-w-1200">

        <Navbar.Link
          href="/home" className={nav_text_classes}
          active={curr_route === "/home" || curr_route === "/"}
        > Home
        </Navbar.Link>

        <Navbar.Link
          href="/aboutus" className={nav_text_classes}
          active={curr_route === "/aboutus"}
        > About
        </Navbar.Link>

        <Navbar.Link
          href="/gallery" className={nav_text_classes}
          active={curr_route === "/gallery"}
        > Gallery
        </Navbar.Link>

        <Navbar.Link
          href="/blogs" className={nav_text_classes}
          active={
            curr_route === "/blogs" ||
            curr_route.split("/").includes("blog")
          }
        > Blogs
        </Navbar.Link>

        <Navbar.Link
          href="/events" className={nav_text_classes}
          active={curr_route === "/events"}
        > Upcoming Events
        </Navbar.Link>

      </Navbar.Collapse>

    </Navbar>
  );
}
