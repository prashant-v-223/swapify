import { useState, useEffect } from "react";
import AnalyticsTable from "../components/Analytics/AnalyticsTable";
import ChartAPI from "../services/liveChartApi";

const LiveChart = () => {
  const [coinList, setCoinList] = useState([]);
  useEffect(() => {
    let get = async () => {
      const response = await new ChartAPI().coinInfo("bitcoin");

      if (response.status === "ok") {
      }
    };

    get();
  }, []);

  useEffect(() => {
    let get = async () => {
      const response = await new ChartAPI().coinInfo("ethereum");

      if (response.status === "ok") {
      }
    };

    get();
  }, []);

  useEffect(() => {
    let get = async () => {
      const response = await new ChartAPI().allCoinInfo();

      if (response.status === "ok") {
        setCoinList(response.data);
      }
    };

    get();
  }, []);

  return (
    <div className="flex relative ">
      <AnalyticsTable coinList={coinList} />
    </div>
  );
};

export default LiveChart;
