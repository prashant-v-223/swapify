import { useState, useEffect } from "react";
import ChartAPI from "../services/liveChartApi";
import { useParams } from "react-router-dom";
// @ts-ignore
import { Line } from "react-chartjs-2";

const CoinChart = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [history, setHistory] = useState([]);

  const [error, setError] = useState(false);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    let get = async () => {
      const response: any = await new ChartAPI().coinInfo(id);

      if (!response.error) {
        setName(response.data.name);
        setPrice(response.data.market_data.current_price.usd);
        setHistory(response.data.market_data.sparkline_7d.price);
      } else {
        setError(response.error);
      }
    };

    get();
  }, [id]);

  const listOfLength = (length: any) => {
    let list = [];

    for (let i = 0; i < length; i++) {
      list.push(i);
    }

    return list;
  };

  return (
    <div className="flex">
      {!error ? (
        <div className="w-full md:w-2/3 py-6 mx-auto mt-10">
          <h2 className="text-gray-300 mb-2 text-3xl">{name}</h2>
          <p className="text-gray-200 mb-10 text-4xl">${price}</p>

          <div className="p-4 rounded-xl bg-dark-600">
            <Line
              style={{ maxWidth: "100%", minHeight: "500px" }}
              data={{
                labels: listOfLength(history.length),
                datasets: [
                  {
                    borderColor: "#f4ba2f",
                    borderWidth: 2,
                    pointRadius: 3,
                    data: history,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-full min-w-full flex items-center justify-center">
          <h1 className="text-gray-100 text-4xl">{error}</h1>
        </div>
      )}
    </div>
  );
};

export default CoinChart;
