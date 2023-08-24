import React, { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";

const Contextus = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  function sendEmail() {
    var recipient = "weberlabs.info@gmail.com";
    var subject = "Talk to us";
    var body = `name : ${name}, email: ${email},message: ${message}`;
    var mailtoLink =
      "mailto:" +
      recipient +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailtoLink;
  }
  return (
    <div>
      <section className="text-gray-400 md:px-6  py-12 mt-12  body-font">
        <div className="container px-5 mx-auto flex flex-wrap items-center">
          <div className=" md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold text-4xl text-white">
              Contact
            </h1>
            <p className="leading-relaxed mt-4">
              Please, send an email if you have any questions or concerns
            </p>{" "}
            <div className="flex justify-start align-bottom">
              <div className="flex justify-start align-bottom h-[100%]">
                <BiMailSend
                  className="mx-4"
                  style={{
                    fontSize: 40,
                    marginTop: "40%",
                  }}
                />
              </div>
              <div className="">
                <h1 className="title-font font-bold text-2xl text-white py-4">
                  Write us to
                </h1>
                <p>weberlabs.info@gmail.com</p>
              </div>
            </div>
            <div className="flex justify-start align-bottom">
              <div className="flex justify-start align-bottom h-[100%]">
                {" "}
                <FaTelegramPlane
                  className="mx-4"
                  style={{
                    fontSize: 40,
                    marginTop: "40%",
                  }}
                />
              </div>
              <div className="">
                <h1 className="title-font font-bold text-2xl text-white py-4">
                  Telegram
                </h1>
                <p>
                  <a
                    href="https://t.me/swapfry"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://t.me/swapfry
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className=" md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-lg font-medium title-font mb-1">
              Can t find what you re looking for?
            </h2>
            <p className="text-gray-400 text-xs font-medium title-font mb-1">
              For support, please fill in the form
            </p>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-400"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                your message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={() => {
                sendEmail();
              }}
              className="text-black bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              Submit
            </button>
            <p className="text-xs mt-3">
              Literally you probably havent heard of them jean shorts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contextus;
