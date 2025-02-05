import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import Slideshow from "./Carousel";
import NavbarComponent from "./Navbar";
import FooterComponent from "./Footer";

function Home2() {
  const [screenSize, setScreenSize] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-yellow-100 via-red-100 to-yellow-100">
      <NavbarComponent />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            Swarajya
          </h1>
          <p className="text-xl text-gray-600">
            Marathi Literary Association at Vellore Institute of Technology,
            Chennai.
          </p>
        </section>

        <section className="flex justify-center items-center mb-16">
          <img
            style={{
              boxShadow:
                "4px 4px 25px 3px #F4EB0C, -4px -4px 25px 5px rgba(244, 235, 12, 0.53)",
              borderRadius: "50%",
              width: screenSize.dynamicWidth > 600 ? "400px" : "70%",
              height: screenSize.dynamicWidth > 600 ? "400px" : "70%",
            }}
            src={"./assets/home.jpg"}
            alt="Swarajya Logo"
            className="shadow-lg"
          />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Prominent Marathi Figures
          </h2>
          <Slideshow />
        </section>

        <section className="text-center">
          <div className="inline-block bg-white shadow-md rounded-lg p-6 max-w-2xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Swarajya Marathi Literary Association is a Cultural Club at Vellore
              Institute of Technology Chennai.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              स्वराज्य मराठी साहित्य संघ हा वेल्लूर इन्स्टिट्यूट ऑफ टेक्नॉलॉजी,
              चेन्नई येथील सांस्कृतिक क्लब आहे.
            </p>
          </div>
        </section>
      </main>

      <FooterComponent
        bg="bg-gradient-to-r from-red-500 to-yellow-500"
        textColor="text-white"
        iconColor="text-yellow-200"
      />
    </div>
  );
}

export default Home2;
