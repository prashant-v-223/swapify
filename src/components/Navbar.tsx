import { Disclosure } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";

const menu = [
  {
    label: "About us",
    href: "/aboutus",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Blog",
    href: "https://medium.com/",
  },
];

export default function Navbar() {
  return (
    <>
      <nav className="md:px-8 md:py-4 bg-[#050505] items-center grid z-10">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <Link to={"/"}>
                  <img
                    src="/assets/logo_ver1.png"
                    width={200}
                    height={200}
                    alt="notfound"
                    className="md:flex hidden cursor-pointer"
                  />{" "}
                </Link>
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {menu.map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={item.href}
                        key={index}
                        className="px-5 py-2 text-base font-medium text-[#798DA3] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </React.Fragment>
                  ))}
                  {!localStorage.getItem("token") ? (
                    <div className="flex gap-4">
                      <Link
                        to={"/login"}
                        className="leading-3 p-3 bg-[#f4ba2f] rounded-md text-[#000000] font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        to={"/signup"}
                        className="leading-3 p-3 rounded-md bg-[#8484848A] text-white font-semibold"
                      >
                        Sign up
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="leading-3 p-3 rounded-md bg-[#8484848A] text-white font-semibold"
                    >
                      Logout
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto p-4 main">
                  <Link to={"/"}>
                    <img
                      src="/assets/logo_ver1.png"
                      width={100}
                      height={100}
                      alt="notfound"
                      className="md:hidden"
                    />
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto rounded-md md:hidden text-white focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel data-aos="fade-up">
                <div className="flex flex-col z-20 items-center justify-start order-2 w-full md:hidden bg-black h-full">
                  {menu.map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={item.href}
                        className="p-3 text-sm font-medium text-white"
                      >
                        {item.label}
                      </Link>
                    </React.Fragment>
                  ))}
                  <div className="flex gap-4 flex-row my-4 w-full px-10 justify-center">
                    {!localStorage.getItem("token") ? (
                      <>
                        <Link
                          data-aos="zoom-in-right"
                          to={"/login"}
                          className="leading-3 p-3 text-center bg-[#f4ba2f] rounded-md text-[#000000] font-semibold w-full"
                        >
                          Login
                        </Link>
                        <Link
                          data-aos="zoom-in-left"
                          to={"/signup"}
                          className="leading-3 p-3 rounded-md bg-[#8484848A] text-white font-semibold w-full text-center"
                        >
                          Sign up
                        </Link>
                      </>
                    ) : (
                      <button
                        data-aos="fade-up"
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="leading-3 p-3 rounded-md bg-[#8484848A] text-white font-semibold w-full"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </>
  );
}
