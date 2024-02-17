import { useState } from "react";

// import React from 'react'
export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("Arjun");
  const [qrSize, setQrSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }
  function downlodeQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error)=>{
        console.error("Error downloading QR code", error);
      });
  }
  return (
    <div className="w-screen h-screen   flex flex-col justify-center items-center ">
      <h1 className="mt-28 mb-5 text-xl font-semibold text-blue-400">
        QR CODE GENERATOR
      </h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="" className="p-[5px]  shadow-md " />}
      <div className=" w-full md:w-[50%]  flex flex-col ">
        <label
          htmlFor="dataInput"
          className="text-left text-blue-400 font-medium text-base mb-2"
        >
          Data for QR code :
        </label>
        <input
          type=" text"
          value={qrData}
          id="dataInput"
          placeholder="Enter data for QR code"
          className=" p-2 border-2 border-blue-500 mb-5"
          onChange={(e) => setQrData(e.target.value)}
        />
        <label
          htmlFor="dataInput"
          className=" text-blue-400 font-medium text-base mb-2"
        >
          Image size (e.g., 150):
        </label>
        <input
          type=" text"
          value={qrSize}
          id="sizeInput"
          placeholder="Enter Image size"
          className=" p-2 border-2 border-blue-500 mb-5"
          onChange={(e) => setQrSize(e.target.value)}
        />
      </div>
      <div className="w-full md:w-[50%] flex justify-center">
        <button
          onClick={generateQR}
          disabled={loading}
          className="py-2 px-10 m-3 rounded-md cursor-pointer transition-colors text-white bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed"
        >
          Generate QR Code
        </button>

        <button
          onClick={downlodeQR}
          className="py-2 px-10 m-3 rounded-md cursor-pointer transition-colors text-white bg-green-600 hover:bg-green-700"
        >
          Downlode QR Code
        </button>
      </div>
      <p>
        @ Designed By{" "}
        <a href="" className="text-blue-500">
          Arjun
        </a>
      </p>
    </div>
  );
};
