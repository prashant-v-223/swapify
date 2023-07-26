import { useEffect, useState } from "react";
import TableRow from "./TableRow";

const AnalyticsTable = ({ coinList = [] }) => {
  const [showCoins, setShowCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setShowCoins(coinList);
  }, [coinList]);

  useEffect(() => {
    let tempCoins: any = [];

    coinList.forEach((coin: any) => {
      if (coin.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        tempCoins.push(coin);
      }
    });

    setShowCoins(tempCoins);
  }, [searchQuery]);

  return (
    <section className="body-font w-full">
      <div className=" px-5 py-0 mx-auto">
        <div className="flex flex-col text-left w-full mb-4">
          <div className="relative text-gray-200">
            <input
              type="text"
              name="name"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="p-2 text-base text-gray-100 bg-gray-900 rounded-md focus:outline-none focus:bg-gray-800 w-full"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="relative overflow-x-auto mt-4 ">
          <table className="w-full text-sm text-left text-gray-500 md:border border-[#606060]">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600 rounded-tl rounded-bl">
                  Rank
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600 l">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                  Symbol
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                  Price
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                  Price(24h)%
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                  Market cap
                </th>
                <th className="w-10 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600 rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              {showCoins.length > 0 &&
                showCoins?.map((coin, index) => (
                  <TableRow key={index} coin={coin} index={index} />
                ))}
            </tbody>
          </table>
          {!coinList.length && (
            <h2 className="text-gray-200 text-2xl text-center my-5 w-full">
              Loading...
            </h2>
          )}
          {!showCoins.length && coinList.length && (
            <h2 className="text-gray-200 text-2xl text-center my-5 w-full">
              No match found
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsTable;
