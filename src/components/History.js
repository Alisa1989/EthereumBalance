import { useEffect, useState } from "react";
import axios from "axios";

const History = (props) => {
  const [historyData, setHistoryData] = useState({
    data: [],
  });
  console.log("address in history: ", props.address);
  useEffect(() => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${props.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=92PH1UZI33IQCP5VDMH4YEG7PRR4ZQMC27`
      )
      .then((res) => {
        setHistoryData({ ...historyData, data: res.data });
        console.log("res history", res.data);
      })
      .catch((err) => {
        console.log("res", err);
      });
  }, [props]);

  console.log("historyData", historyData.data);
  console.log("typeof", typeof historyData.data);
  return (
    <div>
      {
        historyData.data.status == "1" ?
            historyData.data.result.map((item) => {
                return <p>from: {item.from}</p>;
            })
            :
            <p>nothing here</p>     
      }
    </div>
  );
};
export default History;
