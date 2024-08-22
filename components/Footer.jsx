import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-2 shadow-lg">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <p className="mb-1 font-bold text-md">Contact Us</p>
          <p className="text-xs">
            For partnerships, media queries, or if you have some great
            preparedness/survival/resilience how-to document or videos you
            recommend, please e-mail them to
            <a
              href="mailto:contact@collapsesurvivor.com"
              className="text-red-600 hover:underline">
              {" "}
              contact@collapsesurvivor.com
            </a>{" "}
            and we will review.
          </p>
        </div>
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <p className="mb-1 font-bold text-md">Follow Us</p>
          <div className="flex space-x-3 ml-14 ">
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/ios-filled/40/FFFFFF/twitterx.png"
                className="h-6 w-6"
                alt="Twitter"
              />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/ios-filled/40/FFFFFF/facebook.png"
                className="h-6 w-6"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/ios-filled/40/FFFFFF/instagram-new.png"
                className="h-6 w-6"
                alt="Instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
