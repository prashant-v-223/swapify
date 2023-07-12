import { useUserInfo } from "@/store";

const TransactionTable = () => {
  const { user } = useUserInfo((state) => state.data);
  if (user?.transactionIds.length !== 0) {
    return (
      <div className="relative overflow-x-auto mt-4 ">
        <table className="w-full text-sm text-left text-gray-500 md:border border-[#606060]">
          <thead className="text-sm sm:text-base bg-[#303131] rounded-lg text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.No
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.transactionIds.map((transactionId, index) => {
              return (
                <tr
                  key={transactionId.id}
                  className="bg-[#1b1b1b] border-b border-[#444242] text-white"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  {transactionId.transactionType == "deposit" ? <td className="px-6 py-4"> {transactionId?.coinFrom} </td> : <td className="px-6 py-4" > {transactionId?.coin} </td>}
                  <td className="px-6 py-4">
                    {new Date(transactionId?.time).toDateString()}
                  </td>
                  <td className="px-6 py-4">{transactionId?.amount} $</td>
                  <td className="px-6 py-4">{transactionId?.status}</td>
                  <td className="px-6 py-4">
                    {transactionId?.transactionType.charAt(0).toUpperCase() +
                      transactionId.transactionType.slice(1)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TransactionTable;
