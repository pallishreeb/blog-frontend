/** @format */

import React from "react";
import "../css/herosection.css"; // Import your CSS file
import hero from "../img/hero.svg";
const Hero = () => {
  const scrollToAllStories = () => {
    const element = document.getElementById("all-stories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section id="hero">
      <div className="hero flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2 text-conetnt">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            Unleashing the World of Tech: Insights, Tutorials, and Innovation
          </h1>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
            Explore the latest in software technologies, sharpen your
            development skills, and stay ahead in the ever-evolving tech
            landscape. Join us on a journey of discovery, learning, and
            creativity.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              onClick={() => scrollToAllStories()}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="md:w-1/2">
          <img src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
