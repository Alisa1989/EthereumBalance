import RequestForm from "./RequestForm";
import { useState } from "react";
import QRCode from "./QRCode";
import History from "./History";

// sample address:   0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae

function Dashboard() {
  const [address, setAddress] = useState("");

  return (
    <div className="Dashboard">
      <header className="Dashboard__header">
        <h1>What's in your wallet?</h1>
      </header>
      <section className="dashboard__part1">
        <RequestForm setAddress={setAddress} address={address} />
        <QRCode address={address} />
      </section>
      <History address={address} />
    </div>
  );
}

export default Dashboard;
