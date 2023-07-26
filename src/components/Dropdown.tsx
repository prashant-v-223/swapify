import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function DropDown({
  selected,
  items,
  handleSelect,
  selectedValues,
  selected1,
  setSelectedNetwork,
}: {
  selected: any;
  items: any;
  handleSelect: any;
  selectedValues: any;
  selected1: any;
  setSelectedNetwork: any;
}) {
  const [alldata, setalldata] = useState(items);
  const [selected12, setselected12] = useState(selected);

  useEffect(() => {
    if (selected1 !== undefined) {
      let data1: any = items.filter((truck: any) => {
        return (
          truck.name.toString().toLowerCase().match(selected1.name) ||
          truck.name.toString().match(selected1.name)
        );
      });
      setselected12(data1[0]);
    }
  }, [selected1]);

  const handleFilter = (e: any) => {
    const { value } = e.target;
    if (value !== null) {
      let data1: any = items.filter((truck: any) => {
        return (
          truck.code.toString().toLowerCase().match(value.toLowerCase()) ||
          truck.name.toString().toLowerCase().match(value.toLowerCase())
        );
      });
      setalldata(data1);
    }
  };
  return (
    <div className="w-[100%]">
      <Listbox value={selected12} onChange={handleSelect}>
        {({ open }) => (
          <div className=" mt-1 w-[100%]   text-white">
            <Listbox.Button
              className={`cursor-default w-[100%]  rounded-lg  py-2  text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
            >
              <div className="SelectedByNetworks_selectCoin__uBFIj w-[100%] flex justify-between">
                <div className="SelectedByNetworks_selectCoinIconWrapp__YlQTs">
                  <img
                    className="SelectedByNetworks_selectCoinIcon__TkhXQ"
                    src={selected12?.icon ?? selectedValues?.icon}
                    alt="Bitcoin"
                    width="512"
                    height="512"
                    loading="lazy"
                  />
                </div>
                <div className="SelectedByNetworks_selectCoinData__Nu7ym ">
                  <span
                    className="SelectedByNetworks_selectCoinCode__5AKfq"
                    title={selected12?.code}
                  >
                    {selected12?.code}
                  </span>
                  <span
                    className="SelectedByNetworks_selectCoinName__9ZENN"
                    title={
                      selected12?.name?.slice(0, 18) ??
                      selectedValues?.name?.slice(0, 18)
                    }
                  >
                    {selected12?.name?.slice(0, 18) ??
                      selectedValues?.name?.slice(0, 18)}
                  </span>
                </div>
              </div>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute right-4 md:right-10 mt-2 max-h-80 w-full overflow-auto rounded-md bg-[#242424] py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  ${
                  open ? " z-10 " : " z-0 "
                } `}
              >
                <input
                  type="text"
                  style={{
                    zIndex: 999,
                  }}
                  onChange={handleFilter}
                  className="border border-gray-400 rounded-lg p-4 w-[95%] bg-[#171d21] m-[2.5%] mb-0 fixed-top-left-radius sticky top-[2.5%]"
                />
                {alldata.length > 0 ? (
                  alldata?.map((person: any) => {
                    return person?.networks?.map(
                      (network: any, index: number) => {
                        {
                          if (
                            network?.network === "BSC" ||
                            network?.network === "TRX" ||
                            network?.network === "ETH" ||
                            network?.network === "BTC"
                          ) {
                            return (
                              <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                  ` cursor-default select-none py-1 p-3  ${
                                    active ? "text-black" : "text-white"
                                  }`
                                }
                                value={person}
                                onClick={() => {
                                  setSelectedNetwork({
                                    network: network?.network,
                                    shortName: network?.shortName,
                                    name: network?.name,
                                  });
                                  setselected12(person);
                                  setalldata(items);
                                }}
                              >
                                <div className={`CoinWithNetwork_coin__31Gw- `}>
                                  <div className="CoinWithNetwork_coinIconWrapper__c5V45">
                                    <img
                                      className="CoinWithNetwork_coinIcon__sGE-j"
                                      src={person?.icon}
                                      alt="Bitcoin"
                                      width="512"
                                      height="512"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="CoinWithNetwork_coinLeft__A0UW2">
                                    <span className="CoinWithNetwork_coinCode__WArxX">
                                      {person?.code}
                                    </span>
                                    <span className="CoinWithNetwork_coinName__I3C9j">
                                      {person?.name}
                                    </span>
                                  </div>
                                  <div className="CoinWithNetwork_coinRight__NtJ3L">
                                    <div className="CoinWithNetwork_coinNetworkCode__nsODW">
                                      <sup>{network?.network}</sup>
                                    </div>{" "}
                                  </div>
                                </div>
                              </Listbox.Option>
                            );
                          }
                        }
                      }
                    );
                  })
                ) : (
                  <h1 className="py-5 text-center text-2xl">DATA NOT FOUND</h1>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
