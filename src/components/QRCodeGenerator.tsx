import { useEffect, useRef } from "react";
// @ts-ignore
import EthereumAddress from "ethereum-address";
import QRCode from "qrcode-generator";

interface QRCodeGeneratorProps {
  walletAddress: string;
}

const QRCodeGenerator = ({
  walletAddress,
}: QRCodeGeneratorProps): JSX.Element => {
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);
  console.log(walletAddress);

  useEffect(() => {
    // Validate the wallet address
    const content = walletAddress;

    // Clear the previous QR code
    if (qrCodeContainerRef.current) {
      qrCodeContainerRef.current.innerHTML = "";
    }

    // Create a QR code instance
    const qrCode = QRCode(0, "L");
    qrCode.addData(content);
    qrCode.make();

    // Append the QR code to the container
    const qrCodeImage = qrCode.createImgTag(5);
    if (qrCodeContainerRef.current) {
      qrCodeContainerRef.current.innerHTML = qrCodeImage;
    }
  }, [walletAddress]);

  return (
    <div className="flex justify-center pt-6">
      <div ref={qrCodeContainerRef}></div>
    </div>
  );
};

export default QRCodeGenerator;
