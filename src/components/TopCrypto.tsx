import { Coinlist } from "./fakedata";
const TopCrypto = () => {
  return (
   <>
    <div className="md:p-16 p-4 md:hidden">
      <p className="text-white font-semibold text-3xl">
        Top cryptocurrencies
      </p>
     <div className="md:p-16">
     <div className="flex relative rounded-3xl topcrypto overflow-x-auto mt-4 justify-around flex-col md:flex-wrap md:flex-row">
        <table className="w-full md:m-4 font-semibold text-sm text-left text-gray-500 ">
          <thead className="text-sm sm:text-base bg-transparent rounded-lg text-white p-6 ">
            <tr>
              <th scope="col" className="p-6">
                Name
              </th>
              <th scope="col" className="p-6">
                Last price(USD)
              </th>
              <th scope="col" className="p-6">
                24 Change
              </th>
              <th scope="col" className="p-6">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {Coinlist.map((crypto) => (
              <tr key={crypto.id} className="bg-transparent text-white ">
                <td className="px-6 py-4 flex items-center gap-4 w-full">
                  <img
                    width={40}
                    height={50}
                    src={crypto.image}
                    alt={crypto.id}
                  />
                  <span>{crypto.name}</span>
                  <span className="text-[#787575]">
                    {crypto.symbol.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {crypto.price_change_percentage_24h}
                </td>
                <td className="px-6 py-4 text-[#62DB92]">+6.00%</td>
                <td className="px-6 py-4">43,65,100.00M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     </div>
    </div>
    <div className="md:p-16 p-4 md:block hidden">
      <p className="text-white font-semibold text-3xl">Top cryptocurrencies</p>
      <div className="md:p-16">
        <div className="flex relative rounded-3xl topcrypto overflow-x-auto mt-4 justify-around flex-col md:flex-wrap md:flex-row">
          <div className="w-full md:m-4 font-semibold text-sm text-left text-gray-500 ">
            <div className="text-sm sm:text-base text-center bg-transparent rounded-lg text-white p-6 grid grid-cols-4">
                <p className="p-6">Name</p>
                <p className="p-6">Last price(USD)</p>
                <p className="p-6">24 Change</p>
                <p className="p-6">Volume</p>
            </div>
            <div className="">
              {Coinlist.map((crypto) => (
                <div key={crypto.id} className="bg-transparent text-center text-white grid grid-cols-4 ">
                  <div className="px-6 py-4 flex justify-center w-full">
                    <div className="flex items-center gap-4">
                    <img
                      width={40}
                      height={50}
                      src={crypto.image}
                      alt={crypto.id}
                    />
                    <span>{crypto.name.split(" ")[0]}</span>
                    <span className="text-[#787575]">
                      {crypto.symbol.toUpperCase()}
                    </span>
                    </div>
                  </div>
                  <p className="px-6 py-4 ">
                    {crypto.price_change_percentage_24h}
                  </p>
                  <p className="px-6 py-4 text-[#62DB92] ">+6.00%</p>
                  <p className="px-6 py-4 ">43,65,100.00M</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default TopCrypto;
{
  /* <tr className="bg-transparent text-white">
<th
  scope="row"
  className="px-6 py-4 font-medium  whitespace-nowrap "
>
  USDT <span>Tether</span>
</th>
<td className="px-6 py-4">320.00</td>
<td className="px-6 py-4">+6.00%</td>
<td className="px-6 py-4">20,40,100.00M</td>
</tr> */
}
