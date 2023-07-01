const TransactionTable = () => {
  return (
    <div className="relative overflow-x-auto mt-4 ">
      <table className="w-full text-sm text-left text-gray-500 md:border border-[#606060]">
        <thead className="text-sm sm:text-base bg-[#303131] rounded-lg text-white ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr.No
            </th>
            <th scope="col" className="px-6 py-3">
              Recipent address
            </th>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#1b1b1b] border-b border-[#444242] text-white">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              1
            </th>
            <td className="px-6 py-4">
              0xE62e1503D5ef5B405443860490acA5Eacb15ebEe
            </td>
            <td className="px-6 py-4">ETH</td>
            <td className="px-6 py-4">22:10:40</td>
            <td className="px-6 py-4">20.5000$</td>
            <td className="px-6 py-4">Completed</td>
          </tr>
          <tr className="bg-[#1b1b1b] border-b border-[#444242] text-white">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              2
            </th>
            <td className="px-6 py-4">
              0xE62e1503D5ef5B405443860490acA5Eacb15ebEe
            </td>
            <td className="px-6 py-4">BTC</td>
            <td className="px-6 py-4">22:10:40</td>
            <td className="px-6 py-4">20.5000$</td>
            <td className="px-6 py-4">Completed</td>
          </tr>
          <tr className="bg-[#1b1b1b] border-b border-[#444242] text-white">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              3
            </th>
            <td className="px-6 py-4">
              0xE62e1503D5ef5B405443860490acA5Eacb15ebEe
            </td>
            <td className="px-6 py-4">ADA</td>
            <td className="px-6 py-4">22:10:40</td>
            <td className="px-6 py-4">20.5000$</td>
            <td className="px-6 py-4">Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
