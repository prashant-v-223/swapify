import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ProfileInfo() {
  return (
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button className="gap-2 inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span>
              <img src="/assets/user.svg" alt="user" />
            </span>
            Profile
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className=" mt-2 w-fit p-4 divide-y divide-gray-100 rounded-md  bg-[#1B1B1B] shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 flex gap-2 flex-col w-60">
              <Menu.Item>
                {() => (
                  <button
                    className={
                      "bg-transparent group gap-2 flex w-full items-center rounded-md px-2 py-2 text-sm text-white"
                    }
                  >
                    <img src="/assets/user.svg" alt="user" />{" "}
                    sswami610@gmail.com
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <button
                    className={
                      "bg-transparent group gap-2 flex w-full items-center rounded-md px-2 py-2 text-sm text-white"
                    }
                  >
                    <img src="/assets/tick.svg" alt="user" /> Joined at :
                    20-10-2022
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  );
}
