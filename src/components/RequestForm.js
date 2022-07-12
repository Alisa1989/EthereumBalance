import axios from "axios";
import { useEffect, useState } from "react";

const RequestForm = (props) => {
  const [formState, setFormState] = useState({
    walletAddress: "",
  });

  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [],
    qrCode: [],
  });

  const handleChanges = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.value,
    };
    setFormState(newFormData);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${formState.walletAddress}&tag=latest&apikey=92PH1UZI33IQCP5VDMH4YEG7PRR4ZQMC27`
      )
      .then((res) => {
        setWalletData({
          ...walletData,
          balance: res.data.result,
        });
      })
      .catch((err) => {
        console.log("res", err);
      });
    const returnAddress = formState.walletAddress;
    props.setAddress(returnAddress);
  }, [formState.walletAddress]);

  return (
    <div className="requestform__container">
      <label htmlFor="walletAddress">
        <input
          id="walletAddress"
          name="walletAddress"
          type="text"
          onChange={handleChanges}
          value={formState.walletAddress ?? ""}
          placeholder="Copy Wallet Address Here"
        />
      </label>
      <h2>Balance {walletData.balance || 0} Eth</h2>
    </div>
  );
};

export default RequestForm;
