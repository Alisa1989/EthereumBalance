import { useEffect, useState } from "react";
import axios from "axios";

const History = (props) => {
  const [historyData, setHistoryData] = useState({
    data: [],
  });
  useEffect(() => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${props.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=92PH1UZI33IQCP5VDMH4YEG7PRR4ZQMC27`
      )
      .then((res) => {
        setHistoryData({ ...historyData, data: res.data });
      })
      .catch((err) => {
        console.log("res", err);
      });
  }, [props]);

  function timeStampToDate(theTimeStamp) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    function amOrPm(hour) {
      if (hour < 12) {
        return "AM";
      }
      return "PM";
    }

    function addLeadingZero(min) {
      if (min < 10) {
        var newMin = "0";
        newMin = newMin + min;
        var newMinInt = parseInt(newMin + min);
        return newMinInt;
      }
      return min;
    }

    var unixTimestamp = theTimeStamp;
    var date = new Date(unixTimestamp * 1000);
    return (
      monthNames[date.getMonth() + 1] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      " " +
      (date.getHours() % 12) +
      ":" +
      addLeadingZero(date.getMinutes()) +
      " " +
      amOrPm(date.getHours())
    );
  }

  return (
    <div className="table__container">
      <h2>History</h2>
      <table>
        <tbody>
          <tr>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Transaction ID</th>
          </tr>

          {historyData.data.status == "1" ? (
            historyData.data.result.map((item) => {
              return (
                <tr key={item.hash}>
                  <td>{item.isError == 1 ? "Failed" : "Received"}</td>
                  <td>{item.value}</td>
                  <td>{timeStampToDate(item.timeStamp)}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{item.hash}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>transaction data will display here</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default History;
