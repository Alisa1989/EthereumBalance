import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCode = (props) => {
  const qrRef = useRef();

  useEffect(() => {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [props.address]);

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={props.address}
      size={300}
      level={"H"}
    />
  );

  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
    </div>
  );
};
export default QRCode;