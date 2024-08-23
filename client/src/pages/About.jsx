import React from "react";
import Title from "../components/Title/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="clothes stock photo"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-center text-xl">
            Welcome to Threadly—your destination for stylish, affordable
            fashion. We offer a curated selection of clothing and accessories
            that blend the latest trends with timeless classics. Our goal is to
            make you look and feel your best, every day.
          </p>
          <p className="text-center text-xl">Thank you for choosing Threadly.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
