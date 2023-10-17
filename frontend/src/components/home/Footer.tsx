"use client";
import footerBg from "@/assets/footer-bg.jpg";

const Footer = () => {
  return (
    <div>
      <div
        style={{
          background: `url(${footerBg})`,
        }}
        className="bg-[#282828] text-white"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6  flex flex-wrap justify-between">
          <div className="p-5">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Home
            </div>
            <p className="my-3 block">
              Services <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Shop <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              About Us <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Contact Us <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Partners <span className="text-teal-600 text-xs p-1">New</span>
            </p>
          </div>
          <div className="p-5">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Resources
            </div>
            <p className="my-3 block">
              Documentation <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Tutorials <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Support <span className="text-teal-600 text-xs p-1">New</span>
            </p>
          </div>
          <div className="p-5">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Support
            </div>
            <p className="my-3 block">
              Help Center <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              Conditions <span className="text-teal-600 text-xs p-1"></span>
            </p>
          </div>
          <div className="p-5">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Contact us
            </div>
            <p className="my-3 block">
              Dhaka, Bangladesh{" "}
              <span className="text-teal-600 text-xs p-1"></span>
            </p>
            <p className="my-3 block">
              abrakib942@gmail.com{" "}
              <span className="text-teal-600 text-xs p-1"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
