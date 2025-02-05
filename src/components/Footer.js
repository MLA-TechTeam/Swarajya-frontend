import React from "react";
import { Footer } from "flowbite-react";
import {
  FaFacebook,
  FaTwitter,
  // FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function FooterComponent({ bg, textColor, iconColor }) {
  // bg = bg || "bg-transparent";
  // textColor = textColor || "text-white";
  // iconColor = iconColor || "text-red-100";

  // bg = bg || "bg-opacity-0";
  bg = bg || "bg-opacity-0 backdrop-blur-sm border-t border-gray-100/20";
  textColor = textColor || "text-red-100";
  iconColor = iconColor || "text-white";

  return (
    <Footer
      container={true}
      // className="rounded-none inset-x-0 bottom-0 mt-auto text-white bg-transparent"
      className={`rounded-none inset-x-0 bottom-0 mt-auto text-white ${bg}`}
    >


      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex text-white sm:items-center sm:justify-between">
          <Footer.Copyright
            className={`${textColor}`}
            // className="text-white"
            href="/"
            by="Swarajya"
            year={2025}
          />

          {/*           
          <Footer.Brand
          href="https://flowbite.com"
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Flowbite Logo"
          name="Flowbite"
          /> 
          */}

          <Footer.LinkGroup>

            <Footer.Link href={"https://www.linkedin.com/company/swarajya-vit-chennai/"} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={iconColor} size={20} />
            </Footer.Link>

            <Footer.Link href={"https://instagram.com/swarajya_vitc"} target="_blank" rel="noopener noreferrer">
              <FaInstagram className={iconColor} size={20} />
            </Footer.Link>

            <Footer.Link href={"https://twitter.com/swarajya_vitc"} target="_blank" rel="noopener noreferrer">
              <FaTwitter className={iconColor} size={20} />
            </Footer.Link>

            <Footer.Link href={"https://www.facebook.com/profile.php?id=100092189738798"} target="_blank" rel="noopener noreferrer">
              <FaFacebook className={iconColor} size={20} />
            </Footer.Link>

          </Footer.LinkGroup>

        </div>
      </div>
    </Footer>
  );
}


// You can set custom footer bg color by passing bg prop to FooterComponent:
// <FooterComponent bg="bg-gray-900" />
// <FooterComponent bg="bg-gradient-to-b from-red-500 to-yellow-500" />
// If nothing is passed, default bg is transparent.
