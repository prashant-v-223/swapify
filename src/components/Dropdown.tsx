import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function DropDown({
  selected,
  items,
  handleSelect,
  selectedValues,
  setSelectedNetwork,
}: {
  selected: any;
  items: any;
  handleSelect: any;
  selectedValues: any;
  setSelectedNetwork: any;
}) {
  return (
    <div className="w-56">
      <Listbox value={selected} onChange={handleSelect}>
        {({ open }) => (
          <div className="relative mt-1 w-fit  text-white">
            <Listbox.Button
              className={`relative w-64 cursor-default rounded-lg  py-2  text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
            >
              <span className="flex gap-4 items-center truncate">
                <img
                  width={20}
                  height={20}
                  src={selected?.icon ?? selectedValues?.icon}
                  alt="notfound"
                />
                {selected?.name.slice(0, 18) ?? selectedValues?.name.slice(0, 18)}
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute right-4 md:right-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-[#242424] py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  ${
                  open ? " z-10 " : " z-0 "
                } `}
              >
                {items?.map((person: any) => {
                  return person?.networks?.map(
                    (network: any, index: number) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-4 p-3 ${
                            active ? "bg-yellow-100 text-black" : "text-white"
                          }`
                        }
                        value={person}
                        onClick={() => {
                          setSelectedNetwork({
                            network: network?.network,
                            shortName: network?.shortName,
                            name: network?.name,
                          });
                        }}
                      >
                        {({ selected }) => (
                          <span
                            className={`flex gap-2  items-center truncate ${
                              selected ? "font-medium" : "font-normal"
                            } `}
                          >
                            <img
                              width={20}
                              height={20}
                              src={person?.icon}
                              alt="notfound"
                            />
                            <sup>{network?.network}</sup> {person?.name}
                          </span>
                        )}
                      </Listbox.Option>
                    )
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
