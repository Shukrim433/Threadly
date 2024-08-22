import React from "react";
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col lg:h-[65vh] sm:flex-row border border-gray-400">
      {/* hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-5 py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            {/* a line: */}
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            LATEST ARRIVALS
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            {/* a line: */}
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* hero right side */}
      <img
        className="lg:w-2/3 md:w-2/3 object-cover sm:w/12 overflow-hidden"
        src={assets.hero2}
        alt="hero image of a woman"
      />
    </div>
  );
};

export default Hero;

/* 
Breakpoint prefix - Minimum width - CSS
--------------------------------------------
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }
*/
