//import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-500 flex justify-evenly p-6 lg:flex-row flex-col  gap-4">
      <div className="flex justify-start items-center flex-col">
        <h1 className="text-xl font-bold tracking-wider border-b-2 w-fit">
          Company
        </h1>
        <ul className="leading-loose text-gray-700 lg:text-start text-center">
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Our services</a>
          </li>
          <li>
            <a href="#">Privacy policy</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-start items-center flex-col">
        <h1 className="text-xl font-bold tracking-wider border-b-2 w-fit">
          Get Help
        </h1>
        <ul className="leading-loose text-gray-700 lg:text-start text-center">
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Shipping</a>
          </li>
          <li>
            <a href="#">Returns</a>
          </li>
          <li>
            <a href="#">Order status</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-start items-center flex-col">
        <h1 className="text-xl font-bold tracking-wider border-b-2 w-fit  mb-3">
          Follow us
        </h1>
        <ul className="leading-loose text-gray-700 lg:text-start text-center flex gap-2">
          <li>
            <a href="#">
              <img
                src="src/assets/facebook.svg"
                alt="facebook image"
                className="w-8"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="src/assets/instagram.svg"
                alt="instagram image"
                className="w-8"
              />
            </a>
          </li>
          <li className="pl-2">
            <a href="#">
              <img
                src="src/assets/linkedin.svg"
                alt="linkedin image"
                className="w-8"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
